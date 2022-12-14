import { ConnectButton } from "@web3uikit/web3"
import Link from "next/link"

/**
 * @file Header.js
 * @author Original author Free Code Camp (Patrick Collins) used for learning purposes by 0xChristopher
 */

/**
 * @notice The Header() function creates the website header and nav bar.
 */
export default function Header() {
    // Component content
    return (
        <nav className="p-5 border-b-2 flex flex-row justify-between items-center">
            <h1 className="py-4 px-4 font-bold text-3xl">NFT Marketplace</h1>
            <div className="flex flex-row items-center">
                <Link href="/">
                    <a className="mr-4 p-6">Home</a>
                </Link>
                <Link href="/sell-nft">
                    <a className="mr-4 p-6">Sell NFT</a>
                </Link>
                <ConnectButton moralisAuth={false} />
            </div>
        </nav>
    )
}
