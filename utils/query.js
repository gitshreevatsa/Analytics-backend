const dispatchesQuery = `
    query{
    dispatches(first:10 orderBy: blockTimestamp orderDirection: desc) {
        id
        sender
        destination
        recipient
        message
        blockNumber
        blockTimestamp
        transactionHash
    }
}
`;

const processQuery = `
    query{
    processes(orderBy: blockTimestamp orderDirection: desc ) {
        id
        sender
        origin
        recipient
        blockNumber
        blockTimestamp
        transactionHash
    }
}
`;

const counterQuery = `
    query{
    counters(first: 1000) {
        id
        dispatchCounter
        processCounter
    }
}
`;

const userQuery = `
    query{
    users(first: 1000) {
        id
        dispatchCounter
        processCounter
    }
}
`;

const chainPerformanceQuery = `
query{
    remoteChains(first: 1000) {
        id
        dispatchCounter
        processCounter
}
}
`;

async function particularuserQuery(userId)  {
  const particularuser = `
    query{
    user(id: "${userId}") {
        id
        dispatchCounter
        processCounter
    }
}
`;
  return particularuser;
};

module.exports = {
  dispatchesQuery,
  processQuery,
  counterQuery,
  userQuery,
  chainPerformanceQuery,
    particularuserQuery,
};
