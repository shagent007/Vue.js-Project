<template lang="pug">
main-layout
  gg-slider(
    :slide="getLastNews.news"
    @rout="routNews"
    :height="540"
    :isImg="true"
  )

  video-messages.general(
    :name="getAppeal.title"
    :videos="getAppeal.videos"
    :category="getAppeal.category"
    linkName="Все обращения"
    linkTo="/videos"
  )
  //-
    rating
    .container
      .VideoMore
        .theme {{getRegionVideos.name}}
        router-link.more(to="/news") {{videoSliderTitle.linkName}}
  
  gg-slider(
    :name="getRegionVideos.title"
    :slide="getRegionVideos.videos"
    :height="325"
    :isImg="false"
    @rout="routVideo"
  )
  
  video-messages.CIS(
    :name="getCISVideos.title"
    :videos="getCISVideos.videos"
    :category="getCISVideos.category"
    linkName="Все обращения"
    linkTo="/videos"
  )

  video-messages.frendly(
    :name="getFriendlyCountryVideos.title"
    :videos="getFriendlyCountryVideos.videos"
    :category="getFriendlyCountryVideos.category"
    linkName="Все обращения"
    linkTo="AllVideoMessages"
  )
  gg-map
</template>

<script>
import VideoMessages from "@/components/pages/VideoMessages.vue";
import Rating from "@/components/pages/Rating.vue";
import GgMap from "@/components/pages/GgMap.vue";
import VideoPreLoader from "@/components/pages/VideoPreLoader.vue";
import GgSlider from "@/components/pages/GgSlider";

import { mapGetters, mapActions } from "vuex";
const news = "news";
const videos = "videos";

export default {
  name: "Home",
  data() {
    return {
      videoSliderTitle: {
        title: "",
        linkName: "СМОТРЕТЬ ВСЕ"
      }
    };
  },

  computed: {
    ...mapGetters(news, ["getLastNews"]),
    ...mapGetters(videos, [
      "getAppeal",
      "getFriendlyCountryVideos",
      "getRegionVideos",
      "getCISVideos"
    ])
  },

  methods: {
    ...mapActions("videos", ["fetchVideos"]),

    routNews() {
      this.$router.push("/news");
    },
    routVideo(video) {
      this.$router.push({
        name: "VideoPage",
        params: { id: video.id, category: video.category }
      });
    }
  },

  components: {
    VideoMessages,
    VideoPreLoader,
    GgMap,
    Rating,
    GgSlider
  },
  beforeCreate() {
    this.$store.dispatch("news/getInformationNews").then(str => {
      switch (str) {
        case "":
          break;
        default:
          alert(str);
          break;
      }
    });
    this.$store.dispatch("videos/getInformationVideos").then(str => {
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
.general

  ::v-deep .VideoMessages
    .message
      video
        width: 100%

      &:nth-child(1),
      &:nth-child(2)
        flex-basis: 50%

    @media screen and ( max-width: $PhoneWidth )
      .message

        &:nth-child(1)
          flex-basis: 100%
        &:nth-child(2),
        &:nth-child(3)
          flex-basis: 50%
        &:nth-child(4),
        &:nth-child(5),
        &:nth-child(6)
          display: none

.CIS
  ::v-deep .VideoMessages
    @media screen and ( max-width: $TableWidth )
      .message
        flex-basis: 33.333333%
        &:nth-child(7),
        &:nth-child(8)
          display: none
    @media screen and ( max-width: $PhoneWidth )
      .message
        flex-basis: 50%
        &:nth-child(5),
        &:nth-child(6),
        &:nth-child(7),
        &:nth-child(8)
          display: none

.frendly
  ::v-deep .VideoMessages
    .message
      flex-basis: 50%
    @media screen and ( max-width: $PhoneWidth )
      .message
        flex-basis: 100%
        &:nth-child(3),
        &:nth-child(4)
          display: none
</style>
