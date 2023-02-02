<script setup lang="ts">
import { RouterView } from 'vue-router'
import Navigation from './views/Navigation.vue'
import { Layout as ALayout, LayoutHeader as ALayoutHeader, LayoutContent as ALayoutContent } from 'ant-design-vue'
</script>

<template>
  <a-layout>
    <a-layout-header>
      <Navigation />
    </a-layout-header>
    <a-layout-content>
      <RouterView />
    </a-layout-content>
  </a-layout>
</template>

<style scoped>

</style>