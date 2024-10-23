<template>
  <div
    v-if="appStore.menuTabRoutes.length"
    class="bg-gray-50 tabs border-gray-200 border border-l-0 flex justify-between"
  >
    <div class="flex tab-container" id="draggable">
      <div
        @click="onTabChange(item.path)"
        :label="item.label"
        :type="item.type"
        :path="item.path"
        v-for="item in appStore.menuTabRoutes"
        :key="item.path"
        :class="[
          appStore.menuTabActiveKey === item.path && 'active',
          'tab-item'
        ]"
      >
        <div class="menu-item">
          <div
            class="item flex items-center cursor-pointer bg-white p-1 pl-2 pr-2 border border-gray-300 border-t-0 border-l-0 border-b-0"
          >
            <component
              :is="getBookIconSrc(item.path)"
              class="text-gray-500 relative icon mr-1"
            />
            <div class="word-box flex-1">
              {{ item.label }}
            </div>
            <CloseSmall
              @click="
                (e) => {
                  e.stopPropagation();
                  onCloseMenu(item.path);
                }
              "
              class="ml-2 text-gray-500 hover:bg-gray-300 rounded close-item"
            />
          </div>
        </div>
      </div>
    </div>
    <!-- 按钮 -->
    <div class="flex">
      <DropDownMoreMenu :hiddenTabs="hiddenTabs" v-if="hiddenTabs.length" />
      <!-- 删除下拉按钮 -->
      <DropDownClearBtn />
    </div>
  </div>
</template>
<script lang="ts" setup>
import DropDownClearBtn from './DropDownClearBtn.vue';
import { nextTick, onMounted, onUnmounted, ref, watch, Ref } from 'vue';
import { CloseSmall } from '@icon-park/vue-next';
import { useRoute, useRouter } from 'vue-router';
import DropDownMoreMenu from './DropDownMoreMenu.vue';
import { MenuTabRoutesType, MenuTabTypeType, useAppStore } from '@/stores/app';
import Sortable from 'sortablejs';
import { cloneDeep } from 'lodash';
import { useMenuTabHooks } from './menuTabHooks.tsx';
import {
  HOME_NAME,
  HOME_PATH,
  LIST_PATH,
  WRITE_PATH,
  LIST_NAME,
  DETAIL_NAME,
  DETAIL_PATH,
  WRITE_NAME
} from '@/router/routes/Home';
const route = useRoute();
const router = useRouter();
const appStore = useAppStore();
const ifMoreBtnVisible = ref(false);
// 新增ref属性来存储隐藏的tabs
const hiddenTabs: Ref<MenuTabRoutesType[]> = ref([]);

let addedListener: EventHandler | null = null; // 存储已添加的事件处理程序引用

const { getBookIconSrc, onCloseMenu } = useMenuTabHooks();

const onTabChange = (link: string) => {
  router.push(link);
};

// 更新隐藏的tabs
const updateHiddenTabs = () => {
  const tabContainer = document.querySelector('.tab-container') as HTMLElement;
  const tabItems = Array.from(document.querySelectorAll('.tab-item'));
  if (!tabContainer) {
    return;
  }
  // 计算容器的可视范围
  const containerRect = tabContainer.getBoundingClientRect();
  const visibleLeft = containerRect.left;
  const visibleRight = containerRect.right;

  // 检查每个tab项是否在可视范围内
  const hiddenEls = tabItems.filter((tabItem) => {
    const tabRect = tabItem.getBoundingClientRect();
    return tabRect.right < visibleLeft || tabRect.left > visibleRight;
  });
  const arr = hiddenEls.map((item) => {
    const path = item.getAttribute('path') as string;
    const type = item.getAttribute('type') as MenuTabTypeType;
    const label = item.getAttribute('label') as string;
    const obj = { path, type, label };
    return obj;
  });
  hiddenTabs.value = arr;
};

// 监听tab-container的滚动事件来更新隐藏的tabs
const onTabContainerScroll = () => {
  updateHiddenTabs(); // 更新隐藏的tabs
};

const init = () => {
  const el = document.querySelector('#draggable') as HTMLElement;
  if (el) {
    new Sortable(el, {
      animation: 150,
      onEnd(e) {
        const tabMenuData = cloneDeep(appStore.menuTabRoutes);
        const oldIdx = e.oldIndex;
        const newIdx = e.newIndex;
        if (oldIdx !== undefined && newIdx !== undefined) {
          const oldData = tabMenuData[oldIdx];
          const newData = tabMenuData[newIdx];
          tabMenuData[oldIdx] = newData;
          tabMenuData[newIdx] = oldData;
          appStore.setMenuTabRoute(tabMenuData);
        }
      }
    });
  }
};

type EventHandler = (event: WheelEvent) => void;

function horizontalScroll(event: WheelEvent, scrollableDiv: HTMLElement): void {
  event.preventDefault();
  scrollableDiv.scrollLeft += event.deltaY;
}

