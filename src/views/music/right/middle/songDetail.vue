<!-- 歌曲详情 -->
<template>
    <div class="songDetailBox">
        <a-table :columns="columns" :data-source="data" :pagination="false">
        </a-table>
        <div class="page">
            <a-pagination v-model:current="currentPage" @change="pageChange" :pageSizeOptions="pageSizeOptions"
                :total="total" :show-total="(total: number) => `总数 ${total}`" />
        </div>
    </div>
</template>

<script lang='ts'>
import { defineComponent, ref, reactive, watch } from 'vue'
import type { primitiveTypes } from '@/views/interface/public.ts' // 常用TS接口引入
import { post } from '@/api/index'
import middleStore from '@/stores/middleStores'
import type { JSX } from '@babel/types'

export default defineComponent({
    components: {
    },
    name: 'songDetail',
    props: ['type'],
    setup(props, ctx) {
        const store = middleStore()
        let columns = reactive<primitiveTypes[]>([
            {
                title: '歌曲',
                dataIndex: 'songName',
                key: 'songName',
                width: 400,
                ellipsis: true
            }, {
                title: '歌手',
                dataIndex: 'singerName',
                key: 'singerName',
                width: 200,
                ellipsis: true
            }, {
                title: '时长',
                dataIndex: 'duration',
                key: 'duration',
                width: 200,
                ellipsis: true
            }, {
                title: '操作',
                dataIndex: 'operation',
                key: 'operation',
            }])
        let data = reactive<primitiveTypes[]>([])
        let pageSizeOptions = ref<string[]>(['10', '20', '50'])
        let total = ref<number>(100)
        let currentPage = ref<number>(1)
        store.$subscribe((mutation, state) => {
            if (state.middle === "SearchDetails") searchData(1, 10)
        })
        watch(() => props.type, (newValue, oldValue) => {
            searchData(1, 10)
        }, { deep: true });
        // 查询列表数据
        let searchData = async (currentPage: number, pageSize: number) => {
            let url = `/music/querybyname`
            let parm = {
                songName: '',
                singerName: ''
            }
            if (props.type === '1') {
                parm.songName = store.searchValue
            } else {
                parm.singerName = store.searchValue
            }
            let res = await post(url, parm)
            console.log(1111, res);

            if (res && res.code === 200) {
                data.splice(0, Infinity, ...res.data)
            }
        }
        // 分页、排序、筛选变化时触发
        let pageChange = (page: number, pageSize: number) => {
            console.log(page, pageSize);
            searchData(page, pageSize)
        }
        return {
            columns, data, pageChange, pageSizeOptions, currentPage, total
        };
    }
})
</script>

<style lang='less' scoped>
.songDetailBox {
    .page {
        display: flex;
        justify-content: right;
        padding: 12px;
    }
}
</style>
