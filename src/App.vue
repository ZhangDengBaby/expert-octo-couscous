<script setup lang="ts">
import { RouterView, useRouter } from 'vue-router'
import Navigation from './views/Navigation.vue'
import { ref } from 'vue';
import { getCookie } from '@/utils/utils'
import { Layout as ALayout, LayoutHeader as ALayoutHeader, LayoutContent as ALayoutContent, message } from 'ant-design-vue'

let router = useRouter()
let isLogin = ref(true)
router.beforeEach(to => {
  if (to.name === 'login' || to.name === 'registration') {
    isLogin.value = false
  } else {
    let token = getCookie('token')
    if (!token) {
      router.push('/login')
      isLogin.value = false
    } else {
      isLogin.value = true
    }
  }
})
message.config({
  duration: 3,
  maxCount: 3,
  prefixCls: 'my-message',
})
</script>

<template>
  <a-layout>
    <a-layout-header>
      <Navigation v-if="isLogin" />
    </a-layout-header>
    <a-layout-content>
      <RouterView />
    </a-layout-content>
  </a-layout>
</template>

<style lang='less'>
.my-message {
  position: fixed;
  top: 40px;
  left: 50%;
  transform: translate(-50%, -50%);
  box-shadow: 0 0 15px rgb(199, 197, 197);
  border-radius: 4px;
  .my-message-notice {
    padding: 2px 12px;
  }

  svg {
    color: #1890ff;
    margin-right: 8px;
  }

  .my-message-success {
    svg {
      color: #68e641;
    }
  }

  .my-message-warning {
    svg {
      color: #e6db41;
    }
  }

  .my-message-error {
    svg {
      color: #f81d22;
    }
  }
}
</style>