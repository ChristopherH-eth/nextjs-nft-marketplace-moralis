import Head from "next/head"
import Image from "next/image"
import styles from "../styles/Home.module.css"

/**
 * @notice The Home() function returns the elements to be displayed on the current NFT
 * Marketplace page.
 */

export default function Home() {
    return (
        <div className={styles.container}>
            <Head>
                <title>NFT Marketplace</title>
                <meta name="description" content="NFT Marketplace" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            Sell Page
        </div>
    )
}
