module.exports = {
  pages: {
    index: {
      entry: "src/main.js",
      // исходный шаблон
      template: "public/index.html",
      // в результате будет dist/index.html
      filename: "index.html",
      // когда используется опция title, то <title> в шаблоне
      // должен быть <title><%= htmlWebpackPlugin.options.title %></title>
      title: "Глобальная игра",
      // все фрагменты, добавляемые на этой странице, по умолчанию
      // это извлечённые общий фрагмент и вендорный фрагмент.
      chunks: ["chunk-vendors", "chunk-common", "index"]
    }
  },
  css: {
    loaderOptions: {
      sass: {
        prependData: `@import "@/assets/sass/setting.sass"`
      }
    }
  }
};
