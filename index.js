const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const {
  getDispatch,
  getRecieved,
  uniqueUsers,
  totalInterChainMessagesPerChain,
  chainPerformance,
} = require("./graph/indexerConnections");
const {
  totalInterChainMessagesPerChainManager,
} = require("./managers/totalMessagesManager");
const { usersManager } = require("./managers/totalUsersManager");
const {
  dispatchMessagesManager,
} = require("./managers/totalDispatchesManager");
const { chainPerformanceManager } = require("./managers/topDomainGraphManger");
const { profileManager } = require("./managers/profileManager");
const { connectedDomainManager } = require("./managers/connectedDomainManager");

const app = express();

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

app.get("/dispatch", async (req, res) => {
  const dispatches = await dispatchMessagesManager();
  res.send({
    length: dispatches.length,
    dispatches: dispatches,
  });
});

app.get("/recieved", async (req, res) => {
  console.log(req.query.chain);
  const recieved = await getRecieved(req.query.chain);
  const result = recieved.data.processes.map((recieved) => {
    return {
      id: recieved.id,
      sender: recieved.sender,
      origin: recieved.origin,
      recipient: recieved.recipient,
      blockNumber: recieved.blockNumber,
      blockTimestamp: recieved.blockTimestamp,
      transactionHash: recieved.transactionHash,
    };
  });
  res.send({
    length: result.length,
    recieved: result,
  });
});

app.get("/uniqueUsers", async (req, res) => {
  console.log(req.query.chain);
  const users = await usersManager();
  //   const result = users.data.users.map((user) => {
  //     return {
  //       id: user.id,
  //       dispatchCounter: user.dispatchCounter,
  //       processCounter: user.processCounter,
  //     };
  //   });
  res.send({
    total: users.total,
    data: users.perChainObj,
    users: users.result,
  });
});

app.get("/totalInterChainMessagesPerChain", async (req, res) => {
  //   console.log(req.query.chain);
  const totalInterChainMessagesPerChainResult =
    await totalInterChainMessagesPerChainManager();
  //   const result = totalInterChainMessagesPerChainResult.data.counters.map(
  //     (remotechain) => {
  //       return {
  //         id: remotechain.id,
  //         dispatchCounter: remotechain.dispatchCounter,
  //         processCounter: remotechain.processCounter,
  //       };
  //     }
  //   );
  res.send({
    totalInterChainMessagesPerChain: totalInterChainMessagesPerChainResult,
  });
});

app.get("/chainPerformance", async (req, res) => {
  const chainPerformanceScore = await chainPerformanceManager();

  //   const result = chainPerformanceScore.data.remoteChains.map((remotechain) => {
  //     return {
  //       id: remotechain.id,
  //       dispatchCounter: remotechain.dispatchCounter,
  //       processCounter: remotechain.processCounter,
  //     };
  //   });
  res.send({
    chainPerformanceScore: chainPerformanceScore,
  });
});

app.get('/', async(req,res) => {
  // need to set to cache
  const dispatches = await dispatchMessagesManager();
  const users = await usersManager();
  const totalInterChainMessagesPerChainResult =
    await totalInterChainMessagesPerChainManager();
  const chainPerformanceScore = await chainPerformanceManager();
  const connectedDomains = await connectedDomainManager();
  const result = {
    connectedDomains : connectedDomains,
    dispatches: dispatches,
    users: users,
    totalInterChainMessagesPerChain: totalInterChainMessagesPerChainResult,
    ...chainPerformanceScore,
  }
  res.send({
    result
  })
})

app.get("/profile/:id", async (req, res) => {
  const stale = "0x000000000000000000000000";
  addresses = [
    req.params.id.toLowerCase(),
    stale + req.params.id.toString().toLowerCase().slice(2),
  ];

  const profileWithoutStale = await profileManager(addresses[0]);
  const profileWithStale = await profileManager(addresses[1]);
  const data = { profileWithStale, profileWithoutStale };
  const cleanedData = {};

  for (const profileName in data) {
    if (
      data[profileName] &&
      !Object.values(data[profileName]).every((value) => value === null)
    ) {
      cleanedData[profileName] = data[profileName];
    }
  }
  res.json({ data: cleanedData });
});

app.listen(3002, () => {
  console.log("Server listening on port 3002");
});
