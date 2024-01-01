exports.connectedDomainManager = async () => {
  const chainIDMapping = {
    56: "Biannce Smart Chain",
    42161: "Arbitrum",
    43114: "Avalanche",
    42220: "Celo",
    10: "Optimism",
    1: "Ethereum",
    100: "Gnosis",
    1284: "Moonbeam",
    137: "Polygon",
    1101: "Polygon ZKEVM",
    534352: "Scroll",
    8453: "Base"
  };

  return chainIDMapping;
};