const addScroll = (): void => {
  const scrollableDiv = document.querySelector('.tab-container') as HTMLElement;
  if (scrollableDiv) {
    addedListener = (e: WheelEvent) => horizontalScroll(e, scrollableDiv);
    scrollableDiv.addEventListener('wheel', addedListener as EventListener);
    scrollableDiv.addEventListener('scroll', onTabContainerScroll); // 添加滚动监听事件
    window.addEventListener('resize', updateHiddenTabs);
  }
};

const removeScroll = (): void => {
  const scrollableDiv = document.querySelector('.tab-container') as HTMLElement;
  if (scrollableDiv && addedListener) {
    scrollableDiv.removeEventListener('scroll', onTabContainerScroll); // 移除滚动监听事件
    scrollableDiv.removeEventListener('wheel', addedListener as EventListener);
    window.removeEventListener('resize', updateHiddenTabs);
  }
};

// 是否显示下拉菜单
const checkIfShowMoreBtn = () => {
  const tabItems = document.querySelectorAll('.tab-item');
  const arr = Array.from(tabItems);
  let tabMenusTotalWidth = 0;
  for (let item of arr) {
    const width = item.getBoundingClientRect()?.width || 0;
    tabMenusTotalWidth += width;
  }
  const btnWidth = 40 * 2;
  const paddingWidth = 18;
  const tabMenusBoxAllocatedWidth =
    Math.max(window.innerWidth, 1360) - btnWidth - paddingWidth; //分配的宽度
  if (tabMenusTotalWidth - 50 >= tabMenusBoxAllocatedWidth) {
    ifMoreBtnVisible.value = true;
  } else {
    ifMoreBtnVisible.value = false;
  }
};

const initCurrentTab = (
  type: MenuTabTypeType,
  defaultLabel: string,
  currentPath: string
) => {
  if (
    route.path === currentPath &&
    !appStore.menuTabRoutes.find((item) => item.path === currentPath)
  ) {
    appStore.setMenuTabRoute({
      path: currentPath,
      label: defaultLabel,
      type
    });
  }
};

watch(
  () => route.path,
  (r) => {
    appStore.setMenuActiveKey(r);
  },
  { immediate: true }
);

onMounted(() => {
  nextTick(() => {
    init();
    checkIfShowMoreBtn();
    addScroll();
    updateHiddenTabs();
  });
});

onUnmounted(() => {
  removeScroll(); // 移除滚动监听
});

watch(
  () => appStore.menuTabRoutes.length,
  (len) => {
    if (len) {
      init();
      checkIfShowMoreBtn();
      nextTick(() => {
        updateHiddenTabs();
      });
    }
  }
);

watch(
  () => route.name,
  (name) => {
    // 如果是首页
    const routeNameMap = {
      [HOME_NAME]: () => {
        if (!appStore.menuTabRoutes.find((item) => item.path === HOME_PATH)) {
          // 不做出头鸟
          if (appStore.menuTabRoutes.length) {
            appStore.setMenuTabRoute({
              path: HOME_PATH,
              label: '主页',
              type: 'menu'
            });
          }
        }
      },
      [LIST_NAME]: () => {
        initCurrentTab('menu', '知识列表', LIST_PATH);
      },
      [DETAIL_NAME]: () => {
        const id = route.params.id;
        const currentPath = `${DETAIL_PATH}/${id}`;
        if (
          route.path === currentPath &&
          !appStore.menuTabRoutes.find((item) => item.path === currentPath)
        ) {
          appStore.setMenuTabRoute({
            path: currentPath,
            label: '知识详情',
            type: 'article'
          });
        }
      },
      [WRITE_NAME]: () => {
        initCurrentTab('menu', '新建知识', WRITE_PATH);
      }
    };
    console.log(name);
    if (name) {
      routeNameMap[name] && routeNameMap[name]();
    }
  },
  { immediate: true }
);
</script>

<style class="less" scoped>
@import url('./menuTab.less');

.tabs {
  /* width: calc(100% - 16px); */
  overflow: hidden;
}

.tab-container {
  width: calc(100% - 80px);
  overflow: hidden;
  flex-shrink: 0;
}

.tab-item {
  flex-shrink: 0;
}

.menu-item {
  max-width: 180px;
  min-width: 120px;
  position: relative;
  height: 32px;
  line-height: 32px;

  &:hover {
    &::before {
      content: '';
      display: block;
      position: absolute;
      left: 5px;
      right: 5px;
      top: 0;
      bottom: 0;
      height: 22px;
      z-index: 1;
      margin: auto;
      border-radius: 4px;
      background-color: theme('backgroundColor.gray.200');
    }
  }
}

.item {
  height: 32px;
  line-height: 32px;
  left: 0;
  right: 0;
  margin: auto;
  position: absolute;
  z-index: 4;
  background: transparent;
}

.close-item {
  width: 20px;
  height: 20px;
  text-align: center;
  line-height: 20px;
  border: 1px solid transparent;

  &:hover {
    border: 1px solid #fff;
  }
}
</style>
