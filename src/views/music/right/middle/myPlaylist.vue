<!-- 右侧中部我的歌单 -->
<template>
    <div class="middleBox">
        右侧中部我的歌单
    </div>
</template>

<script lang='ts'>
import { defineComponent, ref } from 'vue'

export default defineComponent({
    components: {
    },
    props: ['selectedKey'],
    name: 'myPlaylist',
    setup(props, ctx) {

        return {
        }
    }
})
</script>

<style lang='less' scoped>

</style>
