// call the graphs and get data of dispatches of all chains and filter desc on blocktimestamp
const { graphURLs } = require("../constants");
const { getDispatch } = require("../graph/indexerConnections");

exports.dispatchMessagesManager = async () => {
  try {
    let result, url;
    let dispatchMessagesResult = [];
    const graphs = graphURLs();
    let objectKeys = Object.keys(graphs);

    for (const key of objectKeys) {
      url = graphs[key];
      result = await getDispatch(url);
      const resultData = { chainId: key, result: result.data.dispatches };
      dispatchMessagesResult.push(resultData);
    }

    function addChainIdToObjects(chainId, objects) {
        return objects.map(obj => ({ ...obj, origin : chainId }));
      }

      // Extract all objects into a single array and add chainId
      const allObjects = dispatchMessagesResult.flatMap(dispatch => {
        const { chainId, result } = dispatch;
        return addChainIdToObjects(chainId, result);
      });

      return allObjects.sort((a, b) => b.blockTimestamp - a.blockTimestamp);
  } catch (err) {
    console.log(err);
  }
};
