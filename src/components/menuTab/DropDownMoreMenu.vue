<template>
  <a-dropdown>
    <div
      class="border-gray-300 cursor-pointer extra-icon text-center flex justify-center bg-white border-r-0 border border-t-0 border-b-0"
    >
      <MoreOne class="text-xl mt-1" />
    </div>
    <template #overlay>
      <div class="drop-box shadow-md border pt-1 pb-1 rounded">
        <div v-for="item in props.hiddenTabs" :key="item.path">
          <div
            class="hover:bg-blue-100 flex items-center cursor-pointer bg-white p-1 pl-2 pr-2 border border-gray-300 border-t-0 border-b-0 border-r-0"
          >
            <component :is="getBookIconSrc(item.path)" class="mt-1 mr-1" />
            <div class="word-box">
              {{ item.label }}
            </div>
            <CloseSmall
              @click="onCloseMenu(item.path)"
              class="close-item ml-2 text-gray-500 hover:bg-gray-300 rounded"
            />
          </div>
        </div>
      </div>
    </template>
  </a-dropdown>
</template>
<script setup lang="ts">
import { PropType, watch } from "vue";
import { MoreOne, CloseSmall } from "@icon-park/vue-next";
import { useMenuTabHooks } from "./menuTabHooks.tsx";
import { MenuTabRoutesType } from "@/stores/app";
const props = defineProps({
  hiddenTabs: {
    type: Array as PropType<MenuTabRoutesType[]>,
    default: () => [],
  },
});

const { getBookIconSrc, onCloseMenu } = useMenuTabHooks();
watch(
  () => props.hiddenTabs,
  (h) => {
    console.log(h, "hhhhhhhhhh");
  },
  {
    immediate: true,
  }
);
</script>
<style class="less" scoped>
@import url("./menuTab.less");

.extra-icon {
  width: 40px;
}

.drop-box {
  max-height: 200px;
  overflow-y: auto;
}

div.word-box {
  width: 100px;
}
.close-item {
  width: 20px;
  height: 20px;
  text-align: center;
  line-height: 24px;
}
</style>
