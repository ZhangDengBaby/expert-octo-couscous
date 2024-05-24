import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export default defineStore('middles', {
  state: () => ({
    middle: 'searchDetails', // 右侧中部显示那个面板
    searchValue: '', // 搜索框的值
    
  }),
  actions: {
    playMusic: (value: Object) => {
    }
  }
})
