Endpoints :

- GET : ```/```

        Result : result.js


- GET : ```/profile/:walletAddress```


        Result : profile.js



Data Params :
- Connected domains(chains)  : connectedDomains
- Total interchain messages : totalInterChainMessagesPerChain.sumDispatchCounter
- Successful relaying percentage : totalInterChainMessagesPerChain.relayPercentage
- Total no. of active users : users.total
- no. of active users by chain : users.perChainObj
- most active chains : totalInterChainMessagesPerChain.mostActiveChains
- latest interchain transactions : dispatches
- Graph data : result.ethereum etc (see result.js)