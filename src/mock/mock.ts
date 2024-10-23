import { defineMock } from '@alova/mock';
import Mock from 'mockjs';
export default defineMock(
  {
    // 捕获get请求
    '/api/v1/draft_list': Mock.mock({
      'list|1-10': [
        {
          'id|1-1000': 100,
          creator: Mock.Random.cname(),
          title: Mock.Random.title(),
          content: Mock.Random.cparagraph(),
          created_at: Mock.Random.datetime(),
          updated_at: Mock.Random.datetime()
        }
      ],
      total: 10
    }),
    // 评论
    '/api/v1/comment': Mock.mock({
      'list|1-10': [
        {
          'id|1-1000': 100,
          content: Mock.Random.ctitle(),
          creator: Mock.Random.cname(),
          created_at: Mock.Random.datetime(),
          reply_id: 1,
          reply_to: Mock.Random.cname(),
          parent_id: 1,
          children: [
            {
              content: '无聊哦',
              creator: '尼哥狗',
              reply_to: 'nigger狗',
              created_at: '2022-12-11 15:12:11',
              reply_id: 3,
              parent_id: 1,
              id: 24
            },
            {
              content: '无聊哦',
              creator: '尼哥狗',
              created_at: '2022-12-11 15:12:11',
              reply_id: 1,
              reply_to: '尼哥侠',
              parent_id: 1,
              id: 22
            },
            {
              content: '无聊哦',
              creator: '尼哥狗',
              reply_to: 'nigger狗',
              created_at: '2022-12-11 15:12:11',
              reply_id: 2,
              parent_id: 1,
              id: 43
            },
            {
              content: '无聊哦',
              creator: '尼哥狗',
              reply_to: 'nigger狗',
              created_at: '2022-12-11 15:12:11',
              reply_id: 3,
              parent_id: 1,
              id: 44
            }
          ]
        }
      ],
      total: 10
    }),

    // 捕获get请求
    '/api/v1/history': Mock.mock({
      'list|1-10': [
        {
          'id|1-1000': 100,
          creator: Mock.Random.cname(),
          diff_title: `<b class='add'>${Mock.Random.ctitle()}</b><b class='del'>${Mock.Random.ctitle()}</b>${Mock.Random.ctitle()}`,
          title: Mock.Random.ctitle(),
          detail: `${Mock.Random.cparagraph()}`,
          count: {
            add: Mock.Random.integer(1, 100),
            del: Mock.Random.integer(1, 100)
          },
          version: `v${Mock.Random.float(1, 10, 2)}`,
          diff_detail: `<b class='add'>${Mock.Random.cparagraph()}</b><b class='del'>${Mock.Random.cparagraph()}</b>${Mock.Random.cparagraph()}`,
          created_at: Mock.Random.datetime(),
          updated_at: Mock.Random.datetime()
        }
      ],
      total: 10
    }),
    // rest风格请求
    '/draft_list/{id}': ({ params }) => {
      const id = params.id;
      // ...
      return {
        title: '...',
        time: '10:00'
      };
    },

    // 捕获post请求
    '[POST]/draft_list': ({ query, data }) => {
      // ...
      return { success: true };
    },
    '[POST]/api/v1/doc': ({ query, data }) => {
      // ...
      return { success: true, code: 1 };
    },

    // 返回更详细的信息
    '[POST]/draft_list': ({ query, data }) => {
      // ...
      return {
        status: 403,
        statusText: 'unknown error',
        responseHeaders: {
          // ...
        },
        body: {
          success: true
        }
      };
    },

    // 模拟网络错误
    '[POST]/draft_list': ({ query, data }) => {
      throw new Error('network error');
    },

    // key前面添加`-`，表示禁用此mock接口
    '-[DELETE]/draft_list/{id}': ({ params }) => {
      // ...
      return { success: true };
    }
  },
  true
); // 第二个参数表示是否启用本组mock接口，默认为true，可以指定为false关闭
