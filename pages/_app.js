// MAIN ENTRY POINT

import '../styles/globals.css'
import { MoralisProvider } from 'react-moralis'

function MyApp({ Component, pageProps }) {

    return (
        // optionality to hoook into a server to add more features to more website...we dont't want to hook into our server
        <MoralisProvider>
            <Component {...pageProps} />
        </MoralisProvider>
    )
}

export default MyApp