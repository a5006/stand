<template>
  <div class="flex items-center flex-col" v-if="type !== 'success'">
    <slot name="skeleton" :data="{ type }" v-if="type === 'loading'">
      <a-skeleton
        active
        v-for="(_, id) in props.skeNum"
        :key="id"
        :class="[id !== 0 && id !== props.skeNum - 1 ? 'mt-6 mb-6' : '']"
      />
    </slot>
    <template v-if="type === 'error' || type === TIMEOUT">
      <component
        :is="type === TIMEOUT ? TimeoutAniSvg : BadReqFlatAniSvg"
        class="illustration"
      />
      <div class="relative bottom-5">
        <div class="text-2xl text-gray-800 mb-2 text-center font-bold">
          {{ type === TIMEOUT ? '请求超时' : ' 请求发生错误❗' }}
        </div>
        <a-button type="primary" class="btn" @click="resend">
          <template #icon>
            <RedoOutlined />
          </template>
          重试请求
        </a-button>
      </div>
    </template>
  </div>
  <template v-else>
    <slot :data="result"></slot>
  </template>
</template>

<script setup lang="ts">
import BadReqFlatAniSvg from '@/components/animateSvg/BadReqFlatAniSvg.vue';
import TimeoutAniSvg from '@/components/animateSvg/TimeoutAniSvg.vue';
import { RedoOutlined } from '@ant-design/icons-vue';
import { PropType, ref } from 'vue';
const TIMEOUT = 'TIMEOUT';
interface ReqFnType {
  (data: any): Promise<any>;
}
const props = defineProps({
  imgType: {
    type: String as PropType<'flat' | 'ani'>,
    default: 'flat'
  },

  skeNum: {
    type: Number,
    default: 1
  },
  reqFn: {
    type: Function as PropType<ReqFnType>,
    default: () => Promise.resolve()
  }
});
const result = ref();
const type = ref('loading');
let cacheParams: any;
const onRequest = async (data: any) => {
  type.value = 'loading';
  try {
    cacheParams = data;
    const res = await Promise.race([
      props.reqFn(data),
      new Promise((_, reject) => {
        setTimeout(() => {
          console.log('reject');
          reject(TIMEOUT);
        }, 10000);
      })
    ]);
    result.value = res;
    type.value = 'success';
    return res;
  } catch (err) {
    if (err === TIMEOUT) {
      type.value = TIMEOUT;
      console.log(err, 'err', type.value);
    } else {
      type.value = 'error';
    }
  }
};

const resend = () => {
  onRequest(cacheParams);
};

defineExpose({
  onRequest
});
</script>

<style scoped lang="less">
.illustration {
  width: 100%;
  max-width: 400px;
}

.btn {
  width: 200px;
  margin: 0 auto;
}
</style>
