<template>
    <div class="BusinessWrapper">
        <div class="BusinessName">{{ business.name }}</div>
        <div class="Items">
            <Item v-for="item in business.items" :item="item" :business="business" />
        </div>
    </div>
</template>
<style scoped>
.BusinessWrapper {
    padding: 1rem;
    box-shadow: 0px 0px 8px 1px rgba(0, 0, 0, 0.75);
    background: var(--color3);
    color: var(--black);
}
.BusinessWrapper:nth-child(odd) {
    background: var(--color2);
}
.BusinessName {
    font-size: 1.5rem;
}
.Items {
    display: grid;
    grid-auto-flow: column;
    gap: 1rem;
    overflow-y: auto;
    padding: 0.5rem;
}
</style>
<script lang="ts">
import Item from "./Item.vue"

export default {
    props: ["business"],
    name: "Business",
    components: { Item }
}
</script>
