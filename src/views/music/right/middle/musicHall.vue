<!-- 右侧顶部搜索 -->
<template>
    <div class="middleBox">

    </div>
</template>

<script lang='ts'>
import { defineComponent, ref } from 'vue'
import Recommendation from './recommendation.vue'

export default defineComponent({
    components: {
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

</style>
