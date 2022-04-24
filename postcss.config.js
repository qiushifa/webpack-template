module.exports = {
  plugins: {
    tailwindcss: {},
    // 解析@import 规则的路径
    "postcss-import": {},
    // 解析css中url
    "postcss-url": {},
    // 自动添加兼容前缀
    // autoprefixer: {},
    // 将现代 CSS 转换为大多数浏览器可以理解的内容，并根据package.json中的browserslist确定所需的 polyfill
    "postcss-preset-env": {},
  },
};
