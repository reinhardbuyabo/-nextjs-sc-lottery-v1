import { useMoralis } from "react-moralis" //
import { useEffect } from "react"

export default function ManualHeader() {
    const { enableWeb3, account, isWeb3Enabled, Moralis, deactivateWeb3, isWeb3EnabledLoading } = useMoralis() // hooks let you  hook into React state and lifecycle features

    // wrap in a Moralis Provider

    // USEEFFECT 1
    useEffect(() => {
        console.log("Hi!")
        console.log(isWeb3Enabled)

        if (isWeb3Enabled) return

        if (typeof window !== undefined) {
            if (window.localStorage.getItem("connected")) {
                enableWeb3() // when we refresh it will automatically run enableWeb3 for us ... if we refresh we don't have to connect again ... and when we disconnect we can disconnect and delete localstorage stuff(another useeffect) // the extension keeps popping up
            }
        }

    }, [isWeb3Enabled])
    // dependency array => ... check to rerender ... // isWeb3Enabled -> false -> automatically runs twice on load becuase of strict mode ... renders again and turns to true. -> no dependency array! -> renders (anytime) all the time -> run once [react.strictmode] ... [] -> blank dependency array runs once

    // LOCAL STORAGE
    // when we refresh we wanna make sure it remembers

    // USEEFFECT 2 // disconnect 1. 2. 3.
    useEffect(() => {
        Moralis.onAccountChanged((account) => {
            console.log(`Account changed to ${account}`) // we can check to see if account is null
            if (account == null) {
                window.localStorage.removeItem("connected")
                deactivateWeb3() // sets isWeb3Enabled to false
                console.log("Null account found") 
            }
        })
    })

    return (
        <div>
            {account ? (
                <div>
                    Connected to {account.slice(0, 6)}...{account.slice(account.length - 4)}
                </div>
            ) : (
                // remembrance needed
                <button
                    onClick={async () => {
                        await enableWeb3()

                        if (typeof window !== undefined) {
                            window.localStorage.setItem("connected", "injected") // in our window object, APPLICATION section, we're setting a new key value pair: key=>connected
                        }
                    }}

                    disabled={isWeb3EnabledLoading} // disables the button onLoading
                >
                    Connect
                </button>
            )}
        </div>
    )
}
