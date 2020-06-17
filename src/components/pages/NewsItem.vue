<template lang="pug">
.box(ref="box")
  .img(v-if="info.image")
    .poster(
      :style="{backgroundImage:`url(${info.image})`}"
    )
  .content
    .theme {{ info.title }}
    .text {{ info.shortInformation }}
    //star-rating(
    //  v-if="info.rating"
    //  :stars="info.stars"
    //  :starsCount="info.starsCount"
    //)
    gg-button(color="red" @click="transition") {{NEWS_ITEM}}
</template>

<script>
import StarRating from "./StarRating";
import GgButton from "../Base/GgButton.vue";

import { mapGetters, mapMutations } from "vuex";
const news = "news";

export default {
  name: "news-item",
  props: {
    info: Object
  },
  // info: {
  //     image: String
  //     title: String
  //     shortInformation: String
  //     fullInformation: Number,
  //     createdDate: Number
  //     rating: Array
  // }
  data() {
    return {
      publicPath: process.env.BASE_URL
    };
  },
  computed: {
    ...mapGetters("staticData", ["NEWS_ITEM"])
  },
  components: {
    StarRating,
    GgButton
  },
  methods: {
    transition() {
      this.$emit("click", this.info);
      this.setNewsId(this.info.id);
      this.$router.push("/NewsArticle");
    },
    ...mapMutations(news, ["setNewsId"])
  },
  mounted() {
    if (!this.info.image) {
      this.$refs.box.style.gridTemplateColumns = "1fr";
    }
  }
};
</script>

<style lang="sass" scoped>
.box
  display: flex
  margin-bottom: 2rem
  @media screen and (max-width: $PhoneWidth)
    flex-direction: column
.img
  flex: 1
  @media screen and (min-width: $PhoneWidth)
    margin-right: 1rem

.poster
  width: 100%
  height: 300px
  background-repeat: no-repeat
  background-size: cover
  background-position: center

.content
  flex: 1
  display: flex
  flex-direction: column
  justify-content: space-between

.theme
  @media screen and (min-width: $PhoneWidth)
    margin: 0

.text
  height: 110px
  overflow: hidden
  @media screen and (max-width: $PhoneWidth)
    margin-bottom: 1rem
</style>
