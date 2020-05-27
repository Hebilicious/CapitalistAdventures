<template>
    <div class="Wrapper">
        <div class="Title">Adventure Capitalist</div>
        <div class="Market">
            <div class="LeftBusiness" v-for="business in businessList">
                <div class="LeftBusinessTitle">{{ business.name }}</div>
                <div class="LeftBuyButton">
                    <button :disabled="business.owned" @click="buyBusiness(business)">
                        Buy {{ business.price }} $
                    </button>
                </div>
                <div class="LeftManagerButton">
                    <button :disabled="!business.owned || business.hasManager" @click="buyManager(business)">
                        Get Manager {{ business.managerPrice }} $
                    </button>
                </div>
            </div>
        </div>
        <div class="MainBusinesses">
            <template v-for="business in businessList">
                <Business v-if="business.owned === true" :business="business" />
            </template>
        </div>
        <div class="Money">
            <div class="MoneyNumber">{{ Math.trunc(money).toLocaleString("fr") }} $</div>
        </div>
    </div>
</template>
<style scoped>
.Wrapper {
    height: 100vh;
    display: grid;
    grid-template-columns: repeat(6, 1fr);
    grid-template-rows: 1fr 10fr 1fr;
}
.Title {
    grid-column: 1/7;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    padding-left: 5rem;
    font-size: 2rem;
    color: var(--black);
}

.Market {
    background: var(--color1);
    display: grid;
    grid-auto-rows: minmax(5rem, 5rem);
    gap: 1rem;
    padding: 0.5rem;
    /* margin-bottom: auto; */
}

.LeftBusiness {
    height: 5rem;
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-template-rows: repeat(6, 1fr);
    font-style: bold;
    font-size: 1.2rem;
}

.LeftBusinessTitle {
    grid-column: 1/3;
}
.MainBusinesses {
    background: var(--color1);
    color: var(--color3);
    grid-column: 2/7;
    padding: 1rem;
    overflow: scroll;
    display: grid;
    gap: 1rem;
}

.Money {
    display: flex;
    justify-content: flex-end;
    align-items: center;
    grid-column: 1/7;
    background: var(--color5);
    padding-right: 5rem;
    font-size: 2rem;
}
.MoneyNumber {
}
button {
    height: 100%;
    width: 100%;
}
</style>

<script lang="ts">
import Business from "./Business.vue"
import { useBusiness } from "../hooks/useBusiness"
import { useGlobalStore } from "../hooks/useGlobalStore"
import { onMounted } from "vue"
import { useSaveState } from "../hooks/useSaveState"

export default {
    name: "Marketplace",
    components: { Business },
    setup() {
        const { businessList, buyBusiness, buyManager } = useBusiness()
        const { money, addMoney, removeMoney } = useGlobalStore()
        const { restoreSavedState } = useSaveState()
        onMounted(async () => {
            try {
                await restoreSavedState()
            } catch (error) {
                console.log("ERROR HERE")
                console.error(error)
            }
        })
        return { businessList, buyBusiness, buyManager, money }
    }
}
</script>
