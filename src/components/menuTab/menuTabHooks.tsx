import { useRoute, useRouter } from "vue-router";
import { useAppStore } from "@/stores/app";
import {
  DocDetail,
  Home,
  DocumentFolder,
  WritingFluently,
} from "@icon-park/vue-next";
import { HOME_PATH, LIST_PATH, WRITE_PATH } from "@/router/routes/Home";
import { Icon } from "@icon-park/vue-next/lib/runtime";

export const useMenuTabHooks = () => {
  const appStore = useAppStore();
  const router = useRouter();
  const route = useRoute();
  const getBookIconSrc = (path: string) => {
    const pathEmojiMap: {
      [key: string]: () => Icon;
    } = {
      [HOME_PATH]: () => <Home />,
      [LIST_PATH]: () => <DocumentFolder />,
      [WRITE_PATH]: () => <WritingFluently />,
    };
    const fn = pathEmojiMap[path];
    if (fn) {
      return fn();
    }

    return <DocDetail />;
  };
  const resetWriteCache = () => {
    const ifWriteExist = appStore.menuTabRoutes.findIndex(
      (item) => item.path === WRITE_PATH
    );
    if (ifWriteExist) {
      appStore.keepAliveExcludeList.includes("WriteCenter")
        ? appStore.keepAliveExcludeList.push("WriteCenter")
        : null;
    }
  };
  const onClearDropdownChange = (type: "current" | "all" | "other", linkToPath?: string) => {
    const originMenus = appStore.menuTabRoutes;

    const actionsMap = {
      all: () => {
        // 如果包含write 则把他重置
        resetWriteCache();
        // 如果清空所有tab，则跳回list
        appStore.clearMenuTabRoute();
        router.replace({ name: "home" });
      },
      current: () => {
        // 如果当前是write，则删除缓存
        if (appStore.menuTabActiveKey === WRITE_PATH) {
          appStore.keepAliveExcludeList.push("WriteCenter");
        }
        const restTabs = appStore.menuTabRoutes.filter(
          (item) => item.path !== appStore.menuTabActiveKey
        );
        appStore.setMenuTabRoute(restTabs);
        // 如果是删除当前活动tab，则往前跳或者往后跳，如果都没有，调回list
        if (route.path === appStore.menuTabActiveKey) {
          const idx = originMenus.findIndex(
            (item) => item.path === appStore.menuTabActiveKey
          );
          let switchPath;
          if (idx <= 0) {
            switchPath = restTabs[0]?.path;
          } else if (idx >= originMenus.length - 1) {
            switchPath = restTabs[restTabs.length - 1]?.path;
          } else {
            switchPath = restTabs[idx - 1]?.path;
          }

          if (switchPath) {
            router.push(linkToPath || switchPath);
          } else {
            router.replace(linkToPath || { name: "home" });
          }
        }
      },
      other: () => {
        // 如果包含write 则把他重置
        resetWriteCache();
        const currentTab = originMenus.filter(
          (item) => item.path === appStore.menuTabActiveKey
        );
        appStore.setMenuTabRoute(currentTab);
      },
    };
    actionsMap[type] && actionsMap[type]();
  };

  const onCloseMenu = (path: string, linkToPath?: string) => {
    if (path === appStore.menuTabActiveKey) {
      onClearDropdownChange("current", linkToPath);
    } else {
      appStore.clearMenuTabRoute(path);
    }
  };
  return {
    onClearDropdownChange,
    resetWriteCache,
    getBookIconSrc,
    onCloseMenu,
  };
};
