module.exports = {
  presets: [
    [
      '@babel/preset-env',
      {
        // 处理兼容性的按需加载
        useBuiltIns: 'usage',
        loose: true,
        corejs: {
          version: 3,
          proposals: true,
        },
        // 指定兼容性做到哪个版本
        targets: {
          browsers: [
            'last 3 android version',
            'last 3 ios_saf version',
            'last 3 edge version',
            'last 3 chrome version',
            'last 3 firefox version',
            'last 3 safari version',
          ],
        },
      },
    ],
  ],
  plugins: [
    [
      '@babel/plugin-transform-runtime',
      {
        version: '7.12.1',
      },
    ],
  ],
};
