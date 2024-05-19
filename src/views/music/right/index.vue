<template>
    <div class="musicRightBox">
        <TopSearch></TopSearch>
        <Middle></Middle>
    </div>
</template>

<script lang='ts'>
import { defineComponent, ref } from 'vue'
import { } from '@ant-design/icons-vue';
import type { primitiveTypes } from '../../interface/public' // 常用TS接口引入
import TopSearch from './topSearch.vue'
import Middle from './middle/index.vue'

export default defineComponent({
    components: {
        TopSearch,
        Middle
    },
    props: ['selectedKey'],
    name: 'home',
    setup(props, ctx) {

        return {
        }
    }
})
</script>

<style lang='less' scoped>
.musicRightBox {
    width: 100%;
}
</style>
