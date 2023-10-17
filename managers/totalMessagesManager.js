// call the graphs and get all the data of counters

const {
  totalInterChainMessagesPerChain,
} = require("../graph/indexerConnections");

const { graphURLs } = require("../constants");

const totalInterChainMessagesPerChainManager = async () => {
  try {
    let result, url;
    let totalInterChainMessagesPerChainResult = [];
    let sumDispatchCounter = 0;
    let sumProcessCounter = 0;
    let parsedData = {};
    let averages = [];

    const graphs = graphURLs();
    let objectKeys = Object.keys(graphs);

    for (const key of objectKeys) {
      url = graphs[key];
      result = await totalInterChainMessagesPerChain(url);
      const resultData = { chainId: key, result: result.data.counters };
      totalInterChainMessagesPerChainResult.push(resultData);
    }

    totalInterChainMessagesPerChainResult.forEach((chain) => {
      chain.result.forEach((result) => {
        console.log(result.dispatchCounter);
        sumDispatchCounter += parseInt(result.dispatchCounter);
      });
    });

    totalInterChainMessagesPerChainResult.forEach((chain) => {
      chain.result.forEach((result) => {
        console.log(result.processCounter);
        sumProcessCounter += parseInt(result.processCounter);
      });
    });

    totalInterChainMessagesPerChainResult.forEach((entry) => {
      const chainId = entry.chainId;
      const { dispatchCounter, processCounter } = entry.result[0];

      parsedData[chainId] = {
        dispatchCounter: dispatchCounter,
        processCounter: processCounter,
      };
    });

    for (const key in parsedData) {
      const entry = parsedData[key];
      const dispatchCounter = parseFloat(entry.dispatchCounter);
      const processCounter = parseFloat(entry.processCounter);

      const average = (dispatchCounter + processCounter) / 2;

      averages.push({
        chainId: key,
        average: average,
      });
    }

    // Sort the chains in descending order of the calculated average
    averages.sort((a, b) => b.average - a.average);

    const relayPercentage =
      parseFloat(sumProcessCounter / sumDispatchCounter) * 100;

    return {
      sumDispatchCounter,
      sumProcessCounter,
      relayPercentage,
      parsedData,
      mostActiveChains: averages,
    };
  } catch (err) {
    console.log(err);
  }
};

module.exports = {
  totalInterChainMessagesPerChainManager,
};
