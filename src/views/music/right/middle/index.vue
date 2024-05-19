<!-- 右侧中部 -->
<template>
    <div class="middleBox">
        <!-- <Recommendation></Recommendation> -->
        <component is="Recommendation"></component>
    </div>
</template>

<script lang='ts'>
import { defineComponent, ref } from 'vue'
import Recommendation from './recommendation.vue' // 推荐页
import MusicHall from './musicHall.vue' // 音乐馆
import MyFavorite from './myFavorite.vue' // 我的喜欢
import MyPlaylist from './myPlaylist.vue' // 我的歌单
import SearchDetails from './searchDetails.vue' // 模糊搜索详情页
import SingerDetail from './singerDetail.vue' // 歌手详情页

export default defineComponent({
    components: {
        Recommendation,
        MusicHall,
        MyFavorite,
        MyPlaylist,
        SearchDetails,
        SingerDetail,
    },
    name: 'middle',
    setup(props, ctx) {

        return {
        }
    }
})
</script>

<style lang='less' scoped>

</style>
