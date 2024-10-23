<template>
    <a-popover placement="left" v-model:open="open" trigger="click">
        <template #title>
            <div v-if="props.message">{{ props.message }}</div>
            <component :is="$slots.message" v-else />
        </template>
        <template #content>
            <div class="flex justify-center">
                <a-button type="primary" :loading="loading" class="mr-2" @click="onOk">确定</a-button>
                <a-button type="default" @click="onCancel">取消</a-button>
            </div>
        </template>
        <div @click="showTooltip">
            <slot></slot>
        </div>
    </a-popover>
</template>

<script setup lang='ts'>
import { PropType, ref, watch } from 'vue'
const emits = defineEmits(['update:modelValue', 'close', 'ok'])
interface ReqFn {
    (data?: any): Promise<any>
}
const props = defineProps({
    modelValue: {
        type: Boolean,
        default: false
    },
    message: {
        type: String,
        default: ''
    },
    submitFn: {
        type: Function as PropType<ReqFn>,
        default: () => Promise.resolve()
    }
})

// const open = useVModel(props, 'modelValue', emits)
const open = ref(props.modelValue)
const loading = ref(false)
const onCancel = () => {
    open.value = false
    emits("close")
}

const showTooltip = () => {
    open.value = true
}

const onOk = async () => {
    try {
        if (props.submitFn) {
            loading.value = true
            await props.submitFn()
        }
        open.value = false
        emits("ok")
    } catch (err) { console.error(err) }
    loading.value = false

}

watch(() => props.modelValue, v => {
    open.value = v
})

watch(() => open.value, v => {
    open.value = v
    emits("update:modelValue", v)
})

</script>

<style scoped lang='less'></style>