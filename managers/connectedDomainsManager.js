const { graphURLs } = require("../constants");

exports.connectedDomainManager = async () => {
  try {
    const graphs = graphURLs();
    let objectKeys = Object.keys(graphs);
    let connectedDomainsResult = [];
    for (const key of objectKeys) {
      connectedDomainsResult.push(key);
    }
    return connectedDomainsResult;
  } catch (err) {
    console.log(err);
  }
};
