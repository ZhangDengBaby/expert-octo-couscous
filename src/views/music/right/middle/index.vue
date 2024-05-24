<!-- 右侧中部 -->
<template>
    <div class="middleBox">
        <component :is="middle"></component>
        <Player></Player>
    </div>
</template>

<script lang='ts'>
import { defineComponent, ref } from 'vue'
import { useRouter, useRoute } from 'vue-router';
import middleStore from '@/stores/middleStores'
import { storeToRefs } from 'pinia'
import Recommendation from './recommendation.vue' // 推荐页
import MusicHall from './musicHall.vue' // 音乐馆
import MyFavorite from './myFavorite.vue' // 我的喜欢
import MyPlaylist from './myPlaylist.vue' // 我的歌单
import SearchDetails from './searchDetails.vue' // 模糊搜索详情页
import Player from './player.vue' // 模糊搜索详情页

export default defineComponent({
    components: {
        Recommendation,
        MusicHall,
        MyFavorite,
        MyPlaylist,
        SearchDetails,
        Player
    },
    name: 'middle',
    setup(props, ctx) {
        const route = useRoute()
        const store = middleStore()
        let { middle } = storeToRefs(store) // 将状态管理的值变为响应式
        middle.value = route.query.middle?.toString() || 'searchDetails'
        return {
            middle
        }
    }
})
</script>

<style lang='less' scoped>

</style>
