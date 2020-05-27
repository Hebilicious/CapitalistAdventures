import { reactive, toRefs } from "vue"
import { useSaveState } from "./useSaveState"

const { saveMoney } = useSaveState()

const state = reactive({ money: 1000000 })

const addMoney = ({ money }) => {
    console.log(`Adding money : ${money}`)
    state.money = state.money + money
    saveMoney({ money: state.money })
}

const removeMoney = ({ money }) => {
    console.log(`Removing money : ${money}`)
    state.money = state.money - money
    saveMoney({ money: state.money })
}

const restoreMoney = ({ money }) => {
    console.log(`Restoring money: ${money}`)
    state.money = money
}

export const useGlobalStore = () => {
    //Somehow load money from save ...
    console.log("Using global store")
    return { ...toRefs(state), addMoney, removeMoney, restoreMoney }
}
