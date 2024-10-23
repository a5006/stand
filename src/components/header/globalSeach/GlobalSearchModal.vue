<template>
  <Teleport to="body">
    <div
      @click="onBlur"
      class="shadow-md rounded-md modal fixed bg-gray-100 border border-gray-300"
      v-if="appStore.globalSerchVisible"
    >
      <div
        @click="onFocus"
        :class="[
          'm-2 p-2 rounded search flex items-center bg-white border border-blue-500',
          ifFocus ? 'shadow shadow-blue-300' : ''
        ]"
      >
        <Search class="text-2xl top-0.5 relative" />
        <a-input
          ref="inputRef"
          v-model:value="inputValue"
          placeholder="搜索文档"
          size="large"
          class="search-input"
        ></a-input>
        <div
          v-if="inputValue && !loading"
          class="cursor-pointer hover:bg-gray-100 search-close"
          @click="onClear"
        >
          <CloseSmall class="icon relative top-0.5 text-gray-400" />
        </div>
        <LoadingOutlined class="text-blue-500" v-if="loading" />
      </div>

      <div class="content flex-1">
        <!-- 没有最近搜索记录 -->
        <div
          class="text-gray-400 text-center"
          v-if="!inputValue && !latestSearchDataList.length"
        >
          最近没有搜索记录
        </div>
        <!-- 没有搜到对应内容 -->
        <div class="empty p-4 pb-10" v-if="!content">
          <a-empty>
            <template #description>
              <div class="text-gray-500 text-xl">
                没有找到<b class="text-xl text-gray-800">
                  "{{ inputValue }}"
                </b>
                相关内容
              </div>
            </template>
          </a-empty>
        </div>
        <!-- 搜索列表或者最新列表 -->
        <div class="search-result p-2 pt-4 pb-4 rounded" ref="containerRef">
          <!-- 显示最近搜索 -->
          <a-affix :target="() => containerRef">
            <div class="bg-gray-100 text-blue-500 pt-0 p-2">近期搜索 (14)</div>
          </a-affix>
          <div v-if="latestSearchDataList.length">
            <div
              @mouseenter="onHover(idx)"
              @click="onEnter"
              :class="[
                'pl-4 pr-4 items-center border cursor-pointer border-gray-200 rounded search-result-item  flex shadow-sm bg-white mb-1 p-2',
                hoverActiveIdx === idx ? 'active' : ''
              ]"
              v-for="(item, idx) in latestSearchDataList"
              :key="item['id']"
            >
              <History
                :class="[
                  'text-xl mr-4',
                  hoverActiveIdx === idx
                    ? 'text-white opacity-80'
                    : 'text-gray-500'
                ]"
              />
              <div class="flex-1">
                <div class="item-title">
                  测试标题12312312应该会有<span class="keyword"> 测试狗 </span
                  >会有长度限制测试标题12312312应该会有长度限制测试标题12312312应该会有长度限制测试标题12312312应该会有长度限制测试标题12312312应该会有长度限制
                </div>
                <small class="sub-title">系统相关问题/测试狗问题</small>
              </div>
              <div
                @click="onDelRecentItem(item.id)"
                :class="[
                  'hover:text-white hover:bg-blue-800 w-6 h-6 text-center rounded-full   text-gray-500',
                  hoverActiveIdx === idx
                    ? 'text-white opacity-80'
                    : 'text-gray-500'
                ]"
              >
                <CloseSmall class="text-xl" />
              </div>
            </div>
          </div>
          <div class="" v-if="searchResultList.length">
            <a-affix :target="() => containerRef">
              <div class="bg-gray-100 text-blue-500 pt-0 p-2">
                SA产品线 (14)
              </div>
            </a-affix>
            <div
              @mouseenter="onHover(idx)"
              @click="onEnter"
              :class="[
                'pl-4 pr-4 items-center border cursor-pointer border-gray-200 rounded search-result-item  flex shadow-sm bg-white mb-1 p-2',
                hoverActiveIdx === idx ? 'active' : ''
              ]"
              v-for="(item, idx) in searchResultList"
              :key="item['id']"
            >
              <Book
                :class="[
                  'text-xl mr-4',
                  hoverActiveIdx === idx
                    ? 'text-white opacity-80'
                    : 'text-gray-500'
                ]"
              />
              <div class="flex-1">
                <div class="item-title">
                  测试标题12312312应该会有长
                  度限制测试标题12312312应该会有长度限制测试标题12312312应该会有长度限制测试标题12312312应该会有长度限制测试标题12312312应该会有长度限制测试标题12312312应该会有长度限制
                </div>
                <small class="sub-title">系统相关问题/测试狗问题</small>
              </div>
              <EnterKey class="text-xl ml-2" v-if="hoverActiveIdx === idx" />
            </div>
          </div>
        </div>
      </div>

      <div class="footer">
        <SearchFooter />
      </div>
    </div>
    <div
      @click="onClose"
      class="bg fixed"
      v-if="appStore.globalSerchVisible"
    ></div>
  </Teleport>
</template>

