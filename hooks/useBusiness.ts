import { ref } from "vue"
import { useGlobalStore } from "../hooks/useGlobalStore"
import { useSaveState } from "../hooks/useSaveState"

const businessList = ref([
    {
        businessId: 0,
        name: "Lemon Stand",
        price: 10,
        managerPrice: 10000,
        owned: false,
        hasManager: false,
        items: [
            {
                itemId: 0,
                name: "Lemon",
                price: 2,
                tts: 1,
                capacityGrowth: (q) => Math.exp(q * 0.21),
                currentCapacity: 1,
                sold: 0,
                beingSold: false,
                timeLeft: 0
            },
            {
                itemId: 1,
                name: "Lemonade",
                price: 4,
                tts: 2,
                capacityGrowth: (q) => Math.exp(q * 0.22),
                currentCapacity: 1,
                sold: 0,
                beingSold: false,
                timeLeft: 0
            },
            {
                itemId: 2,
                name: "Lemon Smoothie",
                price: 6,
                tts: 3,
                capacityGrowth: (q) => Math.exp(q * 0.23),
                currentCapacity: 1,
                sold: 0,
                beingSold: false,
                timeLeft: 0
            }
        ]
    },
    {
        businessId: 1,
        name: "Newspaper Agency",
        price: 1000,
        managerPrice: 80000,
        owned: false,
        hasManager: false,
        items: [
            {
                itemId: 10,
                name: "Daily Burgle",
                price: 10,
                tts: 8,
                capacityGrowth: (q) => Math.exp(q * 0.24),
                currentCapacity: 1,
                sold: 0,
                beingSold: false,
                timeLeft: 0
            },
            {
                itemId: 11,
                name: "The Wildest Duck",
                price: 15,
                tts: 12,
                capacityGrowth: (q) => Math.exp(q * 0.25),
                currentCapacity: 1,
                sold: 0,
                beingSold: false,
                timeLeft: 0
            }
        ]
    },
    {
        businessId: 2,
        name: "Offlicense Shop",
        price: 10000,
        managerPrice: 160000,
        owned: false,
        hasManager: false,
        items: [
            {
                itemId: 20,
                name: "Rum",
                price: 30,
                tts: 20,
                capacityGrowth: (q) => Math.exp(q * 0.3),
                currentCapacity: 1,
                sold: 0,
                beingSold: false,
                timeLeft: 0
            },
            {
                itemId: 21,
                name: "Whiskey",
                price: 40,
                tts: 25,
                capacityGrowth: (q) => Math.exp(q * 0.32),
                currentCapacity: 1,
                sold: 0,
                beingSold: false,
                timeLeft: 0
            }
        ]
    },
    {
        businessId: 3,
        name: "Space Agency",
        price: 1000000,
        managerPrice: 8000000,
        owned: false,
        hasManager: false,
        items: [
            {
                itemId: 30,
                name: "Spaceship",
                price: 100000,
                tts: 120,
                capacityGrowth: (q) => Math.exp(q * 0.5),
                currentCapacity: 1,
                sold: 0,
                beingSold: false,
                timeLeft: 0
            },
            {
                itemId: 31,
                name: "Fusion Reactor",
                price: 10000000,
                tts: 800,
                capacityGrowth: (q) => Math.exp(q * 0.65),
                currentCapacity: 1,
                sold: 0,
                beingSold: false,
                timeLeft: 0
            },
            {
                itemId: 32,
                name: "Dyson Sphere",
                price: 1500000000000000,
                tts: 1800,
                capacityGrowth: (q) => Math.exp(q * 0.8),
                currentCapacity: 1,
                sold: 0,
                beingSold: false,
                timeLeft: 0
            }
        ]
    }
])

