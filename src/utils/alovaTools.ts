export const delayLoadingMiddleware =
  (delayTimer = 1000) =>
    async (ctx: any, next: any) => {
      // 自行控制loading
      ctx.controlLoading();

      // 延迟特定时间更新
      const timer = setTimeout(() => {
        ctx.update({ loading: true });
      }, delayTimer);
      await next();
      ctx.update({ loading: false });
      clearTimeout(timer);
    };





const dbVersion = 1;
let dbInstance: IDBDatabase
const request = window.indexedDB.open('MyTestDatabase', dbVersion);
request.onupgradeneeded = ({ target }: Event) => {
  dbInstance = (target as IDBOpenDBRequest).result;
  const imgStore = dbInstance.createObjectStore('images', {
    autoIncrement: true
  });
  imgStore.createIndex('fileName', 'fileName', {
    unique: true
  });
};
request.onerror = () => {
  throw new Error('Database open fail');
};
request.onsuccess = ({ target }) => {
  dbInstance = (target as IDBOpenDBRequest).result;
};

// 新增数据到IndexedDB
export const addData2Cache = async (fileName: string, data: any) => {
  const tx = dbInstance.transaction(['images'], 'readwrite');
  const request = tx.objectStore('images').add({
    fileName,
    data
  });
  return new Promise((resolve, reject) => {
    request.onerror = () => {
      reject('data add fail');
    };
    request.onsuccess = ({ result }: any) => {
      resolve(result);
    };
  });
}

// 根据fileName获取文件数据
export const getDataFromCache = async (fileName: string) => {
  const tx = dbInstance.transaction(['images']);
  const request = tx.objectStore('images').index('fileName').get(fileName);
  return new Promise((resolve, reject) => {
    request.onerror = () => {
      reject('data add fail');
    };
    request.onsuccess = ({ target }) => {
      resolve((target as IDBOpenDBRequest).result);
    };
  });
}