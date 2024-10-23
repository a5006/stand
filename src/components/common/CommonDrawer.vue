<template>
    <a-drawer @close="onClose" v-bind="$attrs" v-model:open="data" :maskStyle="maskStyle">
        <template #title>
            <slot name="title" />
        </template>
        <template #footer>
            <slot name="footer" />
        </template>
        <template #extra>
            <slot name="extra" />
        </template>
        <template #default>
            <slot />
        </template>
    </a-drawer>

</template>

<script setup lang='ts'>
import { useAttrs, computed, PropType, CSSProperties } from 'vue'
import { useVModel } from '@vueuse/core'
const attrs = useAttrs()
const props = defineProps<{
    modelValue?: boolean,
    showBlur?: boolean
}>()
const emit = defineEmits(['update:modelValue', 'close'])
const data = useVModel(props, 'modelValue', emit)
const originStyle = attrs.maskStyle as PropType<CSSProperties>
const maskStyle = computed(() => {
    return { backdropFilter: props.showBlur ? 'var(--bg-fitler)' : '', ...originStyle }
})
const onClose = () => {
    emit("close", false)
}
</script>

<style scoped lang='less'></style>