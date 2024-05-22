import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export default defineStore('middles', {
  state: () => ({
    middle: 'searchDetails', // 右侧中部显示那个面板
    searchValue: '' // 搜索框的值
  }),
  actions: {
    // changeMiddle: (value: string) => {
    //   middle.value = value
    // },
    // searchListData:(value: string) => {
    //   // searchValue.value = value
    // }
  }
  // const middle = ref<string>('searchDetails')
  // const searchValue = ref<string>('')
  // function changeMiddle(value: string) {
  //   middle.value = value
  // }
  // function searchListData(value: string) {
  //   searchValue.value = value
  // }
  // return { middle, searchValue, changeMiddle, searchListData }
})
