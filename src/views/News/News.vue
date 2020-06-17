<template lang="pug">
main-layout
  gg-slider(
    :slide="getLastNews.news"
    @rout="routNews"
    :height="540"
    :isImg="true"
  )
  .container  
    news-category-item(
      :name="getLastNews.title"
      :news="getLastNews.news"
      :category="getLastNews.category"
    )

    news-category-item(
      :name="getActualNews.title"
      :news="getActualNews.news"
      :category="getActualNews.category"
    )

    news-category-item(
      :name="getTopNews.title"
      :news="getTopNews.news"
      :category="getTopNews.category"
    )
      
      //- кнопка "еще " или типо того, добавить когда новости будут связаны с API
        router-link.more(:to="{ name: 'NewsCategory', params: { category: $data[category].name } }") {{ linkName }}
          i.fas.fa-chevron-down
</template>

<script>
// @ is an alias to /src
import NewsItem from "@/components/pages/NewsItem";
import GgSlider from "@/components/pages/GgSlider";
import NewsCategoryItem from "@/components/pages/NewsCategoryItem";

import { mapGetters } from "vuex";

export default {
  name: "News",
  data() {
    return {
      linkName: "ЕЩЁ НОВОСТИ"
    };
  },

  methods: {
    routNews() {
      this.$router.push("/news");
    }
  },

  components: {
    NewsItem,
    GgSlider,
    NewsCategoryItem
  },

  computed: {
    ...mapGetters("news", ["getLastNews", "getActualNews", "getTopNews"])
  },

  beforeCreate() {
    this.$store.dispatch("news/getInformationNews").then(str => {
      switch (str) {
        case "":
          console.log("ready");
          break;
        default:
          alert(str);
          break;
      }
    });
  }
};
</script>

<style lang="sass" scoped>
.theme
  +afs(36px, 30px, 26px)
  font-weight: 600
  margin: 1rem 0

.news-group
  position: relative
  margin-bottom: 4rem

  .more
    font-size: 20px
    color: red
    border-bottom: 1px solid red
    font-weight: bold
    justify-self: center
    @media screen and ( min-width: $PhoneWidth )
      position: absolute
      bottom: 1em
      right: 1rem
      @media screen and ( max-width: $SmDesktopWidth ) and ( min-width: $PhoneWidth )
        bottom: -2em
        right: 50%
        transform: translateX(50%)
</style>
