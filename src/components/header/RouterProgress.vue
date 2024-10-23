<template>
  <a-progress
    class="progress"
    v-if="visible"
    :strokeWidth="1"
    :percent="appStore.routerProgressPercent"
    :showInfo="false"
  />
</template>

<script setup lang="ts">
import { useAppStore } from "@/stores/app";
import { ref, watch } from "vue";
const appStore = useAppStore();
const visible = ref(false);
watch(
  () => appStore.routerProgressPercent,
  (v: number) => {
    if (v > 1) {
      visible.value = true;
    }
    if (v >= 100) {
      setTimeout(() => {
        visible.value = false;
      }, 200);
    }
  }
);
</script>

<style scoped lang="less">
.progress {
  position: fixed;
  margin: 0;
  z-index: 10;
  top: -12px;
  left: 0;
  right: 0;
}
</style>
