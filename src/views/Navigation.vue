<template>
    <!-- vue3页面 -->
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
        <div class="user">
            <div>登录</div>
            <div>注册</div>
        </div>
    </div>
</template>

<script lang='ts'>
import { defineComponent, ref, reactive } from 'vue'
import { Menu, MenuItem, MenuItemGroup, SubMenu } from 'ant-design-vue'
import { MailOutlined, AppstoreOutlined, SettingOutlined } from '@ant-design/icons-vue';
import { useRouter, useRoute } from 'vue-router';
export default defineComponent({
    components: {
        MailOutlined,
        AppstoreOutlined,
        SettingOutlined,
        AMenu: Menu,
        AMenuItem: MenuItem,
        AMenuItemGroup: MenuItemGroup,
        ASubMenu: SubMenu
    },
    name: 'Navigation',
    setup() {
        const router = useRouter()
        const route = useRoute()
        console.log(11, route.name);
        const current = ref<string[]>(['home']);
        //@ts-ignore
        current.value = [route.name]
        let basic = reactive({
            current: 'home'
        })
        let menuHandleSelect = () => {
            router.push('/' + current.value[0])
        }
        return {
            basic,
            menuHandleSelect,
            current
        }
    }
})
</script>

<style lang='less' scoped>
.nav {
    display: flex;
    justify-content: space-between;
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

    :nth-child(1) {
        background-color: #0052d9;
        color: #fff;
    }

    :nth-child(1):hover {
        background-color: #336dcc;
    }

    >div {
        width: 86px;
        height: 62px;
        line-height: 62px;
    }
}
</style>