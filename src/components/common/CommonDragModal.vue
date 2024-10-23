<template>
    <a-modal :maskStyle="maskStyle" v-bind="$attrs" ref="modalRef" v-model:open="open">
        <slot />
        <template #title>
            <div ref="modalTitleRef" style="width: 100%; cursor: move">
                <slot name="title"></slot>
            </div>
        </template>
        <template #modalRender="{ originVNode }">
            <div :style="transformStyle">
                <component :is="originVNode" />
            </div>
        </template>
        <template #footer>
            <slot name="footer">
                <div class="flex justify-end">
                    <a-space>
                        <a-button type="primary" @click="onOk" :loading="loading">
                            确定
                        </a-button>
                        <a-button @click="onClose">
                            取消
                        </a-button>
                    </a-space>
                </div>
            </slot>

        </template>
    </a-modal>

</template>
<script lang="ts" setup>
import { useAttrs, ref, computed, CSSProperties, watch, watchEffect, PropType } from 'vue';
import { useDraggable, useVModel } from '@vueuse/core';
const attrs = useAttrs()
const props = defineProps<{
    modelValue?: boolean,
    showBlur?: boolean,
    onOk?: Function
}>()
const emit = defineEmits(['update:modelValue', 'close', 'ok'])
const open = useVModel(props, 'modelValue', emit)
const modalTitleRef = ref<HTMLElement>();
const { x, y, isDragging } = useDraggable(modalTitleRef);
const loading = ref(false)
const startX = ref<number>(0);
const startY = ref<number>(0);
const startedDrag = ref(false);
const transformX = ref(0);
const transformY = ref(0);
const preTransformX = ref(0);
const preTransformY = ref(0);
const originStyle = attrs.maskStyle as PropType<CSSProperties>
const maskStyle = computed(() => {
    return { backdropFilter: props.showBlur ? 'var(--bg-fitler)' : '', ...originStyle }
})
const dragRect = ref({ left: 0, right: 0, top: 0, bottom: 0 });
watch([x, y], () => {
    if (!startedDrag.value) {
        startX.value = x.value;
        startY.value = y.value;
        const bodyRect = document.body.getBoundingClientRect();
        const titleRect = modalTitleRef.value?.getBoundingClientRect();
        if (!titleRect) {
            return
        }
        dragRect.value.right = bodyRect.width - titleRect.width;
        dragRect.value.bottom = bodyRect.height - titleRect.height;
        preTransformX.value = transformX.value;
        preTransformY.value = transformY.value;
    }
    startedDrag.value = true;
});
watch(isDragging, () => {
    if (!isDragging) {
        startedDrag.value = false;
    }
});

watchEffect(() => {
    if (startedDrag.value) {
        transformX.value =
            preTransformX.value +
            Math.min(Math.max(dragRect.value.left, x.value), dragRect.value.right) -
            startX.value;
        transformY.value =
            preTransformY.value +
            Math.min(Math.max(dragRect.value.top, y.value), dragRect.value.bottom) -
            startY.value;
    }
});
const transformStyle = computed<CSSProperties>(() => {
    return {
        transform: `translate(${transformX.value}px, ${transformY.value}px)`,
    };
});

const onOk = async () => {
    try {
        if (props.onOk) {
            loading.value = true
            await props.onOk()
        }
        open.value = false
        emit('ok')
    } catch (err) {
        console.error(err)
    }
    loading.value = false
}


const onClose = () => {
    console.log('close')
    open.value = false
    emit('close')
}

</script>