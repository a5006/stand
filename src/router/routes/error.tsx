import { RouteRecordRaw } from "vue-router";
import ErrorPage from "@/components/ErrorPage.vue";
export default [
    { path: '/400', name: "badReq", component: <ErrorPage type={400} /> },
    { path: '/401', name: "unAuth", component: <ErrorPage type={401} /> },
    { path: '/403', name: "forbidden", component: <ErrorPage type={403} /> },
    { path: '/404', name: "404NotFound", component: <ErrorPage type={404} /> },
    { path: '/429', name: "tooManyReq", component: <ErrorPage type={429} /> },
    { path: '/500', name: "systemErr", component: <ErrorPage type={500} /> },
    { path: '/:match(.*)', name: 'notFound', component: <ErrorPage type={404} /> }
] as RouteRecordRaw[]