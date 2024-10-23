import { MENU_TAB_ROUTER_STORE_KEY } from "@/utils/constants";
import { useLocalStorage } from "@vueuse/core";
import { defineStore } from "pinia";
import { Ref, ref } from "vue";

export type MenuTabTypeType = "article" | "menu"
export type MenuTabRoutesType = {
  label: string
  path: string
  type: MenuTabTypeType,
}

export const useAppStore = defineStore('app', () => {
  const changeLogVisible = ref(false) // 日志
  const viewHeight = ref(400) // content内容高度
  const routerProgressPercent = ref(0) // 顶部路由跳转进度条
  const menuTabRoutes: Ref<MenuTabRoutesType[]> = useLocalStorage<MenuTabRoutesType[]>(MENU_TAB_ROUTER_STORE_KEY, []) // 菜单tab切换路由
  const menuTabActiveKey: Ref<string> = ref("")
  const globalSerchVisible = ref(false)
  const keepAliveExcludeList: Ref<string[]> = ref([])
  const setRouterProgressPercent = (v: number) => {
    routerProgressPercent.value = v
  }
  const setChangeLogVisible = (v: boolean) => {
    changeLogVisible.value = v;
  }

  const setMenuTabRoute = (v: MenuTabRoutesType | MenuTabRoutesType[]) => {
    if (Array.isArray(v)) {
      menuTabRoutes.value = v
      return
    }
    const routes = menuTabRoutes.value
    if (routes.find(item => item.path === v.path)) {
      return
    }
    menuTabRoutes.value.push(v)
  }

  const clearMenuTabRoute = (key?: string) => {
    if (!key) {
      menuTabRoutes.value = []
    }
    menuTabRoutes.value = menuTabRoutes.value.filter(item => {
      return item.path !== key
    })
  }

  const setViewHeight = (v: number) => viewHeight.value = v

  const setMenuActiveKey = (v: string) => menuTabActiveKey.value = v

  const setGlobalSerchVisible = (v: boolean) => globalSerchVisible.value = v

  return {
    keepAliveExcludeList,
    globalSerchVisible,
    setGlobalSerchVisible,
    setMenuActiveKey,
    menuTabActiveKey,
    changeLogVisible,
    routerProgressPercent,
    menuTabRoutes,
    setRouterProgressPercent,
    setChangeLogVisible,
    setMenuTabRoute,
    clearMenuTabRoute,
    viewHeight,
    setViewHeight
  }
});



