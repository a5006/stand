<template>
  <div class="view">
    <div class="flex items-center justify-center box">
      <div class="icon">
        <target.icon />
      </div>
      <div class="aside text-left ml-4">
        <a-typography-title :level="3" v-html="target.desc">
        </a-typography-title>
        <a-button type="primary" @click="onLink">{{ target.btnLabel }}</a-button>
      </div>
    </div>
  </div>
</template>

<script setup lang="tsx">
import NotfoundAniSvg from "./animateSvg/NotFoundAniSvg.vue";
import ErrorAniSvg from "./animateSvg/ErrorAniSvg.vue";
import BadReqAniSvg from "./animateSvg/BadReqAniSvg.vue";
import UnauthAniSvg from "./animateSvg/UnauthAniSvg.vue";
import ForbiddenAniSvg from "./animateSvg/ForbiddenAniSvg.vue";
import TooManyReqAniSvg from "./animateSvg/TooManyReqAniSvg.vue";
import { computed } from "vue";
import { JSX } from "vue/jsx-runtime";
import { useRouter } from "vue-router";
const router = useRouter()
const props = defineProps({
  type: {
    type: Number,
    default: 400,
  },
});
const typeMap: Record<number, { icon: JSX.Element; desc: string, btnLabel: string }> = {
  400: {
    icon: <BadReqAniSvg />,
    desc: "抱歉，请求失败",
    btnLabel: "返回主页",
  },
  401: {
    icon: <UnauthAniSvg />,
    desc: "抱歉，请先登录<br/>验证身份",
    btnLabel: "点击登录",

  },
  403: {
    icon: <ForbiddenAniSvg />,
    desc: "抱歉，您无权限访问<br/>该页面",
    btnLabel: "返回主页",

  },
  404: {
    icon: <NotfoundAniSvg />,
    desc: "抱歉，您访问的页面<br/>不存在",
    btnLabel: "返回主页",

  },
  429: {
    icon: <TooManyReqAniSvg />,
    desc: "抱歉，系统繁忙",
    btnLabel: "返回主页",

  },
  500: {
    icon: <ErrorAniSvg />,
    desc: "抱歉，系统出错了<br/>请联系管理员",
    btnLabel: "返回主页",

  },
};

const target = computed(() => typeMap[props.type]);

const onLink = () => {
  if (props.type === 401) {
    window.location.href = 'http://www.baidu.com'
    return
  }
  router.replace("/")
}
</script>
<style lang="less" scoped>
.view {
  .box {
    position: fixed;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    margin: auto;
  }

  .aside {
    flex-shrink: 0;
    width: 230px;
  }

  .icon {
    flex-shrink: 0;
    width: 500px;
  }
}
</style>
