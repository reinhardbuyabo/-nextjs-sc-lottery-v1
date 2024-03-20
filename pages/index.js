import Head from 'next/head';
import Image from 'next/image';
import styles from '../styles/Home.module.css';
// import Header from "../components/Header"
// import ManualHeader from '../components/ManualHeader';
import Header from '../components/Header';
import LotteryEntrance from '../components/LotteryEntrance';

export default function Home() {
    return (
        <div className={styles.container}>
            <Head>
                <title>Smart Contract Lottery</title>
                <meta name="description" content="Smart Contract Lottery" />
                <link rel="icon" href="/favicon.ico" />
            </Head>

            {/* header / connect button /nav bar */}
            {/* <ManualHeader /> */}

            {/* connect wallet button ... metamask, wallet connect, trust wallet mathwallet, tokepocket, safepal ... gives wallet address and balance at the top ... can switch accounts .... setting local storage in the background ... headers ... that's what you need */}
            <Header />
            <LotteryEntrance />
            {/* Hello! */}
        </div>
    )
} ``