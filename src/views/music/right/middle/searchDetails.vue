<!-- 右侧中部搜索详情 -->
<template>
    <div class="searchDetailsBox">
        <div class="searchDetailsBoxTop">
            <a-radio-group v-model:value="type" buttonStyle="solid">
                <a-radio-button value="1">歌曲</a-radio-button>
                <a-radio-button value="2">歌手</a-radio-button>
            </a-radio-group>
        </div>
        <div class="searchDetailsBoxList">
            <SongDetail :type="type"></SongDetail>
        </div>
    </div>
</template>

<script lang='ts'>
import { defineComponent, ref } from 'vue'
import SongDetail from './songDetail.vue' // 歌曲详情页

export default defineComponent({
    components: {
        SongDetail,
    },
    name: 'searchDetails',
    setup(props, ctx) {
        const type = ref<string>('1');
        return {
            type
        };
    }
})
</script>

<style lang='less' scoped>
.searchDetailsBoxTop {
    padding: 12px 0;
    display: flex;
    justify-content: center;

    :deep(.ant-radio-button-wrapper) {
        width: 80px;
        text-align: center;
    }
}
</style>
