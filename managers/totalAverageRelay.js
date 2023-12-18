const { graphURLs } = require("../constants");
const { getDispatch } = require("../graph/indexerConnections");
const { getRecieved } = require("../graph/indexerConnections");

exports.totalAverageRelayManager = async () => {
  try {
    let url;
    let dispatchMessagesResult = [];
    let recievedResult = [];
    const graphs = graphURLs();
    let objectKeys = Object.keys(graphs);

    // for (const key of objectKeys) {
    //   url = graphs[key];
    //   result = await getDispatch(url);
    //   const resultData = { chainId: key, result: result.data.dispatches };
    //   dispatchMessagesResult.push(resultData);
    // }

    // for (const key of objectKeys) {
    //   url = graphs[key];
    //   result = await getRecieved(url);
    //   const resultData = { chainId: key, result: result.data.processes };
    //   recievedResult.push(resultData);
    // }

    const result = {
      ethereum: {
        optimism: 28,
        binance: 48,
        gnosis: 32,
        polygon: 26,
        moonbeam: 30,
        arbitrum: 40,
        avalanche: 30,
        celo: 46,
      },
      optimism: {
        ethereum: 28,
        binance: 48,
        gnosis: 32,
        polygon: 26,
        moonbeam: 30,
        arbitrum: 40,
        avalanche: 30,
        celo: 46,
      },
      binance: {
        ethereum: 28,
        optimism: 48,
        gnosis: 32,
        polygon: 26,
        moonbeam: 30,
        arbitrum: 40,
        avalanche: 30,
        celo: 46,
      },
      gnosis: {
        ethereum: 28,
        optimism: 48,
        binance: 32,
        polygon: 26,
        moonbeam: 30,
        arbitrum: 40,
        avalanche: 30,
        celo: 46,
      },
      polygon: {
        ethereum: 28,
        optimism: 48,
        binance: 32,
        gnosis: 26,
        moonbeam: 30,
        arbitrum: 40,
        avalanche: 30,
        celo: 46,
      },
      moonbeam: {
        ethereum: 28,
        optimism: 48,
        binance: 32,
        gnosis: 26,
        polygon: 30,
        arbitrum: 40,
        avalanche: 30,
        celo: 46,
      },
      arbitrum: {
        ethereum: 28,
        optimism: 48,
        binance: 32,
        gnosis: 26,
        polygon: 30,
        moonbeam: 40,
        avalanche: 30,
        celo: 46,
      },
      avalanche: {
        ethereum: 28,
        optimism: 48,
        binance: 32,
        gnosis: 26,
        polygon: 30,
        moonbeam: 40,
        arbitrum: 30,
        celo: 46,
      },
      celo: {
        ethereum: 28,
        optimism: 48,
        binance: 32,
        gnosis: 26,
        polygon: 30,
        moonbeam: 40,
        arbitrum: 30,
        avalanche: 46,
      },
    };
    // Get messageId from the latest transaction on dispatch and check for that message id in recieved and do this for all the chains
    // after that calculate average relay time from blocktimestamp of dispatch and recieved

    return {
      result,
    };
  } catch (err) {
    console.log(err);
  }
};

/**
 *                    Sender :  {
                        "id": "0xe444852f1622133cf5f12e4ce882788a254c08b1edcb69564bc02ea259340f6701000000",
                        "sender": "0x7ff2bf58c38a41ad7c9cbc14e780e8a7edbbd48d",
                        "origin": "1",
                        "recipient": "0x3da5fdccc661c84454f49db0cf519561bc7c2729",
                        "blockNumber": "113378734",
                        "blockTimestamp": "1702356245",
                        "transactionHash": "0xe444852f1622133cf5f12e4ce882788a254c08b1edcb69564bc02ea259340f67",
                        "__typename": "Process"
                    },

                   Reciever:   {
                        "id": "0x668edebb99cacf9902822a1233f20e034b61c714e3bdb7eed536cbd3a6a198d61d000000",
                        "sender": "0x7ff2bf58c38a41ad7c9cbc14e780e8a7edbbd48d",
                        "destination": "10",
                        "recipient": "0x3da5fdccc661c84454f49db0cf519561bc7c2729",
                        "message": "0x03000000c3000000010000000000000000000000007ff2bf58c38a41ad7c9cbc14e780e8a7edbbd48d0000000a0000000000000000000000003da5fdccc661c84454f49db0cf519561bc7c272948656c6c6f21",
                        "blockNumber": "18767784",
                        "blockTimestamp": "1702356035",
                        "transactionHash": "0x668edebb99cacf9902822a1233f20e034b61c714e3bdb7eed536cbd3a6a198d6",
                        "__typename": "Dispatch"
                    },
                    103698398335666645437591754247695972184870560340884765811221191503316910199642
                    0x46DBB2eDE044e11e86f1a334819C7F248f829726 : scroll sepolia
                    0xCe6ee6d55BfeFB0e607e907a02003333920b5de4 : sepolia

 */
