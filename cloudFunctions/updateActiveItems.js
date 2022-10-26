/**
 * @file updateActiveItems.js
 * @author Original author Free Code Camp (Patrick Collins) used for learning purposes by 0xChristopher
 */

// This Moralis Cloud function listens for new items to be listed, and if they're not already listed, sets them as
// ActiveItem objects before saving them to the database.
Moralis.Cloud.afterSave("ItemListed", async (request) => {
    const confirmed = request.object.get("confirmed")
    const logger = Moralis.Cloud.getLogger()
    logger.info("Looking for confirmed transaction...")

    if (confirmed) {
        logger.info("Item found")

        const ActiveItem = Moralis.Object.extend("ActiveItem")

        const query = new Moralis.Query(ActiveItem)
        query.equalTo("nftAddress", request.object.get("nftAddress"))
        query.equalTo("tokenId", request.object.get("tokenId"))
        query.equalTo("marketplaceAddress", request.object.get("address"))
        query.equalTo("seller", request.object.get("seller"))
        const alreadyListedItem = await query.first()

        if (alreadyListedItem) {
            logger.info(`Delering already listed ${request.object.get("objectId")}`)

            await alreadyListedItem.destroy()
            logger.info(
                `Deleted item with tokenId: ${request.object.get(
                    "tokenId"
                )} at address ${request.object.get("address")} since it's already been listed`
            )
        }

        const activeItem = new ActiveItem()

        activeItem.set("marketplaceAddress", request.object.get("address"))
        activeItem.set("nftAddress", request.object.get("nftAddress"))
        activeItem.set("price", request.object.get("price"))
        activeItem.set("tokenId", request.object.get("tokenId"))
        activeItem.set("seller", request.object.get("seller"))
        logger.info(
            `Adding address: ${request.object.get("address")}. TokenId: ${request.object.get(
                "tokenId"
            )}`
        )
        logger.info("Saving...")

        await activeItem.save()
    }
})

// This Moralis Cloud function queries the database for an ActiveItem that has been cancelled, that matches the one found
// in the request, and if there is a match, the ActiveItem is removed from the table.
Moralis.Cloud.afterSave("ItemCancelled", async (request) => {
    const confirmed = request.object.get("confirmed")
    const logger = Moralis.Cloud.getLogger()
    logger.info(`Marketplace | Object: ${request.object}`)

    if (confirmed) {
        const ActiveItem = Moralis.Object.extend("ActiveItem")
        const query = new Moralis.Query(ActiveItem)

        query.equalTo("marketplaceAddress", request.object.get("address"))
        query.equalTo("nftAddress", request.object.get("nftAddress"))
        query.equalTo("tokenId", request.object.get("tokenId"))
        logger.info(`Marketplace | Query: ${query}`)

        const cancelledItem = await query.first()
        logger.info(`Marketplace | CancelledItem: ${cancelledItem}`)

        if (cancelledItem) {
            logger.info(
                `Deleting tokenId: ${request.object.get("tokenId")} at address ${request.object.get(
                    "address"
                )} since it was cancelled`
            )

            await cancelledItem.destroy()
        } else {
            logger.info(
                `No item found with address ${request.object.get(
                    "address"
                )} and tokenId: ${request.object.get("tokenId")}`
            )
        }
    }
})

// This Moralis Cloud function queries the database for an ActiveItem that has been bought, that matches the one found
// in the request, and if there is a match, the ActiveItem is removed from the table.
Moralis.Cloud.afterSave("ItemBought", async (request) => {
    const confirmed = request.object.get("confirmed")
    const logger = Moralis.Cloud.getLogger()
    logger.info(`Marketplace | Object: ${request.object}`)

    if (confirmed) {
        const ActiveItem = Moralis.Object.extend("ActiveItem")
        const query = new Moralis.Query(ActiveItem)

        query.equalTo("marketplaceAddress", request.object.get("address"))
        query.equalTo("nftAddress", request.object.get("nftAddress"))
        query.equalTo("tokenId", request.object.get("tokenId"))
        logger.info(`Marketplace | Query: ${query}`)

        const boughtItem = await query.first()
        logger.info(`Marketplace | BoughtItem: ${boughtItem}`)

        if (boughtItem) {
            logger.info(
                `Deleting item with tokenId: ${request.object.get(
                    "tokenId"
                )} at address ${request.object.get("address")}`
            )

            await boughtItem.destroy()
        } else {
            logger.info(
                `No item found with address: ${request.object.get(
                    "address"
                )} and tokenId: ${request.object.get("tokenId")}`
            )
        }
    }
})
