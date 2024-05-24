<template>
    <div class="musicRightBox">
        <TopSearch></TopSearch>
        <Middle></Middle>
    </div>
</template>

<script lang='ts'>
import { defineComponent, ref } from 'vue'
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
    overflow: auto;
}
</style>
