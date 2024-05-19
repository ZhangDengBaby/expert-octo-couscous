<!-- 音乐左方列表 -->
<template>
  <div class="musicLeftBox">
    <div class="top">
      <div class="title">在线音乐</div>
      <div :class="{ item: true, select: selectedKey === '1' }" @click="onSelect('1')">
        <FireOutlined />推荐
      </div>
      <div :class="{ item: true, select: selectedKey === '2' }" @click="onSelect('2')">
        <CustomerServiceOutlined />音乐馆
      </div>
    </div>
    <div class="bottom">
      <div class="title">我的音乐</div>
      <div :class="{ item: true, select: selectedKey === '3' }" @click="onSelect('3')">
        <HeartOutlined />我的喜欢
      </div>
      <div :class="{ item: true, select: selectedKey === '4' }" @click="onSelect('4')">
        <MenuOutlined />我的歌单
      </div>
    </div>

  </div>
</template>

<script lang='ts'>
import { defineComponent, ref, reactive, } from 'vue'
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
  props: ['selectedKey'],
  emits: ['leftchange'],
  setup(props, ctx) {
    // 切换左侧列表项
    const onSelect = (value: string) => {
      ctx.emit('leftchange', value)
    }
    return {
      onSelect
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
