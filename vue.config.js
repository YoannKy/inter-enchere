module.exports = {
  transpileDependencies: [
    'vuetify',
  ],
  runtimeCompiler: true,
  configureWebpack: {
    module: {
      rules: [
        {
          test: /.html$/,
          loader: 'vue-template-loader',
          exclude: /index.html/,
        },
      ],
    },
  },
};
