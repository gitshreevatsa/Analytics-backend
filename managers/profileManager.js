const { graphURLs } = require("../constants");
const { getProfile } = require("../graph/indexerConnections");

exports.profileManager = async (address) => {
  const graphs = graphURLs();
  let objectKeys = Object.keys(graphs);
  let profileResult = {};
  for (const key of objectKeys) {
    let url = graphs[key];
    let result = await getProfile(url, address);
    profileResult[key] = result.data.user;
  }
  return profileResult;
};
//profile/0x3797d0096b18b5b645c346a66d7f18c6c5738782c6bce24da57a3462bdef82b1
