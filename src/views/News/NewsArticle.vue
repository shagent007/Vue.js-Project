<template lang="pug">
main-layout
  article.container
    img(:src="getNews.image", alt="alt")

    .article-header
      h1.theme {{getNews.title}}
        //.stars-wrapper
          //star-rating(:stars="ARTICLE.stars" :starsCount="ARTICLE.starsCount")

    .text {{ getNews.fullInformation }}
</template>

<script>
import StarRating from "@/components/pages/StarRating";

import { mapActions, mapGetters } from "vuex";

export default {
  name: "Policy",
  components: {
    StarRating
  },
  computed: {
    ...mapGetters("news", ["getNews"])
  },
  beforeCreate() {
    this.$store.commit("news/setNewsId", this.$route.params.id);
    this.$store.dispatch("news/getNewsById").then(str => {
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

<style lang="sass" scoped>

.article-header

  .theme
    margin: 2rem 0
    +afs(36px, 30px, 24px)
    line-height: 110%
    letter-spacing: 0.1em
    text-transform: uppercase

  .stars-wrapper
    float: right
    padding-top: 1rem

img
  width: 100%
  margin: 1rem 0rem
  margin-bottom: 2rem

.item
  margin-bottom: 1rem

.theme_item
  font-weight: 500
  margin-bottom: 2rem
  +afs(24px, 20px, 16px)

.text
  margin-bottom: 1rem
  font-size: 18px
  +afs(18px, 26px, 14px)
  line-height: 120%
  letter-spacing: 0.05em
</style>
