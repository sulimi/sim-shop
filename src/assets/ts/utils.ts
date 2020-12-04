export const getLocal = (name: string) => {
  return localStorage.getItem(name);
};

export const setLocal = (name: string, value: string) => {
  localStorage.setItem(name, value);
};


// 图片前缀方法
export const prefix = (url: string) => {
  if (url && url.startsWith('http')) {
    return url
  } else {
    url = `http://47.99.134.126:28019${url}`
    return url
  }
}