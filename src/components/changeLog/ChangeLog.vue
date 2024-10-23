<template>
  <a-drawer @close="store.setChangeLogVisible(false)" :open="store.changeLogVisible" class="custom-class"
    root-class-name="root-class-name" :maskStyle="{ backdropFilter: 'var(--bg-fitler)' }" style="color: red"
    placement="right">
    <template #title>
      <div class="flex items-center">
        更新日志
        <Log class="ml-2 leading-3" />
      </div>
    </template>
    <a-timeline>
      <a-timeline-item v-for="(item, idx) in list" :key="idx">
        <div>
          <a-typography-title class="inline-block" :level="4">
            {{ item.version }}</a-typography-title>
          <small class="ml-2"><a-tag> {{ item.createdAt }}</a-tag></small>
        </div>
        <div class="item flex mt-1" v-for="(sitem, sidx) in item.upgradeList" :key="sidx">
          {{ sitem.icon }}
          <a-typography-text class="ml-1"> {{ sitem.desc }} </a-typography-text>
        </div>
      </a-timeline-item>
    </a-timeline>
  </a-drawer>
</template>

<script setup lang="ts">
import { useAppStore } from "@/stores/app";
import { Log } from "@icon-park/vue-next";

const store = useAppStore();
const iconType = {
  feat: "🆕",
  fixed: "🐞",
  tools: "🛠",
};
const list = [
  {
    version: "5.14.2",
    createdAt: "2022-12-12",
    upgradeList: [
      {
        type: "feat",
        icon: iconType["feat"],
        desc: "发布新系统",
      },
      {
        type: "feat",
        icon: iconType["feat"],
        desc: "发布新系统",
      },
    ],
  },
  {
    version: "5.14.2",
    createdAt: "2022-12-12",
    upgradeList: [
      {
        type: "feat",
        icon: iconType["feat"],
        desc: "发布新系统发布新系统发布新系统发布新系统发布新系统发布新系统发布新系统发布新系统发布新系统发布新系统发布新系统发布新系统发布新系统发布新系统发布新系统发布新系统发布新系统",
      },
      {
        type: "feat",
        icon: iconType["feat"],
        desc: "发布新系统",
      },
    ],
  },
];
</script>
<style lang="less" scoped>
.item {
  position: relative;
  margin-left: 22px;

  .icon {
    // width: 20px;
    height: 20px;
  }

  &::before {
    content: "";
    display: "block";
    position: absolute;
    width: 7px;
    height: 7px;
    border-radius: 50%;
    border: 2px solid theme("backgroundColor.gray.300");
    left: -20px;
    top: 0;
    bottom: 0;
    margin: auto;
  }
}
</style>
