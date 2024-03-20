// MAIN ENTRY POINT

import { MoralisProvider } from 'react-moralis'
import { NotificationProvider } from "web3uikit"
import "../styles/globals.css"

function MyApp({ Component, pageProps }) {

    return (
        // optionality to hoook into a server to add more features to more website...we dont't want to hook into our server, we want everything to be opensource
        <MoralisProvider appId={process.env.APP_ID} serverUrl={process.env.SERVER_URL} initializeOnMount={false}>
            <NotificationProvider>
                <Component {...pageProps} />
            </NotificationProvider>
        </MoralisProvider>
    )
}

export default MyApp