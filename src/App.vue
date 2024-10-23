<template>
  <a-config-provider :locale="zhCN" :theme="{
    token: {
      colorPrimary: '#3e5fd6', fontFamily: `-apple-system, BlinkMacSystemFont,'Segoe UI', Roboto, 'Helvetica Neue' ,
    Arial, 'Noto Sans' , sans-serif, 'Apple Color Emoji' , 'Segoe UI Emoji' , 'Segoe UI Symbol' , 'Noto Color Emoji' `,
    },
  }">
    <a-style-provider hash-priority="high">
      <Layout>
        <router-view />
      </Layout>
    </a-style-provider>
  </a-config-provider>
</template>

<script setup lang="ts">
import zhCN from 'ant-design-vue/es/locale/zh_CN';
import dayjs from 'dayjs';
import 'dayjs/locale/zh-cn';
dayjs.locale('zh-cn');
</script>
