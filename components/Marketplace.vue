<template>
    <p>Marketplace</p>
    <div v-for="business in businessList">
        <div>
            <div>{{ business.name }}</div>
            <button :disabled="business.owned" @click="buyBusiness(business)">Buy {{ business.price }} $</button>
            <button :disabled="!business.owned || business.hasManager" @click="buyManager(business)">
                Get Manager {{ business.managerPrice }} $
            </button>
        </div>
    </div>
    <div v-for="business in businessList">
        <Business v-if="business.owned === true" :business="business" />
    </div>
    <div>Money : {{ money }}</div>
</template>

<script lang="ts">
import Business from "./Business.vue"
import { useBusiness } from "../hooks/useBusiness"
import { useGlobalStore } from "../hooks/useGlobalStore"

export default {
    name: "Marketplace",
    components: { Business },
    setup() {
        const { businessList, buyBusiness, buyManager } = useBusiness()
        const { money, addMoney, removeMoney } = useGlobalStore()
        return { businessList, buyBusiness, buyManager, money }
    }
}
</script>
