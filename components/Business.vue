<template>
    <div>BUSINESS : {{ business.name }}</div>
    <div v-for="item in business.items">
        {{ item.name }}
        <Item :item="item" :business="business" />
    </div>
</template>
<script lang="ts">
import Item from "./Item.vue"

export default {
    props: ["business"],
    name: "Business",
    components: { Item }
}
</script>
