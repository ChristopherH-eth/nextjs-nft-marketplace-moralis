import Image from "next/image"
import { useMoralisQuery, useMoralis } from "react-moralis"
import styles from "../styles/Home.module.css"
import NftBox from "../components/NftBox"

export default function Home() {
    const { data: listedNfts, isFetching: fetchingListedNfts } = useMoralisQuery(
        "ActiveItem",
        (query) => query.limit(10).descending("tokenId")
    )
    console.log(listedNfts)

    return (
        <div className={styles.container}>
            {fetchingListedNfts ? (
                <div>Loading...</div>
            ) : (
                listedNfts.map((nft) => {
                    console.log(nft.attributes)
                    const { price, nftAddress, tokenId, marketplaceAddress, seller } =
                        nft.attributes
                    return (
                        <div>
                            Price: {price} NFT Address: {nftAddress} Token ID: {tokenId} Seller:
                            {seller}
                            <NftBox
                                price={price}
                                nftAddress={nftAddress}
                                tokenId={tokenId}
                                marketplaceAddress={marketplaceAddress}
                                seller={seller}
                                key={`${nftAddress}${tokenId}`}
                            />
                        </div>
                    )
                })
            )}
        </div>
    )
}
