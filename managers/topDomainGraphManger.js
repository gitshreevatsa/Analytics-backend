// call the graphs for remote chains and get data of total dispatches and processes per chain and customize data according to required type
const { graphURLs } = require("../constants");
const { chainPerformance } = require("../graph/indexerConnections");

exports.chainPerformanceManager = async () => {
  try {
    const graphs = graphURLs();
    let objectKeys = Object.keys(graphs);
    let chainPerformanceResult = [];

    for (const key of objectKeys) {
      url = graphs[key];
      result = await chainPerformance(url);
      const resultData = { chainId: key, result: result.data.remoteChains };
      chainPerformanceResult.push(resultData);
    }

    const chainIdMapping = {
      1: "ethereum",
      10: "optimism",
      56: "binance",
      137: "polygon",
      42161: "arbitrum",
      43114: "avalanche",
      42220: "celo",
      100: "gnosis",
      1284: "moonbeam",
      1101: "Polygon ZKEVM",
      534352: "Scroll",
      8453: "Base"
    };
    const sortedData = {};

    // Loop through the dispatches
    chainPerformanceResult.forEach((dispatch) => {
      const chainId = dispatch.chainId;
      const chainName = chainIdMapping[chainId];

      if (!sortedData[chainName]) {
        sortedData[chainName] = [];
      }

      // Loop through the result objects
      dispatch.result.forEach((resultObj) => {
        const from = chainName;
        const to = chainIdMapping[resultObj.id];
        const flow = parseInt(resultObj.dispatchCounter, 10);

        // Create an object for the current result and add it to the sorted data
        sortedData[chainName].push({ from, to, flow });
      });
    });

    for (const chainName in sortedData) {
        sortedData[chainName] = sortedData[chainName].filter((obj) => obj.to);
      }

    return sortedData;
  } catch (err) {
    console.log(err);
  }
};
