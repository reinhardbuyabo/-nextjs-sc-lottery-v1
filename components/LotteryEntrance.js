import { useWeb3Contract } from "react-moralis"
// import abi from "../constants/abi.json"
import { abi, contractAddresses } from "../constants" // index.js in constants folder makes things easier
import { useMoralis } from "react-moralis"
import { useEffect, useState } from "react"
import { ethers } from "ethers"
import { useNotification } from "web3uikit"

// have a function to call the lottery/ enter the lottery ... old fund function ... if typeof.... NO ... react.moralis gives as useWeb3Contract hook .... data, error, runContractFunction, isFetching, isLoading .... we just need to pass an object containing contract information

// call that async function fund(ethAmount) // we're gonna use moralis to call the functions // `useWeb3Contract`

export default function LotteryEntrance() {
    const { chainId: chainIdHex, isWeb3Enabled } = useMoralis() // header passes all the
    const chainId = parseInt(chainIdHex)
    const raffleAddress = chainId in contractAddresses ? contractAddresses[chainId][0] : null

    // let entranceFee = ""
    const [entranceFee, setEntranceFee] = useState("0") // triggers a re-render to the frontend
    const [numPlayers, setNumPlayers] = useState("0")
    const [recentWinner, setRecentWinner] = useState("0")

    const dispatch = useNotification() // a little popup in dispatch

    // programmatically switching the network
    // Step 1: Confirm Metamask is install

    // console.log(window.ethereum)

    // const provider = window.ethereum
    // if (!provider) {
    //     console.log("Please Ensure Metamask is installed!")
    // }

    // step 2:
    // const myFunc = async () => {
    //     const chainId = await provider.request({ method: 'eth_chainId' })
    //     const hh_local = 31337

    //     if (chainId === hh_local) {
    //         console.log("hurray")
    //     } else {
    //         console.log("Switch to correct network")
    //     }
    // }

    // myFunc()

    // step 3: we can put chainId request as below
    // try {
    //     await provider.request({
    //         method: 'wallet_switchEthereumChain'
    //     })
    // }

    // pure errors below
    // console.log(`chainId from LotteryEntrance: ${parseInt(chainIdHex)}`) // metamask, etherscan sepolia -> 0xaa36a7 -> 11155111 ....

    // // we're gonna call enterRaffle ... pass the abi ... pass the contractAddress ... functionName, params ... and msgValue ... enterRaffle ... doesn't take any parameters

    // runContractFunction can both send transaction and read state ...

    const { runContractFunction: enterRaffle, isLoading, isFetching } = useWeb3Contract({
        abi: abi, // always gonna stay the same, no matter what network we're on! so from CONSTANTS folder we'll have abi.json and contractAddresses.json ...
        contractAddress: raffleAddress, // use first address(2nd parameter) // not gonna change ... we're can hardcode it or have abi.json and contractAddress.json files .... we're building it locally and compare it to local and testnet network ...
        functionName: "enterRaffle",
        params: {},
        msgValue: entranceFee, // enterRaffle() doesn't take any parameters, but `function enterRaffle() public payable` has ... `if (msg.value < i_entranceFee) which reverts to Raffle__NotEnoughETHEntered Error`
    })

    const { runContractFunction: getEntranceFee } = useWeb3Contract({
        abi: abi, // always gonna stay the same, no matter what network we're on! so from CONSTANTS folder we'll have abi.json and contractAddresses.json ...
        contractAddress: raffleAddress, // use first address(2nd parameter) // not gonna change ... we're can hardcode it or have abi.json and contractAddress.json files .... we're building it locally and compare it to local and testnet network ...
        functionName: "getEntranceFee",
        params: {},
        // msgValue: //, // enterRaffle() doesn't take any parameters, but `function enterRaffle() public payable` has ... `if (msg.value < i_entranceFee) which reverts to Raffle__NotEnoughETHEntered Error`
    })

    const { runContractFunction: getNumPlayers } = useWeb3Contract({
        abi: abi,
        contractAddress: raffleAddress,
        functionName: "getNumberOfPlayers",
        params: {},
    })

    const { runContractFunction: getRecentWinner } = useWeb3Contract({
        abi: abi,
        contractAddress: raffleAddress,
        functionName: "getRecentWinner",
        params: {}
    })

    async function updateUI() {
        const entranceFeeFromCall = (await getEntranceFee()).toString() //BigNumber wait
        const numPlayersFromCall = (await getNumPlayers()).toString()
        const recentWinnerFromCall = await getRecentWinner()
        setEntranceFee(entranceFeeFromCall)
        setNumPlayers(numPlayersFromCall)
        setRecentWinner(recentWinnerFromCall)
        console.log(entranceFee)
    }

    // useEffect
    useEffect(() => {
        if (isWeb3Enabled) {
            // try to read the raffle entrance fee
            updateUI()
        }
    }, [isWeb3Enabled]) // the reason is false, the first time we run it ...

    // splitting the following into two
    const handleSuccess = async function (tx) {
        await tx.wait(1) // await tx to go through
        handleNewNotification(tx)
        updateUI()
    }

    const handleNewNotification = function () {
        dispatch({
            type: "info",
            message: "Transaction Complete",
            title: "Tx Notification",
            position: "topR",
            icon: "bell",
        })
    }

    return (
        <div className="p-5">
            Hi from lottery entrance
            {raffleAddress ? (
                <div>
                    <button
                        className="bg-red-500 hover:bg-black hover:text-red-500 text-white font-bold py-2 px-4 rounded-ml-auto"
                        onClick={async function () {
                            // onSuccess here isn't checing that the tx has a block confirmation. However, onSuccess here just checks to see that the tx was sent to metamask
                            await enterRaffle({
                                onSuccess: handleSuccess, // function to be created
                                onError: (error) => console.log(error)
                            })
                        }}
                        disabled={isLoading || isFetching} // from useWeb3Contract
                    >
                        {isLoading || isFetching ? <div className="animate-spin spinner-border h-8 w-8 border-b-2 rounded-full"></div> : <div>Enter Raffle</div>}
                    </button>
                    <div>
                        Entrance Fee: {ethers.utils.formatUnits(entranceFee, "ether")} ETH
                    </div>
                    <div>
                        Number of Players: {numPlayers}
                    </div>
                    <div>
                        Recent Winner: {recentWinner}
                    </div>
                </div>
            ) : (
                <div>No Raffle Address Detected</div>
            )}
        </div>
    )
}
