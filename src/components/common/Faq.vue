<template>
    <a-tooltip>
        <template #title>
            <component :is=" renderTarget()"></component>
        </template>
        <div class="inline-block text-gray-800 hover:bg-gray-200 icon relative">
            <Helpcenter class="flex justify-center items-center " />
        </div>
    </a-tooltip>
</template>

<script setup lang='tsx'>
import { useSlots } from 'vue'
import { Helpcenter } from '@icon-park/vue-next'
const slots = useSlots()
const props = defineProps({
    title: {
        type: String,
        default: "",
        required: false
    }
})

const renderTarget = () => {
    return <> {slots.default ? slots.default() : props.title}</>
}

</script>

<style scoped lang='less'>
.icon {
    width: 24px;
    height: 24px;
    display: inline-block;
    text-align: center;
    border-radius: 50%;

    &>span {
        position: absolute;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        margin: auto;
    }
}
</style>