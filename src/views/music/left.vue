<!-- 音乐左方列表 -->
<template>
  <div class="musicLeftBox">
    <div class="top">
      <div class="title">在线音乐</div>
      <div :class="{ item: true, select: middle === 'Recommendation' }" @click="onSelect('Recommendation')">
        <FireOutlined />推荐
      </div>
      <div :class="{ item: true, select: middle === 'MusicHall' }" @click="onSelect('MusicHall')">
        <CustomerServiceOutlined />音乐馆
      </div>
    </div>
    <div class="bottom">
      <div class="title">我的音乐</div>
      <div :class="{ item: true, select: middle === 'MyFavorite' }" @click="onSelect('MyFavorite')">
        <HeartOutlined />我的喜欢
      </div>
      <div :class="{ item: true, select: middle === 'MyPlaylist' }" @click="onSelect('MyPlaylist')">
        <MenuOutlined />我的歌单
      </div>
    </div>

  </div>
</template>

<script lang='ts'>
import { defineComponent, ref, reactive, } from 'vue'
import middleStore from '@/stores/middleStores'
import { storeToRefs } from 'pinia'
import { FireOutlined, CustomerServiceOutlined, HeartOutlined, MenuOutlined } from '@ant-design/icons-vue';
import type { primitiveTypes } from '../interface/public' // 常用TS接口引入
export default defineComponent({
  components: {
    FireOutlined,
    CustomerServiceOutlined,
    HeartOutlined,
    MenuOutlined
  },
  name: 'home',
  // props: ['selectedKey'],
  // emits: ['leftchange'],
  setup(props, ctx) {
    const store = middleStore()
    let { middle } = storeToRefs(store) // 将状态管理的值变为响应式
    // 切换左侧列表项
    const onSelect = (value: string) => {
      store.changeMiddle(value)
      // ctx.emit('leftchange', value)
    }
    return {
      onSelect,
      middle
    }
  }
})
</script>

<style lang='less' scoped>
.musicLeftBox {
  padding: 24px 24px;
  background-color: #F9FAFC;
  color: #333F56;
  height: 100%;

  * {
    font-weight: 600;
  }

  .title {
    font-size: 12px;
    line-height: 40px;
    padding: 0 6px;
  }

  .item {
    font-size: 14px;
    line-height: 34px;
    cursor: pointer;
    padding: 0 8px;
    border-radius: 4px;
  }

  .top {
    margin-bottom: 24px;
  }

  .select {
    color: #fff;
    background-color: #26D4A2;
  }
}
</style>
