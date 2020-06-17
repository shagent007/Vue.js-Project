<template lang="pug">
div
  .theme {{ name }} 
  .news-group
    news-item(
      v-for="item in news"
      :key="item.id"
      :info="item"
      @click="article => $emit('click', article)"
    )

  gg-button(
    color="red"
    transparent
    reverse

    @click="buttonClick"
  ) {{ NEWS_ITEM_CATEGORY.allNewsCategory }}

    //- если надо что то добавить дополнительно
    slot
</template>

<script>
import NewsItem from "./NewsItem";
import GgButton from "@/components/Base/GgButton";

import { mapActions, mapGetters } from "vuex";
const news = "news";

//this.getNewsByCategory(this.category);

export default {
  props: {
    name: {
      type: String,
      required: true
    },

    news: {
      type: Array,
      required: true
    },
    category: String
  },
  methods: {
    ...mapActions(news, ["getNewsByCategory"]),
    buttonClick() {
      this.$router.push({
        name: "NewsCategory",
        params: { category: this.category }
      });
    }
  },
  components: {
    NewsItem,
    GgButton
  },
  computed: {
    ...mapGetters("staticData", ["NEWS_ITEM_CATEGORY"])
  }
};
</script>

<style lang="sass">
.news-group

.theme
  margin: 1.5rem 0
  +afs(36px, 30px, 24px)
  font-weight: 400
</style>
