import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import ErrorsRoutes from './routes/error.tsx'
import MainPage from "@/components/MainPage.vue";
import { useAppStore } from "@/stores/app.ts";
import HomeRoutes from './routes/Home.ts'
import { App } from "vue";



const routes: readonly RouteRecordRaw[] = [

  {
    path: "/", redirect: {
      path: "/main"
    }
  },
  {
    path: "/main", component: MainPage,
    redirect: { name: "home" },
    children: HomeRoutes
  },
  ...ErrorsRoutes];




export default function register(app: App<Element>) {
  const appStore = useAppStore()
  const router = createRouter({
    // 4. 内部提供了 history 模式的实现。为了简单起见，我们在这里使用 hash 模式。
    history: createWebHistory(),
    routes, // `routes: routes` 的缩写
  });


  const setProgress = (start: number,) => {
    if (start >= 90) {
    } else {
      const value = start + 1
      appStore.setRouterProgressPercent(
        value
      )
      requestAnimationFrame(() => {
        setProgress(start)
      })
    }
  }


  router.beforeEach(() => {
    let start = 0
    setProgress(start)
  })
  router.afterEach((_) => {
    appStore.setRouterProgressPercent(
      100
    )
  })
  app.use(router)

}