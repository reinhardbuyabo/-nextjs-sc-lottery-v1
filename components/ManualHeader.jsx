import { useMoralis } from "react-moralis"; // 

export default function ManualHeader() {
    const { enableWeb3 } = useMoralis(); // hooks let you  hook into React state and lifecycle features

    // wrap in a Moralis Provider
    

    return(
        <div>Hi from Header!</div>
    )
}