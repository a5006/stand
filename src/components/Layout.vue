<template>
  <div class="global">
    <RouterProgress class="progress" />
    <slot> </slot>
  </div>
</template>

<script setup lang="ts">
import RouterProgress from "@/components/header/RouterProgress.vue";
import { useAppStore } from "@/stores/app";
import { onMounted, onUnmounted } from "vue";
const appStore = useAppStore();
const getHeight = () => {
  const scrollBarHeight = window.innerWidth <= 1360 ? 14 : 0;
  const headerHeight = 64;
  const tabHeight = appStore.menuTabRoutes.length > 0 ? 40 : 8;
  const padding = 8;
  const viewInnerHeight =
    window.innerHeight - scrollBarHeight - headerHeight - tabHeight - padding;
  appStore.setViewHeight(Math.max(viewInnerHeight, 500));
};

onMounted(() => {
  getHeight();
  window.addEventListener("resize", getHeight);
});

onUnmounted(() => {
  window.removeEventListener("resize", getHeight);
});
</script>
<style lang="less" scoped>
.global {
  min-width: var(--view-width);
}
</style>
