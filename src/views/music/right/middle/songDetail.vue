<!-- 歌曲详情 -->
<template>
    <div class="songDetailBox">
        <a-table :columns="columns" :customRow="(record: object) => {
            return {
                onDblclick: () => onDblclick(record), // 双击行
            };
        }"
  :data-source="data" :pagination="false">
        </a-table>
        <div class="page">
            <a-pagination v-model:current="currentPage" @change="pageChange" :pageSizeOptions="pageSizeOptions"
                :total="total" :show-total="(total: number) => `总数 ${total}`" />
        </div>
    </div>
</template>

<script lang='ts'>
import { defineComponent, ref, reactive, watch } from 'vue'
import type { primitiveTypes } from '@/views/interface/public' // 常用TS接口引入
import { post } from '@/api/index'
import middleStore from '@/stores/middleStores'
import EventBus from '@/api/eventBus'

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
        let data = reactive<primitiveTypes[]>([{
            "id": 14,
            "songName": "当你",
            "singerName": "林俊杰",
            "keyValue": "music/60058622883.mp3",
            "duration": ""
        }])
        let pageSizeOptions = ref<string[]>(['10', '20', '50'])
        let total = ref<number>(0)
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
                singerName: '',
                currentPage,
                pageSize
            }
            if (props.type === '1') {
                parm.songName = store.searchValue
            } else {
                parm.singerName = store.searchValue
            }
            let res = await post(url, parm)

            if (res && res.status === 200) {
                console.log(2222, res.data.list);
                data.splice(0, Infinity, ...res.data.list)
                total.value = res.data.total
            }
        }
        // 分页、排序、筛选变化时触发
        let pageChange = (page: number, pageSize: number) => {
            console.log(page, pageSize);
            searchData(page, pageSize)
        }
        let onDblclick = (record:object) => {
            console.log(record);
            EventBus.emit('playMusic', record)
        }
        return {
            columns, data, pageChange, pageSizeOptions, currentPage, total, onDblclick
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
