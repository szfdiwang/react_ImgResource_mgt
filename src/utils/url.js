export const BaseParam = {
  fetchUrl:
    process.env.NODE_ENV == "development"
      ? "http://baidu.com/"
      : process.env.NODE_ENV == "st"
      ? "http://jianshu.com/"
      : process.env.NODE_ENV == "production"
      ? "http://github.com/"
      : "http://baidu.com/"
};
