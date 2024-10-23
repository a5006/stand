<template>
  <a-layout-content :style="contentStyle" :class="layoutClass">
    <MenuTab />
    <div class="bg-white shadow" :style="{ height: `${appStore.viewHeight}px` }">
      <router-view v-slot="{ Component }">
        <keep-alive :exclude="appStore.keepAliveExcludeList">
          <component :is="Component" />
        </keep-alive>
      </router-view>
    </div>
  </a-layout-content>
</template>

<script setup lang="ts">
import { computed, type CSSProperties } from "vue";
import MenuTab from "@/components/menuTab/MenuTab.vue";
import { useAppStore } from "@/stores/app";
const appStore = useAppStore();
const layoutClass = computed(() => {
  if (appStore.menuTabRoutes.length === 0) {
    return "p-2";
  }
  return "";
});
const contentStyle: CSSProperties = {
  minHeight: "100%",
  backgroundColor: "#f6f6f7",
};
</script>
<style lang="less" scoped></style>
