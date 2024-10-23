<template>
  <a-tooltip :title="props.value">
    <component :is="RenderLabel"></component>
  </a-tooltip>
</template>

<script setup lang="tsx">
import { formatDate } from '@/utils/util';
const props = defineProps({
  value: {
    type: String,
    default: ''
  },
  size: {
    type: String,
    default: ''
  }
});

const RenderLabel = () => {
  const cls = 'label hover:bg-gray-200 rounded';
  return props.size === 'small' ? (
    <small class={cls}>{formatDate(props.value)}</small>
  ) : (
    <span class={cls}>{formatDate(props.value)}</span>
  );
};
</script>

<style scoped lang="less">
.label {
  padding: 2px 5px;
}
</style>
