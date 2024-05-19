<template>
  <div>
    <!-- <TheWelcome /> -->
    <!-- <audio id="audio1"
      src="https://api.liumingye.cn/m/api/link?id=m3f63OtUGNZoMDio1Kq9XvD5pl8uadf4ueyah31M7dWSL0qvZFeLha7oo0B3Bc5w&quality=320&_t=1716051519560&token=20230327.8123c10eddfa23e1c3ef72d1ad4f758c"
      preload="auto"></audio> -->
    <div @click="onSearch">123</div>
    <!-- <a
      href="https://api.liumingye.cn/m/api/link?id=m3f63OtUGNZoMDio1Kq9XvD5pl8uadf4ueyah31M7dWSL0qvZFeLha7oo0B3Bc5w&quality=320&_t=1716051519560&token=20230327.8123c10eddfa23e1c3ef72d1ad4f758c">123</a> -->
  </div>
</template>

<script lang='ts'>
import { defineComponent, ref, reactive } from 'vue'
import { Menu, MenuItem, MenuItemGroup, SubMenu, InputSearch } from 'ant-design-vue'
import { MailOutlined, AppstoreOutlined, SettingOutlined } from '@ant-design/icons-vue';
import { useRouter, useRoute } from 'vue-router';
import type { primitiveTypes } from '../interface/public' // 常用TS接口引入
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
  name: 'home',
  setup() {
    const current = ref<string[]>(['home']);
    const onSearch = () => {
      console.log('123');
      document.getElementById('audio1').play();
    }
    return {
      current,
      onSearch
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
