<script setup lang="ts">
import { RouterView, useRouter } from 'vue-router'
import Navigation from './views/Navigation.vue'
import { ref } from 'vue';
import { Layout as ALayout, LayoutHeader as ALayoutHeader, LayoutContent as ALayoutContent } from 'ant-design-vue'
let router = useRouter()
let isLogin = ref(true)
router.beforeEach(to => {
  if (to.name === 'login' || to.name === 'registration') {
    isLogin.value = false
  }
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

<style scoped>

</style>