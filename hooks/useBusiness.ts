import { ref } from "vue"
import { useGlobalStore } from "../hooks/useGlobalStore"

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
                capacityGrowth: (q) => Math.exp(q * 0.25),
                currentCapacity: 1,
                sold: 0,
                beingSold: false,
                timeLeft: 0
            },
            {
                itemId: 1,
                name: "Lemonade",
                price: 4.5,
                tts: 2,
                capacityGrowth: (q) => Math.exp(q * 0.3),
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
                capacityGrowth: (q) => Math.exp(q * 0.35),
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
                capacityGrowth: (q) => Math.exp(q * 0.4),
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
                price: 100,
                tts: 20,
                capacityGrowth: (q) => Math.exp(q * 0.4),
                currentCapacity: 1,
                sold: 0,
                beingSold: false,
                timeLeft: 0
            },
            {
                itemId: 21,
                name: "Whiskey",
                price: 120,
                tts: 25,
                capacityGrowth: (q) => Math.exp(q * 0.42),
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
                price: 10000,
                tts: 80,
                capacityGrowth: (q) => Math.exp(q * 0.55),
                currentCapacity: 1,
                sold: 0,
                beingSold: false,
                timeLeft: 0
            },
            {
                itemId: 31,
                name: "Fusion Reactor",
                price: 1000000,
                tts: 800,
                capacityGrowth: (q) => Math.exp(q * 0.75),
                currentCapacity: 1,
                sold: 0,
                beingSold: false,
                timeLeft: 0
            },
            {
                itemId: 32,
                name: "Dyson Sphere",
                price: 1500000000000000,
                tts: 900,
                capacityGrowth: (q) => Math.exp(q * 0.85),
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
        let count = item.tts
        const ttsCountdown = () => {
            progress.value.innerHTML = count
            item.timeLeft = count
            count = count - 1
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
        }, item.tts * 1000)
    }

    return { businessList, buyBusiness, buyManager, increaseCapacity, sellItem }
}
