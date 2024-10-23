<template>
  <a-layout class="layout">
    <Header />
    <a-layout>
      <!-- <AsideLayout /> -->
      <ContentLayout />
    </a-layout>
  </a-layout>
</template>

<script setup lang="ts">
import Header from "./header/Header.vue";
// import AsideLayout from "./asideLayout/AsideLayout.vue";
import ContentLayout from "@/components/contentLayout/ContentLayout.vue";
</script>
<style lang="less" scoped>
.layout {
  min-height: var(--global-min-height);
  position: relative;
}
</style>
