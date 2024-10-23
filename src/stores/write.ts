import { getDraftList } from "@/api/docs";
import { delayLoadingMiddleware } from "@/utils/alovaTools";
import { ALERT_DOC, NORMAL_DOC } from "@/utils/constants";
import { usePagination } from "@alova/scene-vue";
import { defineStore } from "pinia";
import { reactive, ref } from "vue";

// export type

export const useWriteStore = defineStore("write", () => {
  const draftBoxOpen = ref(false);
  const newDocType = ref(ALERT_DOC);

  const ifPublishSuc = ref(false);
  const dropDownOpen = reactive({
    templateModalOpen: false,
    importDocsDropOpen: false,
    publishDocsDropOpen: false,
  });
  // const templateModalOpen = ref(false)
  // const importDocsDropOpen = ref(false)
  // const publishDocsDropOpen = ref(false)
  const menuTableVisible = ref(false);
  // 请求草稿箱
  const {
    send: reqDraftList,
    data: drafDataList,
    total: draftListTotal,
    loading: draftListLoading,
    page: draftPage,
  } = usePagination((page, pageSize) => getDraftList({ page, pageSize }), {
    initialData: {
      total: 0,
      list: [],
    },
    initialPage: 1,
    initialPageSize: 10,
    immediate: false,
    total: (res) => res["total"],
    data: (res) => res["list"],
    middleware: delayLoadingMiddleware(1000),
  });

  const setDropDownOpen = (
    k?: "templateModalOpen" | "importDocsDropOpen" | "publishDocsDropOpen",
    v?: boolean
  ) => {
    if (k && v !== undefined) {
      dropDownOpen[k] = v;
    }

    for (let i in dropDownOpen) {
      if (i !== k) {
        dropDownOpen[i] = false;
      }
    }
  };

  // const setImportDocsDropOpen = (v: boolean) => {
  //   importDocsDropOpen.value = v
  //   if (v) {
  //     publishDocsDropOpen.value = false
  //   }
  // }

  // const setPublishDocsDropOpen = (v: boolean) => {
  //   publishDocsDropOpen.value = v
  //   if (v) {
  //     importDocsDropOpen.value = false
  //   }
  // }

  return {
    setDropDownOpen,
    menuTableVisible,
    dropDownOpen,
    newDocType,
    ifPublishSuc,
    // setImportDocsDropOpen,
    // setPublishDocsDropOpen,
    // importDocsDropOpen,
    // publishDocsDropOpen,
    draftListTotal,
    draftPage,
    drafDataList,
    reqDraftList,
    draftListLoading,
    draftBoxOpen,

  };
});
