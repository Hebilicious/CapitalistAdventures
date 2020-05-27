import { reactive, toRefs } from "vue"
import { useSaveState } from "./useSaveState"

const { saveMoney } = useSaveState()

const state = reactive({ money: 10000 })

/**
 * Add money helper
 * @param {Number} money
 */
const addMoney = ({ money }) => {
    console.log(`Adding money : ${money}`)
    state.money = state.money + money
    saveMoney({ money: state.money })
}

/**
 * Remove money helper
 * @param {Number} money
 */
const removeMoney = ({ money }) => {
    console.log(`Removing money : ${money}`)
    state.money = state.money - money
    saveMoney({ money: state.money })
}

/**
 * Set the money, used when restoring from offline.
 * @param {Number} money
 */
const restoreMoney = ({ money }) => {
    console.log(`Restoring money: ${money}`)
    state.money = money
}

export const useGlobalStore = () => {
    //Somehow load money from save ...
    console.log("Using global store")
    return { ...toRefs(state), addMoney, removeMoney, restoreMoney }
}
