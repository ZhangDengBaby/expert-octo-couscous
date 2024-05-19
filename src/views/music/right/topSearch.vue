<!-- 右侧顶部搜索 -->
<template>
    <div class="topSearchBox">
        <AutoComplete v-model:value="searchValue" :dropdown-match-select-width="252" style="width: 300px"
            :options="dataSource" @select="onSelect" @search="handleSearch"
            :getPopupContainer="(triggerNode: HTMLElement | null) => getPopupContainer(triggerNode)">
            <template #option="item">
                <div style="display: flex; justify-content: space-between">
                    <span>
                        Found {{ item.query }} on
                        <a :href="`https://s.taobao.com/search?q=${item.query}`" target="_blank"
                            rel="noopener noreferrer">
                            {{ item.category }}
                        </a>
                    </span>
                </div>
            </template>
            <InputSearch placeholder="搜索歌名或者歌手" enter-button></InputSearch>
        </AutoComplete>
    </div>
</template>

<script lang='ts'>
import { defineComponent, ref } from 'vue'
import { AutoComplete, InputSearch } from 'ant-design-vue'
import type { primitiveTypes } from '../../interface/public' // 常用TS接口引入
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
        let searchValue = ref<string>('')
        const dataSource = ref<Option[]>([]);
        const onSelect = (value: string) => {
            console.log('onSelect', value);
        };

        const getRandomInt = (max: number, min = 0) => {
            return Math.floor(Math.random() * (max - min + 1)) + min;
        };

        const searchResult = (query: string): Option[] => {
            return new Array(getRandomInt(5))
                .join('.')
                .split('.')
                .map((_item, idx) => ({
                    query,
                    category: `${query}${idx}`,
                    value: `${query}${idx}`,
                    count: getRandomInt(200, 100),
                }));
        };
        const handleSearch = (val: string) => {
            dataSource.value = val ? searchResult(val) : [];
        };
        // 将下拉项挂载到父节点，方便设置样式
        const getPopupContainer = (triggerNode: HTMLElement | null) => {
            return triggerNode?.parentNode || document.body
        };
        return {
            searchValue,
            dataSource,
            onSelect,
            handleSearch,
            getPopupContainer
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

:deep(.ant-input-search .ant-input:hover, .ant-input-search .ant-input:focus) {
    border-color: #26D4A2;
}

:deep(.ant-input-lg) {
    padding: 6.5px 20px;
}

:deep(.ant-input-search-button) {
    border-radius: 0 20px 20px 0 !important;
    background-color: #26D4A2;
    border-color: #26D4A2;
}


:deep(.ant-input-group-addon) {
    background-color: #fff;
}

:deep(.rc-virtual-list) {
    box-shadow: 0 0 4px #000;
    background-color: #fff;
}

:deep(.ant-select-item) {
    line-height: 32px;
}

:deep(.ant-select-item:hover) {
    background-color: #F9FAFC;
}
</style>