export const useBusiness = () => {
    const { money, addMoney, removeMoney } = useGlobalStore()
    const { saveBusinessList, makeUniqueId } = useSaveState()
    /**
     * Buy a business
     */
    const buyBusiness = (business) => {
        const { price } = business
        console.log(`Price is ${price}, money is ${money.value}`)
        //Check if we have enough money
        if (price > money.value) {
            console.log("Not enough money")
            return
        }
        removeMoney({ money: price })
        business.owned = true
        saveBusinessList({ id: makeUniqueId("business", business.businessId), businessList })
    }

    /**
     * Buy a manager
     */
    const buyManager = (business) => {
        const { managerPrice } = business
        console.log(`Price is ${managerPrice}, money is ${money.value}`)
        //Check if we have enough money
        if (managerPrice > money.value) {
            console.log("Not enough money")
            return
        }
        removeMoney({ money: managerPrice })
        business.hasManager = true
        saveBusinessList({ id: makeUniqueId("business", business.businessId), businessList })
    }

    /**
     * Increase the capacity of an item
     * @param item
     * @param capacityPrice Recursive : itemprice * currentCapacity + capacityGrowth(currentCapacity)
     */
    const increaseCapacity = (item) => {
        const price = item.price * item.currentCapacity + item.capacityGrowth(item.currentCapacity)
        console.log(`Price is ${price}, money is ${money.value}`)
        if (price > money.value) {
            console.log("Not enough money")
            return
        }
        console.log("removing money")
        removeMoney({ money: price })
        item.currentCapacity = item.currentCapacity + 1
        saveBusinessList({ id: makeUniqueId("item", item.itemId), businessList })
    }

    /**
     * Sell an item
     * @param item
     * @param disableSell Button ref
     * @param progress Div ref
     */
    const sellItem = (item, disableSell, progress) => {
        //Disable button
        disableSell.value = true
        //We start a countdown ...
        item.beingSold = true
        const count = item.timeLeft === 0 ? item.tts : item.timeLeft
        let tracker = count
        const ttsCountdown = () => {
            saveBusinessList({ id: makeUniqueId("item", item.itemId), businessList })
            progress.value.innerHTML = tracker
            tracker = tracker - 1
            item.timeLeft = tracker
        }

        ttsCountdown()
        //We run the countdown every second
        const countdown = setInterval(ttsCountdown, 1000)
        //We do the logic at the end of the timer
        setTimeout(() => {
            addMoney({ money: item.price * item.currentCapacity })
            disableSell.value = false
            item.beingSold = false
            item.sold = item.sold + item.currentCapacity
            item.timeLeft = 0
            clearInterval(countdown)
            saveBusinessList({ id: makeUniqueId("item", item.itemId), businessList })
        }, count * 1000)
    }

    /**
     * Restore the businessList from the indexedDB
     * @param businesses Business List
     * @param timestamp
     */
    const restoreSavedBusiness = ({ businesses, timestamp }) => {
        console.log(`Restoring saved business from ${timestamp}...`)
        const currentTime = Date.now()
        const elapsedTime = currentTime - timestamp
        const newBusinessList = businessList.value.map((business) => {
            const savedBusiness = businesses.find((b) => b.businessId === business.businessId)
            //Set the business properties ...
            const newBusiness = { ...business, ...savedBusiness }
            //Set the function and handle offline sales
            newBusiness.items = newBusiness.items.map((i) => {
                const { price, currentCapacity, tts, timeLeft, sold } = i
                const { capacityGrowth } = business.items.find((si) => si.itemId === i.itemId)
                //If the business has a manager
                if (newBusiness.hasManager === true) {
                    const offlineSales = Math.trunc((timeLeft * 1000 + elapsedTime) / (tts * 1000))
                    const trueTimeLeft = (timeLeft * 1000 + elapsedTime) % (tts * 1000)
                    //Add the money from the offline sales
                    const money = price * currentCapacity * offlineSales
                    console.log(`Adding ${money} $ from ${offlineSales} ${i.name} offline sales ...`)
                    addMoney({ money })
                    //Return the item with the correct properties
                    return {
                        ...i,
                        currentCapacity,
                        capacityGrowth,
                        sold: sold + offlineSales,
                        timeLeft: Math.trunc(trueTimeLeft / 1000),
                        beingSold: trueTimeLeft === 0 ? false : true
                    }
                }
                return { ...i, sold, timeLeft, currentCapacity, capacityGrowth }
            })
            //Merge eventual new items
            const savedItems = newBusiness.items.map((item) => item.itemId)
            const dataItems = business.items.map((item) => item.itemId)
            //Diff the item ids
            const newItems = savedItems
                .filter((a) => !dataItems.includes(a))
                .concat(dataItems.filter((b) => !savedItems.includes(b)))
            //If we have new items we add them ...
            if (newItems.length !== 0) {
                newItems.forEach((id) => {
                    const item = business.items.find((item) => item.itemId === id)
                    newBusiness.items.push(item)
                })
            }
            console.log(`New business`, newBusiness)
            return newBusiness
        })
        console.log(newBusinessList)
        businessList.value = newBusinessList
    }
    console.log("Using Business")
    return { businessList, buyBusiness, buyManager, increaseCapacity, sellItem, restoreSavedBusiness }
}
