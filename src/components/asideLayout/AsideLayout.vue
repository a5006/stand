<template>
  <a-layout-sider :style="siderStyle" class="shadow-md">

  </a-layout-sider>
</template>

<script setup lang="ts">
import type { CSSProperties } from "vue";
const siderStyle: CSSProperties = {
  textAlign: "center",
  minHeight: "100%",
  backgroundColor: "#fff",
};
</script>
<style lang="less" scoped></style>
