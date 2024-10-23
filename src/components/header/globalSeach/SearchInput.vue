<template>
  <div
    @click="onClick"
    class="border-gray-300 hover:border-blue-600 cursor-pointer search border bg-gray-100 pl-2 pr-2 rounded mr-4 ml-4 flex items-center"
  >
    <Search class="mr-2 fz16 mt-1" /> 搜索知识文档
    <a-tag color="#fff" :style="tagStyle">CTRL+K</a-tag>
    <GlobalSearchModal ref="searchRef" />
  </div>
</template>

<script setup lang="ts">
import { Search } from '@icon-park/vue-next';
import { onMounted, onUnmounted, ref } from 'vue';
import GlobalSearchModal from './GlobalSearchModal.vue';
import { useAppStore } from '@/stores/app';
import { useWriteStore } from '@/stores/write';
const appStore = useAppStore();
const writeStore = useWriteStore();
const searchRef = ref();
const tagStyle = {
  color: '#222',
  border: `1px solid gray`,
  marginLeft: '10px',
  fontFamily: 'quicksand',
  fontWeight: 500
};

function eventFn(event: KeyboardEvent) {
  console.log(event.key, 'sss');

  const keyMap = {
    Escape: () => {
      appStore.globalSerchVisible = false;
    },
    ArrowDown: () => {
      searchRef.value?.toDown();
    },
    ArrowUp: () => {
      searchRef.value?.toUp();
    },
    Enter: () => {
      searchRef.value?.onEnter();
    }
  };
  if (keyMap[event.key] && appStore.globalSerchVisible) {
    event.preventDefault();
    keyMap[event.key]();
  }
}

const onClick = () => {
  appStore.globalSerchVisible = true;
  writeStore.setDropDownOpen();
};

// 监听整个文档的键盘按下事件
onMounted(() => {
  document.addEventListener('keydown', eventFn);
});

onUnmounted(() => {
  document.removeEventListener('keydown', eventFn);
});
</script>

<style scoped lang="less"></style>
