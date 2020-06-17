<template lang="pug">
main-layout
  .container
    // name еще не готов(back)
    news-category-item(
      :name="getNewsCategory.title"
      :news="getNewsCategory.news"
    )
</template>

<script>
import NewsCategoryItem from "@/components/pages/NewsCategoryItem";

import { mapGetters, mapActions } from "vuex";

export default {
  components: {
    NewsCategoryItem
  },
  computed: {
    ...mapGetters("news", ["getNewsCategory"])
  },
  beforeCreate() {
    this.$store.commit("news/setNewsCategory", this.$route.params.category);
    this.$store.dispatch("news/getNewsByCategory").then(str => {
      switch (str) {
        case "":
          break;
        default:
          alert(str);
          break;
      }
    });
  }
};
</script>
