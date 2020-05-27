import { reactive, toRefs } from "vue"

const state = reactive({ money: 1000000 })

const addMoney = ({ money }) => {
    state.money = state.money + money
}

const removeMoney = ({ money }) => {
    state.money = state.money - money
}

export const useGlobalStore = () => {
    //Somehow load money from save ...
    console.log("Using global store")
    return { ...toRefs(state), addMoney, removeMoney }
}
