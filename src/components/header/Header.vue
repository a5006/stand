<template>
  <a-layout-header :style="headerStyle">
    <div class="flex items-center justify-between absolute header">
      <div
        class="quicksand flex-shrink-0 text-xl flex items-center font-bold cursor-pointer hover:bg-gray-100 p-2 rounded"
        @click="onLinkHome"
      >
        <span class="logo font-bold rounded"> NONE</span>
        <span class="ml-2">nothing</span>
        <img class="icon ml-2" :src="base64Img.book_stack" />
      </div>
      <div class="flex-1 ml-10 mr-10">
        <!-- 菜单 -->
        <a-space align="center">
          <div class="header-item" v-for="item in list" :key="item.path">
            <RouterLink :to="item.path" tag="a">
              <div
                :class="[
                  'fz16 hover:bg-gray-100 text-black rounded relative',
                  activePath === item.path ? 'text-primary  active' : '',
                ]"
              >
                {{ item.label }}
              </div>
            </RouterLink>
          </div>
        </a-space>
      </div>
      <!-- 搜索 -->
      <SearchInput />
      <a-button type="primary" @click="onOpenTemplate">
        <template #icon>
          <WritingFluently class="pencial" />
        </template>
        新增知识</a-button
      >

      <a-tooltip title="更新日志">
        <a-button
          class="ml-4 mr-4"
          type="default"
          shape="circle"
          @click="appStore.setChangeLogVisible(true)"
        >
          <template #icon>
            <Log class="fz16" />
          </template>
        </a-button>
      </a-tooltip>
      <UserInfo />
    </div>
    <ChangeLog />
  </a-layout-header>
</template>

<script setup lang="ts">
import { computed, type CSSProperties, onMounted, onUnmounted } from "vue";
import SearchInput from "./globalSeach/SearchInput.vue";
import { Log, WritingFluently } from "@icon-park/vue-next";
import base64Img from "@/utils/base64img.json";
import ChangeLog from "@/components/changeLog/ChangeLog.vue";
import UserInfo from "./userInfo/userInfo.vue";
import { useAppStore } from "@/stores/app";
import { theme } from "ant-design-vue";
import { RouterLink, useRoute, useRouter } from "vue-router";
import {
  CHARTS_PATH,
  HOME_NAME,
  HOME_PATH,
  LIST_PATH,
} from "@/router/routes/Home";
import { useWriteStore } from "@/stores/write";

const { useToken } = theme;
const { token } = useToken();
const appStore = useAppStore();
const writeStore = useWriteStore();
const route = useRoute();
const router = useRouter();
const activePath = computed(() => route.path);
const list = [
  {
    path: HOME_PATH,
    label: "主页",
  },
  {
    path: LIST_PATH,
    label: "知识列表",
  },
  {
    path: CHARTS_PATH,
    label: "统计报表",
  },
];

const headerStyle: CSSProperties = {
  position: "relative",
  height: "64px",
  paddingInline: 50,
  lineHeight: "64px",
  backgroundColor: "#fff",
  boxShadow: token.value.boxShadow,
  zIndex: 9,
};

const onLinkHome = () => {
  router.push({ name: HOME_NAME });
};

const onOpenTemplate = () => {
  writeStore.setDropDownOpen("templateModalOpen", true);
};

function eventFn(event: KeyboardEvent) {
  // 检查是否同时按下了 'Ctrl' 和 'K' 键
  if (event.ctrlKey && event.key === "k") {
    event.preventDefault();
    appStore.globalSerchVisible = true;
  }
}

onMounted(() => {
  document.addEventListener("keydown", eventFn);
});

onUnmounted(() => {
  document.removeEventListener("keydown", eventFn);
});
</script>

<style scoped lang="less">
.logo {
  color: #fff;
  padding: 0 10px;
  background: var(--primary-color);
  font-weight: 1000;
}

.header {
  padding: 0 50px;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  margin: auto;

  &-item {
    min-width: 100px;
    text-align: center;
    height: 40px;
    line-height: 40px;
  }

  .search {
    width: 300px;
    height: 40px;
    line-height: 40px;
    transition: 0.2s;
  }
}

div.active {
  font-weight: bold;
  color: var(--primary-color);
}

.active::after {
  // position: absolute;
  // content: "";
  // display: block;
  // background: var(--primary-color);
  // bottom: 0;
  // left: 0;
  // right: 0;
  // margin: auto;
  // height: 3px;
  // width: 70%;
  // border-radius: 4px;
}

.pencial {
  position: relative;
  top: 2px;
  margin-right: 10px;
}

.icon {
  width: 22px;
}
</style>
