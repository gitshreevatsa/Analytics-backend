const { createClient, cacheExchange, fetchExchange } = require("urql");
const { graphURLs } = require("../constants");
const {
  dispatchesQuery,
  userQuery,
  processQuery,
  counterQuery,
  chainPerformanceQuery,
  particularuserQuery,
} = require("../utils/query");

exports.getDispatch = async (url) => {
  const client = createClient({
    url: url,
    exchanges: [cacheExchange, fetchExchange],
  });
  console.log(url);
  console.log(client);
  const data = await client.query(dispatchesQuery).toPromise();
  console.log(data);
  return data;
};

exports.getRecieved = async (url) => {
  const client = createClient({
    url: url,
    exchanges: [cacheExchange, fetchExchange],
  });
  console.log(url);
  console.log(client);
  const data = await client.query(processQuery).toPromise();
  console.log(data);
  return data;
};

exports.totalInterChainMessagesPerChain = async (url) => {
  const client = createClient({
    url: url,
    exchanges: [cacheExchange, fetchExchange],
  });

  const data = await client.query(counterQuery).toPromise();
  return data;
};

exports.uniqueUsers = async (url) => {
  const client = createClient({
    url: url,
    exchanges: [cacheExchange, fetchExchange],
  });
  console.log(url);
  console.log(client);
  const data = await client.query(userQuery).toPromise();
  console.log(data);
  const result = data.data.users.map((user) => {
    return {
      id: user.id,
      dispatchCounter: user.dispatchCounter,
      processCounter: user.processCounter,
    };
  });
  return {
    length: result.length,
    users: result,
  };
};

exports.chainPerformance = async (url) => {
  const client = createClient({
    url: url,
    exchanges: [cacheExchange, fetchExchange],
  });
  console.log(url);
  console.log(client);
  const data = await client.query(chainPerformanceQuery).toPromise();
  console.log(data);
  return data;
};

exports.getProfile = async (url, address) => {
  try {
    const client = createClient({
      url: url,
      exchanges: [cacheExchange, fetchExchange],
    });
    console.log(url);
    console.log(client);
    const data = await client
      .query(await particularuserQuery(address))
      .toPromise();
    console.log(data);
    return data;
  } catch {
    return { data: { user: {} } };
  }
};
