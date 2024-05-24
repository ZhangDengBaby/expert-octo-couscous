<!-- 音乐页面 -->
<template>
  <div class="musicBox">
    <Left class="left" :selectedKey="selectedKey" @leftchange="leftchange"></Left>
    <Right class="right" :selectedKey="selectedKey"></Right>
  </div>
  <div class="player">
  </div>
</template>

<script lang='ts'>
import { defineComponent, ref, reactive } from 'vue'
import type { primitiveTypes } from '../interface/public' // 常用TS接口引入
import Left from './left.vue'
import Right from './right/index.vue'

export default defineComponent({
  components: {
    Left,
    Right
  },
  name: 'home',
  setup() {
    let selectedKey = ref<string>('1');
    const leftchange = (value: string) => {
      selectedKey.value = value
    }
    return {
      selectedKey,
      leftchange
    }
  }
})
</script>

<style lang='less' scoped>
.musicBox {
  display: flex;
  height: calc(~"100vh - 172px");

  .left {
    width: 320px;
  }

}

.player {
  height: 110px;
  width: 100%;
  background-color: #E5E7EE;
}
</style>
