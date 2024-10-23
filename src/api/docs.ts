import { useAlovaInit } from '@/utils/alova';

export type PaginationParamsType = {
  page: number;
  pageSize: number;
  search?: string;
};

export type ListRspType<T> = {
  total: number;
  list: T[];
};

const { alovaInstance } = useAlovaInit();

//  草稿箱
export const getDraftList = (params: PaginationParamsType) =>
  alovaInstance.Get<ListRspType<{ name: string }>>('/draft_list', { params });
export const addDraf = (data: PaginationParamsType) =>
  alovaInstance.Post('/draft_list', data);
export const editDraft = (data: PaginationParamsType) =>
  alovaInstance.Put('/draft_list', data);
export const delDraft = (id: string) => alovaInstance.Delete('/draft_list', id);

// 发布
export const getDocList = (data: any) =>
  alovaInstance.Get<ListRspType<{ name: string }>>('/doc', data);
export const publish = (data: any) =>
  alovaInstance.Post<{ code: number }>('/doc', data, { name: 'addDoc' });
export const editDoc = (data: PaginationParamsType) =>
  alovaInstance.Put('/doc', data, { name: 'editDoc' });
export const delDoc = (id: string) =>
  alovaInstance.Delete('/doc', id, { name: 'delDoc' });

// hisitory 修改记录 （缓存）
export const getHistoryList = (params: { id: string }) =>
  alovaInstance.Get<ListRspType<{ name: string }>>('/history', {
    params
    //  localCache: {
    //     mode: "memory",
    //     expire: Infinity,
    // },
    // name: "getHistoryList",
    // hitSource: ['addDoc', 'editDoc', 'delDoc']
  });

// 评论列表
export const getCommentsList = (params: { id: string }) =>
  alovaInstance.Get<ListRspType<{ name: string }>>('/comment', { params });
export const addComment = (data: any) =>
  alovaInstance.Post<{ code: number }>('/comment', data, {
    name: 'addComment'
  });
export const editComment = (data: PaginationParamsType) =>
  alovaInstance.Put('/comment', data, { name: 'editComment' });
export const delComment = (id: string) =>
  alovaInstance.Delete('/comment', id, { name: 'delComment' });

//
