import { ConnectButton } from "web3uikit";

export default function Header() {
    return (
        <div className="border-b-2 p-5 flex flex-row">
            <h1 className="py-4 px-4 font-blog text-3xl">Decentralized Lottery</h1>
            <div className="ml-auto py-2 px-4">

                {/* moralisAuth  .... we're not trying to connect to server here ... . ConnectButton does */}
                <ConnectButton />
            </div>
        </div>
    )
}