<template>
    <div>Item Name : {{ item.name }}</div>
    <div>Base Price: {{ item.price }}</div>
    <div>Current Price: {{ currentPrice }}</div>
    <div>Capacity Price: {{ capacityPrice }}</div>
    <div>Capacity: {{ item.currentCapacity }}</div>
    <div>Sold : {{ item.sold }}</div>
    <button v-if="!business.hasManager" :disabled="disableSell" @click="sellCurrentItem">
        Sell Item
    </button>
    <div v-else>Manager</div>
    <button @click="increaseCurrentCapacity">Buy capacity increase</button>
    <div ref="progress">0</div>
    <code>{{ { item } }}</code>
    <button @click="saveDynamicData">Fake Save</button>
</template>
<script lang="ts">
import { useGlobalStore } from "../hooks/useGlobalStore"
import { useBusiness } from "../hooks/useBusiness"
import { reactive, toRefs, computed, ref, onMounted, onUpdated, onUnmounted } from "vue"

export default {
    props: ["item", "business"],
    name: "Item",
    setup(props) {
        const { increaseCapacity, sellItem } = useBusiness()
        const progress = ref(null)
        const disableSell = ref(false)
        //Static props
        const { name, price, capacityGrowth, itemdId, tts } = props.item
        let autosell = null
        //If we have a business Manager, enable AutoSell, we run that on mounted and update
        const managerCheck = () => {
            if (props.business.hasManager && autosell === null) {
                sellCurrentItem()
                autosell = setInterval(() => sellCurrentItem(), tts * 1000)
            }
        }
        onMounted(() => managerCheck())
        onUpdated(() => managerCheck())
        onUnmounted(() => clearInterval(autosell))

        const currentPrice = computed(() => price * props.item.currentCapacity)
        const capacityPrice = computed(() => currentPrice.value + capacityGrowth(props.item.currentCapacity))

        const increaseCurrentCapacity = () => increaseCapacity(props.item, capacityPrice)
        const sellCurrentItem = () => sellItem(props.item, disableSell, progress)
        const saveDynamicData = () => {
            console.log("save")
        }

        return {
            disableSell,
            progress,
            currentPrice,
            capacityPrice,
            sellCurrentItem,
            increaseCurrentCapacity,
            saveDynamicData
        }
    }
}
</script>