<script setup lang="ts">
import SearchFooter from './SearchFooter.vue';
import { LoadingOutlined } from '@ant-design/icons-vue';
import { useAppStore } from '@/stores/app';
import {
  Search,
  CloseSmall,
  Book,
  EnterKey,
  History
} from '@icon-park/vue-next';
import { nextTick, ref, watch } from 'vue';
const inputRef = ref();
const containerRef = ref();
const appStore = useAppStore();
const ifFocus = ref(false);
const inputValue = ref('');
const loading = ref(false);
const content = ref('dd');
const hoverActiveIdx = ref(0);
const latestSearchDataList = ref(
  [...new Array(100).keys()].map((item) => ({
    id: `${item}`,
    value: 'ceshigou' + item
  }))
);
// const searchResultList = [...new Array(100).keys()].map((item) => ({
//   id: `${item}`,
//   value: "sdafsafasasfdassadfasd"
// }))
const searchResultList = ref([]);
const onFocus = (e) => {
  e.stopPropagation();
  e.preventDefault();
  ifFocus.value = true;
};

const actionScroll = () => {
  const scrollBox = containerRef.value;
  const element = containerRef.value.querySelectorAll('.search-result-item')[
    hoverActiveIdx.value
  ];

  if (!element || !scrollBox) {
    return;
  }
  var boxTop = scrollBox.scrollTop;
  var boxBottom = boxTop + scrollBox.clientHeight;
  console.log(element.offsetTop);
  var elementTop = element.offsetTop - scrollBox.offsetTop;
  var elementBottom = elementTop + element.clientHeight;

  if (elementTop < boxTop) {
    // 元素在视口上方
    scrollBox.scrollTo({ top: elementTop - 40, behavior: 'smooth' });
  } else if (elementBottom > boxBottom) {
    // 元素在视口下方
    scrollBox.scrollTo({
      top: elementBottom - scrollBox.clientHeight,
      behavior: 'smooth'
    });
  }
};

const toDown = () => {
  const idx = hoverActiveIdx.value;
  const currentList = searchResultList.value.length
    ? searchResultList.value
    : latestSearchDataList.value;
  hoverActiveIdx.value =
    idx >= currentList.length - 1 ? currentList.length - 1 : idx + 1;
  actionScroll();
};

const toUp = () => {
  const idx = hoverActiveIdx.value;

  hoverActiveIdx.value = idx <= 0 ? 0 : idx - 1;
  actionScroll();
};

const onDelRecentItem = (id: string) => {
  console.log('delete', id);
};

const onHover = (idx: number) => {
  hoverActiveIdx.value = idx;
};

const onEnter = () => {
  const currentList = searchResultList.value.length
    ? searchResultList.value
    : latestSearchDataList.value;
  console.log(currentList[hoverActiveIdx.value].value, '这里是nigger');
};

const onBlur = () => {
  ifFocus.value = false;
};

const onClear = () => {
  inputValue.value = '';
};

const onClose = () => {
  appStore.globalSerchVisible = false;
  inputValue.value = '';
  searchResultList.value = [];
};

watch(
  () => searchResultList.value,
  (_) => {
    hoverActiveIdx.value = 0;
  },
  {
    deep: true
  }
);

watch(
  () => appStore.globalSerchVisible,
  (v) => {
    if (v) {
      nextTick(() => {
        inputRef.value?.focus();
      });
    }
  }
);

defineExpose({
  onEnter,
  toDown,
  toUp
});
</script>

<style scoped lang="less">
.bg {
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  margin: auto;
  z-index: 9;
  background: rgba(0, 0, 0, 0.269);
  backdrop-filter: blur(5px) hue-rotate(20deg);
}

.modal {
  overflow: hidden;
  max-height: max(500px, 50vh);
  width: 560px;
  z-index: 10;
  top: 0;
  left: 0;
  right: 0;
  margin: auto;
  display: flex;
  flex-direction: column;
  margin: 60px auto;
}

.content {
  min-height: 100px;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.search {
  position: relative;
  transition: 0.2s;

  &-input {
    font-size: 20px;
    border: none;
  }

  .search-close {
    border-radius: 50%;

    .icon {
      width: 24px;
      height: 24px;
      display: inline-block;
      text-align: center;
    }
  }

  &-result {
    overflow-y: auto;
    user-select: none;
    /* 标准语法 */
  }

  &-progress {
    position: absolute;
    bottom: -9px;
    left: 1px;
    right: 1px;
    margin: auto;
  }
}

.item-title {
  width: 440px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.keyword {
  color: theme('backgroundColor.blue.500');
}

.active {
  // background: theme("backgroundColor.blue.500");
  background: theme('backgroundColor.blue.500'); // #42b883
  color: theme('backgroundColor.white');

  .keyword {
    color: #fff;
  }

  .sub-title {
    color: theme('backgroundColor.white');
    opacity: 0.75;
  }
}

.sub-title {
  color: theme('backgroundColor.gray.500');
  opacity: 1;
}

:deep(.ant-input) {
  padding-top: 0;
  padding-bottom: 0;

  &:focus {
    box-shadow: none;
  }
}
</style>
