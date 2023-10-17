// call the graphs and get the data of users
const { uniqueUsers } = require("../graph/indexerConnections");
const {graphURLs} = require("../constants");

exports.usersManager = async () => {
  try {
    let perChainObj = {};
    let total = 0;
    let result;
    const graphs = graphURLs();
    let objectKeys = Object.keys(graphs);

    for (const key of objectKeys) {
      let url = graphs[key];
      result = await uniqueUsers(url);
      console.log(result);
      let data = result.length;
      perChainObj[key] = data;
      total += data;
    }
    return {
      total,
      perChainObj,
      result
    };
  } catch (err) {
    console.log(err);
  }
};
