
import { defineStore } from "pinia";
import { computed, reactive, ref } from "vue";

// export type

export const useDetailStore = defineStore("detail", () => {
  const menuTableVisible = ref(false);
  // const commentsVisible = ref(false);
  const relatedModalVisible = ref(false)
  // const historyVisible = ref(false)
  const currentDetailId = ref('')
  const drawerObj = reactive({
    historyVisible: false,
    commentsVisible: false
  })


  const detailFooterDrawerVisible = computed(() => {
    return relatedModalVisible.value || drawerObj.commentsVisible || drawerObj.historyVisible
  })

  const toggleDrawer = (k: "commentsVisible" | "historyVisible", v: boolean) => {
    for (let i in drawerObj) {
      if (i !== k) {
        drawerObj[i] = false;
      }
    }
    drawerObj[k] = v
  }

  return {
    currentDetailId,
    drawerObj,
    relatedModalVisible,
    menuTableVisible,
    toggleDrawer,
    detailFooterDrawerVisible
  };
});
