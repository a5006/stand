import { createAlova } from "alova"
import GlobalFetch from "alova/GlobalFetch"
import vueHook from "alova/vue"
import {
    BAD_REQUEST_CODE,
    SYS_ERROR_CODE,
    FORBIDDEN_CODE,
    NOT_FOUND_CODE,
    UNAUTHORIZED_CODE,
    SUC_CODE, TOKEN_STORAGE_KEY,
    BAD_REQUEST_MSG,
    NOT_FOUND_MSG,
    SYS_ERROR_MSG,
    FORBIDDEN_MSG,
    UNAUTHORIZED_MSG,
    SUCCESS_STATUS_CODE
} from "./constants";
import { message } from 'ant-design-vue';
import { useLocalStorage } from "@vueuse/core";
import { createAlovaMockAdapter } from "@alova/mock";
import mockGroup1 from '@/mock/mock'
let ifUnAuthorization = false

const mockAdapter = createAlovaMockAdapter([mockGroup1, /** ... */], {

    // 全局控制是否启用mock接口，默认为true
    enable: true,

    // 非模拟请求适配器，用于未匹配mock接口时发送请求
    httpAdapter: GlobalFetch(),

    // mock接口响应延迟，单位毫秒
    delay: 1000,

    // 是否打印mock接口请求信息
    mockRequestLogger: true,

    // 模拟接口回调，data为返回的模拟数据，你可以用它构造任何你想要的对象返回给alova
    // 以下为默认的回调函数，它适用于使用GlobalFetch请求适配器
    // 如果你使用的是其他请求适配器，在模拟接口回调中请自定义返回适合适配器的数据结构
    onMockResponse(response) {
        // response为相应数据集合，其中包含status、statusText、responseHeaders、body
        // request为请求数据，其中包含query、params、headers、data
        // currentMethod为当前请求的method实例
        // ...
        // 返回转换后的响应数据和响应头

        return {

            response: new Response(JSON.stringify({ code: 1, data: response.body }))/** 响应数据 */,

        } as any
    }
});

// check status
function handleError(rsp: Response,) {
    const status = rsp.status
    const codeObj = {
        [BAD_REQUEST_CODE]: () => {
            message.error(BAD_REQUEST_MSG)
        }, // 400 后续有可能要对这里进行更改
        [NOT_FOUND_CODE]: () => {
            message.error(NOT_FOUND_MSG)
        }, //404
        [SYS_ERROR_CODE]: () => {
            message.error(SYS_ERROR_MSG)
        }, //500
        [FORBIDDEN_CODE]: () => {
            message.error(FORBIDDEN_MSG)
        }, // 403
        [UNAUTHORIZED_CODE]: () => {
            if (!ifUnAuthorization) {
                ifUnAuthorization = true
                message.error(UNAUTHORIZED_MSG)
                setTimeout(() => {
                    window.location.href = `${window.location.origin}/401`
                }, 400);
            }
        }, //401
    } as { [propName: number]: () => void }
    if (codeObj[status]) {
        codeObj[status]();
    } else {
        message.error(SYS_ERROR_MSG);
    }
}



export const useAlovaInit = () => {
    const token = useLocalStorage(TOKEN_STORAGE_KEY, '')
    const alovaInstance = createAlova({
        statesHook: vueHook,
        requestAdapter: import.meta.env.MODE === 'development' ? mockAdapter : GlobalFetch(),
        baseURL: import.meta.env.VITE_BASE_REQ_URL,
        timeout: 10000,// 10 秒
        beforeRequest(method: any) {
            if (ifUnAuthorization) {
                method.abort()
            }
            method.config.headers.Authorization = `Bearer nigger${token.value}`
        },
        responded: {
            onSuccess: async (rsp: Response) => {
                if (rsp.status !== SUCCESS_STATUS_CODE) {
                    handleError(rsp)
                    throw new Error(rsp.statusText)
                }
                ifUnAuthorization = false
                const json = await rsp.json()
                //    http为200但是 code不为 1
                if (json.code !== SUC_CODE) {
                    const errorMsg = json.message || SYS_ERROR_MSG
                    message.error(errorMsg)
                    throw new Error(errorMsg)
                }
                return json.data
            },
            onError(err) {

                message.error(err.message)
                throw new Error(err)
            }
        }
    })
    return { alovaInstance }

}