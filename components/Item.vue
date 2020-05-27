<template>
    <div class="ItemWrapper">
        <div class="Properties">
            <div class="Name">{{ item.name }}</div>
            <div>Capacity: {{ item.currentCapacity }}</div>
            <div>Base Price: {{ item.price }} $</div>
            <div>Current Price: {{ currentPrice }} $</div>
            <div>Sold : {{ item.sold.toLocaleString("us") }}</div>
        </div>
        <div class="Buttons">
            <div>
                <button :disabled="business.hasManager || disableSell" @click="sellCurrentItem">
                    {{ business.hasManager ? `Manager` : `Sell Item` }}
                </button>
            </div>
            <div>
                <button @click="increaseCurrentCapacity">
                    Buy capacity increase | {{ Math.trunc(capacityPrice) }} $
                </button>
            </div>
        </div>
        <!-- This is the progress indicator -->
        <div class="Timer">
            <div ref="progress">0</div>
            <div>s</div>
        </div>
    </div>
</template>
<style scoped>
.ItemWrapper {
    display: grid;
    grid-template-columns: 1fr 1fr;
    min-width: 10vw;
    padding: 1rem;
    border: 1px solid black;
    box-shadow: 0px 0px 8px 1px rgba(0, 0, 0, 0.75);
}
.Properties {
    font-size: 0.9rem;
}
.Buttons {
    display: grid;
    gap: 0.5rem;
    grid-template-columns: 1fr;
    grid-template-row: 1fr 1fr;
}
.Timer {
    grid-column: 1/3;
    display: flex;
    justify-content: flex-end;
    align-items: center;
}
button {
    width: 100%;
    height: 100%;
}
</style>
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

        return {
            disableSell,
            progress,
            currentPrice,
            capacityPrice,
            sellCurrentItem,
            increaseCurrentCapacity
        }
    }
}
</script>
