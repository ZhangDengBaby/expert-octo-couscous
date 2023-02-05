<template>
    <!-- 头部导航页面 -->
    <div class="nav">
        <a-menu v-model:selectedKeys="current" mode="horizontal" @select="menuHandleSelect" class="menu">
            <a-menu-item key="home">
                <template #icon>
                    <mail-outlined />
                </template>
                主页
            </a-menu-item>
            <a-menu-item key="about">
                <template #icon>
                    <appstore-outlined />
                </template>
                Navigation Two
            </a-menu-item>
            <a-sub-menu key="sub1">
                <template #icon>
                    <setting-outlined />
                </template>
                <template #title>Navigation Three - Submenu</template>
                <a-menu-item-group title="Item 1">
                    <a-menu-item key="setting:1">Option 1</a-menu-item>
                    <a-menu-item key="setting:2">Option 2</a-menu-item>
                </a-menu-item-group>
                <a-menu-item-group title="Item 2">
                    <a-menu-item key="setting:3">Option 3</a-menu-item>
                    <a-menu-item key="setting:4">Option 4</a-menu-item>
                </a-menu-item-group>
            </a-sub-menu>
        </a-menu>
        <div class="Search">
            <a-input-search v-model:value="basic.searchValue" placeholder="input search text" enter-button
                @search="onSearch" />
        </div>
        <div class="user">
            <div @click="loginClick">登录</div>
            <div @click="registrationClick">注册</div>
        </div>
    </div>
</template>

<script lang='ts'>
import { defineComponent, ref, reactive } from 'vue'
import { Menu, MenuItem, MenuItemGroup, SubMenu, InputSearch } from 'ant-design-vue'
import { MailOutlined, AppstoreOutlined, SettingOutlined } from '@ant-design/icons-vue';
import { useRouter, useRoute } from 'vue-router';
import type { primitiveTypes } from './interface/public' // 常用TS接口引入
export default defineComponent({
    components: {
        MailOutlined,
        AppstoreOutlined,
        SettingOutlined,
        AMenu: Menu,
        AMenuItem: MenuItem,
        AMenuItemGroup: MenuItemGroup,
        ASubMenu: SubMenu,
        AInputSearch: InputSearch
    },
    name: 'Navigation',
    setup() {
        const router = useRouter()
        const route = useRoute()
        const current = ref<string[]>(['home']);
        let basic = reactive<primitiveTypes>({
            searchValue: ''
        })
        router.beforeEach((to) => {
            // @ts-ignore
            current.value = [to.name || 'home']
        })
        let menuHandleSelect = () => {
            router.push('/' + current.value[0])
        }
        const onSearch = (searchValue: string) => {
            console.log('use value', searchValue);
        }
        const loginClick = () => { // 点击跳转登录页面
            router.push('/login')
        }
        const registrationClick = () => { // 点击跳转注册页面
            router.push('/registration')
        }
        return {
            basic,
            menuHandleSelect,
            current,
            onSearch,
            loginClick,
            registrationClick
        }
    }
})
</script>

<style lang='less' scoped>
.nav {
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 62px;
    border-bottom: 1px solid #f0f0f0;
}

.menu {
    height: 62px;

    :deep(.ant-menu-item),
    :deep(.ant-menu-submenu) {
        display: flex;
        align-items: center;
    }
}

.user {
    width: 176px;
    display: flex;
    text-align: center;
    height: 100%;
    cursor: pointer;

    >:nth-of-type(1) {
        background-color: #0052d9;
        color: #fff;
    }

    >:nth-of-type(1):hover {
        background-color: #336dcc;
    }

    >div {
        width: 86px;
        height: 62px;
        line-height: 62px;
    }
}
</style>