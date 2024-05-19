<!-- 右侧中部推荐页 -->
<template>
    <div class="middleBox">
        右侧中部推荐页
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
