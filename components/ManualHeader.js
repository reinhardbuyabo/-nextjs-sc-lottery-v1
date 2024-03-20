import { useMoralis } from "react-moralis" //
import { useEffect } from "react"

export default function ManualHeader() {
    // hooks enable use of state, instead of just using true and false ... We need to allow our website to change based on state ...
    // 1. `enableWeb3` 
    // 2. `isWeb3Enabled` boolean
    // 3. `account` 
    // 4. `Moralis.onAccountChanged` -> takes callback | checks whether 
    // 5. `deactivateWeb3`
    // 6. `isWeb3EnableLoading` - checks to see if Metamask has popped up
    const { enableWeb3, account, isWeb3Enabled, Moralis, deactivateWeb3, isWeb3EnableLoading } = useMoralis() // hooks let you  hook into React state and lifecycle features

    // wrap in a Moralis Provider

    // USEEFFECT 1 // after we re-render, we check if we rerender // core react hook // import useeffect from react .... core hook from react ... 
    console.log("just before useffect 1")
    useEffect(() => {
        console.log("Hi!")
        console.log(isWeb3Enabled) // running to see whether isWeb3Enabled ... // automatically runs onload ... run checking on value ...

        if (isWeb3Enabled) return

        // if they are already connected, let's just run this ....
        if (typeof window !== undefined) {
            // we want the application to remember that someone connected ... we store the key "connected" in local storage ... ... // automatically run enableWeb3 for us .... since we have the connected key in Applications's localStorage 
            if (window.localStorage.getItem("connected")) {
                enableWeb3() // when we refresh it will automatically run enableWeb3 for us ... if we refresh we don't have to connect again ... and when we disconnect we can disconnect and delete localstorage stuff(another useeffect) // the extension keeps popping up
            }
        }

    }, [isWeb3Enabled])
    // dependency array => ... check to rerender ... // isWeb3Enabled -> false -> automatically runs twice on load becuase of strict mode ... renders again and turns to true. -> no dependency array! -> renders (anytime) all the time -> run once [react.strictmode] ... [] -> blank dependency array runs once

    // LOCAL STORAGE
    // when we refresh we wanna make sure it remembers

    // USEEFFECT 2 // disconnect 1. 2. 3. // checks from metamask to see if we disconnected .. // also, checks localStorage ... // when we disconnect
    useEffect(() => {
        // takes a callback as an input parameter, which has the account as the parameter
        Moralis.onAccountChanged((account) => {
            console.log(`Account changed to ${account}`)
            // we can check to see if 'account is null', if null we can assume the account is disconnected
            if (account == null) {
                window.localStorage.removeItem("connected")
                deactivateWeb3() // sets isWeb3Enabled to false
                console.log("Null account found")
            }
        })
    }, [])

    return (
        <div>
            {/* if account has connected */}
            {account ? (
                <div>
                    {/* javascript inside javascript ... account.slice  */}
                    Connected to {account.slice(0, 6)}...{account.slice(account.length - 4)}
                </div>
            ) : (
                // else render button

                // 2.
                <button
                    onClick={async () => {
                        await enableWeb3()

                        //
                        if (typeof window !== undefined) {
                            // remembrance needed
                            window.localStorage.setItem("connected", "injected") // in our window object, APPLICATION section, we're setting a new key value pair: key=>connected
                        }
                    }}

                    disabled={isWeb3EnableLoading} // disables the button onLoading (when loading) ... hence button cannot be clicked ...
                >
                    Connect
                </button>
            )}
        </div>
    )
}
