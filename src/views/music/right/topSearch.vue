<!-- 右侧顶部搜索 -->
<template>
    <div class="topSearchBox">
        <InputSearch v-model:value="searchValue" placeholder="搜索歌名或者歌手" enter-button @search="clickBut"></InputSearch>
    </div>
</template>

<script lang='ts'>
import { defineComponent, ref } from 'vue'
import middleStore from '@/stores/middleStores'
import { AutoComplete, InputSearch } from 'ant-design-vue'
interface Option {
    query: string;
    category: string;
    value: string;
    count: number;
}
export default defineComponent({
    components: {
        AutoComplete,
        InputSearch
    },
    props: ['selectedKey'],
    name: 'topSearch',
    setup(props, ctx) {
        const store = middleStore()

        let searchValue = ref<string>('')
        const clickBut = (value: string) => {
            store.middle = 'SearchDetails'
            store.searchValue = value
        };
        return {
            searchValue,
            clickBut
        };
    }
})
</script>

<style lang='less' scoped>
.topSearchBox {
    width: 100%;
    padding: 24px;
    border-bottom: #E5E7EE 4px solid;
}

:deep(.ant-input) {
    border-radius: 20px 0 0 20px;
}

:deep(.ant-input-lg) {
    padding: 6.5px 20px;
}

:deep(.ant-input-search-button) {
    border-radius: 0 20px 20px 0 !important;
}
</style>
