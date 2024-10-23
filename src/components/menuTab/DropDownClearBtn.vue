<template>
  <a-dropdown :arrow="{ pointAtCenter: true }">
    <div
      class="cursor-pointer extra-icon text-center flex justify-center border-gray-300 bg-white border-r-0 border border-t-0 border-b-0"
    >
      <Clear class="fz16 mt-1.5" />
    </div>
    <template #overlay>
      <a-menu>
        <a-menu-item key="0" @click="onClearDropdownChange('current')">
          <div class="w-32 hover:text-blue-500 flex items-center">
            <Tag class="mr-2" /> 删除当前标签页
          </div>
        </a-menu-item>
        <div class="border-t mt-2 mb-2"></div>
        <a-menu-item key="1" @click="onClearDropdownChange('other')">
          <div class="w-36 hover:text-blue-500 flex items-center">
            <Layers class="mr-2" /> 清空非当前标签页
          </div>
        </a-menu-item>
        <div class="border-t mt-2 mb-2"></div>
        <a-menu-item key="2" @click="onClearDropdownChange('all')">
          <div class="hover:text-blue-500 flex items-center">
            <Layers class="mr-2" /> 清空所有标签页
          </div>
        </a-menu-item>
      </a-menu>
    </template>
  </a-dropdown>
</template>

<script setup lang="ts">
import { Tag, Layers, Clear } from "@icon-park/vue-next";

import { useMenuTabHooks } from "./menuTabHooks.tsx";

const { onClearDropdownChange } = useMenuTabHooks();
</script>

<style scoped lang="less">
.extra-icon {
  width: 40px;
}
</style>
