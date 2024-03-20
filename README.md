# Introduction to Calling Functions in NextJS
- what else 
- Big button - that says -enter the lottery - Lottery Entrance
- Header will drop

- how we previously called it in FundMe

```js
async function fund(ethAmount) {
    console.log(`Funding with ${ethAmount}`)
    if(typeof window.ethereum !== undefined ) {
        const provider = new ethers.providers.Web3Provider(window.ethereum)
        const signer = provider.getSigner()
        const contract = new ethers.Contract(contractAddress, abi, signer)

        try {
            const transactionResponse = await contract.fund({
                value: ethers.utils.parseEther(ethAmount),
            })
            await listenForTransactionMine(transactionResponse, provider)
        } catch (error) {
            console.log(error)
        }

    } else {
        document.getElementById("executeButton").innerHTML =
            "Please install MetaMask"
    }
}
```

- Moralis has hooks .... i.e useWeb3Contract
- `const { data, error, runContractFunction, isFetching, isLoading } = useWeb3Contract(abi, contractAddress, functionName, params)`
- .. those are object keys above

# Automatic Constant Value UI Updater
## web3uikit

- `yarn add web3uikit`

- Moralis

```js
const { data, error, runContractFunction, isFetching, isLoading } = {
    useWeb3Contract({
        abi: usedcEthPoolAbi,
        contractAddress: usdcEthPOolAddress, 
        functionName: "observe",
        params: {
            secondAgos: [0, 10],
        }
    });
}
```

- network agnosis

- `hh node`
- create an update frontend deploy script 
- a script that creates constants for us ..

### useEffect dependency array
1. No Array - Still renders -> Runs anytime sth rerenders -> You can get circular renders i.e more than 1, they can just 
2. Empty/Blank Dependency Array - Runs once on re-render ...actually twice, once is wrong!


## update-frontend-js script

- `cd ../hardhat`
- for testing locally, yes
- creating an update frontend deploy script in our backend ... 
- `touch deploy/99-update-frontend.js`, because we want that to always be the last script.
- whenever we deploy contracts, 
- only update frontend if we have updated the env variable

- .env
```bash
UPDATE_FRONT_END=true
```


```js
const { ethers } = require("hardhat")

const FRONT_END_ADDRESSES_FILE = 
const FRONT_END_ABI_FILE = 

module.exports = async function() {
    if (process.env.UDPATE_FRONT_END) {
        console.log("Update front end ... ")
        updateContractAddresses()
    }
}

async function updateAbi() {
    const raffle = ethers.getContract("Raffle")
    fs.writeFileSync(FRONT_END_ABI_FILE, raffle.interface.format(ethers.utils.FormatTypes.json))
}

async function updateContractAddresses() {
    // we wanna pass the raffle contract to our frontend
    const raffle = await ethers.getContract("Raffle")
    const chainId = network.config.chainId.toString()
    const currentAddresses = await JSON.parse(fs.readFileSync(FRONT_END_ADDRESSES_FILE, "utf8")) // contractAddresses.json -> `{}` 

    // check if current chain is in address
    if (chainId in currentAddresses) { // if key in object
        // before we add we check if address is in current addresses
        if(!currentAddresses[chainId].includes(raffle.address)) {
            currentAddresses[chainId].push(raffle.address) // push it to the addresses array with the chain Id as the key.
        }
    }

    // if network chainId doesn't exist, then we add the address to the array with the chain Id as the key
    {
        currentAddressses[chainId] = [raffle.address]
    }

    fs.writeFileSync(JSON.parse(FRONTEND_CURRENT_ADDRESSES_FILE), JSON.stringify(currentAddresses)) // writing the currentAddresses object to json file
}

module.exports.tags = ["all", "frontend"]
```

- hh node
- makes frontend a lot easier to maintain

- automating the process of updating abis, and contractAddresses ...

- `mkdir constants`

- constants/index.js
```js
const contractAddresses = require("./contractAddresses.json")
const abi = require("./abi.json")

module.exports = {
    abi,
    contractAddresses
}
```

# `runContractFunction`

- the reason Moralis knows what chainId we're is because it is passed up to the moralis provider which passes it down to all the components inside those MoralisProvider tags.



## useNotification

-

# RECAP
- Powerful framework
- Layout of NextJS

- Minimalistic JS and HTML
- out -> export to static 
- public stuff
- css styles
- basic files
- pages/ -> api/ -> ... _app.js -> entry point - Moralis provider wrapped around the thing ...

- MoralisProvider wrapped around Notifications Provider 

- Header passed info to MoralisProvider

- `isWeb3Enabled`

- `useEffect and useState hooks`
- useEffect with: 1. no dependency array: runs anytime 2. blank dependency array: runs once, onload 3. dependencies(variables) in the array: run anytime the variables inside the array changes.
- Call different functions with moralis.
- 

- state of the blockchain

- Call different functions with Moralis.
- On tx completed ....
- IPFS hash
- fleek.co (continously updated browser)
- IPFS and decentralized database storage ...
- Storing data costs a ton of gas.
- Logic Layers (Blockchains) 

- Solid Frontend, whilst adding functionality.

# HARDHAT STARTER KIT [https://github.com/hardhat-starter-kit]
- Building frontends for our applications.
- Start deploying your projects right away.
-
- smartcontractkit/hardhat-starter-kit
- use template
- git clone ...