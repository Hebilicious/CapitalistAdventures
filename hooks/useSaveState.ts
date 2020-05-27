// // import localforage from "localforage" This should be used instead, however Vite makes us have to do that  :'(
import localforage from "../node_modules/localforage/src/localforage"
import { useGlobalStore } from "./useGlobalStore"
import { useBusiness } from "./useBusiness"

import { toRaw } from "vue"

const maxEntries = 50

const globalStore = localforage.createInstance({
    driver: localforage.INDEXEDDB,
    name: "AdventuresCapitalist",
    version: 1.0,
    storeName: "globalStore",
    description: "Global Data"
})

const businessStore = localforage.createInstance({
    driver: localforage.INDEXEDDB,
    name: "AdventuresCapitalist",
    version: 1.0,
    storeName: "businessStore",
    description: "Business Data"
})

/**
 * This make sure the store doesn't get too big.
 * @param store
 */
const clearStore = async (store) => {
    //If we have less than n entries
    const length = await store.length()
    // console.log(`Store has ${length} items ...`)
    if (length < maxEntries) {
        return
    }
    return store.clear()
}

export const useSaveState = () => {
    const makeUniqueId = (type = "item", id) => `${Date.now()}-${type}-${id}`

    /**
     * Save a businessList proxy into the indexedDB
     * @param param0
     */
    const saveBusinessList = async ({ id, businessList }) => {
        console.log("Saving business")
        try {
            await clearStore(businessStore)
            //We remove the function from the items ...
            const businesses = toRaw(businessList.value).map((business) => {
                const items = business.items.map((item) =>
                    Object.fromEntries(Object.entries(item).filter(([key, value]) => key !== "capacityGrowth"))
                )
                return { ...business, items }
            })
            const businessSaved = await businessStore.setItem(id, {
                businesses,
                timestamp: Date.now()
            })
            // console.log({ id, businesses, businessSaved })
        } catch (error) {
            console.error("Error while saving business", error)
        }
    }

    /**
     * Save the player money into the indexedDB
     * @param param0
     */
    const saveMoney = async ({ timestamp = Date.now(), money }) => {
        try {
            await clearStore(globalStore)
            const moneySaved = await globalStore.setItem(`${timestamp}`, { money, timestamp })
            // console.log({ timestamp, money, moneySaved })
        } catch (error) {
            console.error("Error while saving money", error)
        }
    }

    /**
     * Restore the money
     */
    const restoreGlobal = async () => {
        const { restoreMoney } = useGlobalStore()
        const globalKeys = []
        await globalStore.iterate((value, key) => {
            globalKeys.push(key)
        })
        //If we have no save
        if (globalKeys.length === 0) return
        const latestGlobalKey = [...globalKeys].sort((a, b) => b - a)[0]
        const { money } = await globalStore.getItem(latestGlobalKey)
        restoreMoney({ money })
    }

    /**
     * Restore the businesses
     */
    const restoreBusinesses = async () => {
        const { restoreSavedBusiness } = useBusiness()
        const businessKeys = []
        await businessStore.iterate((value, key) => {
            businessKeys.push(key)
        })
        //If we have no save
        if (businessKeys.length === 0) return
        const timestamp = businessKeys.map((key) => key.split("-")[0]).sort((a, b) => b - a)[0]
        const latestBusinessKey = businessKeys.find((key) => key.includes(timestamp))
        const { businesses } = await businessStore.getItem(latestBusinessKey)
        restoreSavedBusiness({ businesses, timestamp })
    }

    /**
     * Handle the offline state restoration
     */
    const restoreSavedState = async () => {
        console.log("Restoring saved state...")
        await restoreGlobal()
        await restoreBusinesses()
    }
    console.log("Using Save State")
    return { saveBusinessList, saveMoney, restoreSavedState, makeUniqueId }
}
