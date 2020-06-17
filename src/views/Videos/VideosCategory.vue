<template lang="pug">
main-layout
  .container
    .theme {{ getVideoCategory.title }}
    .video-group
      video-pre-loader.item(
        v-for="(video, index) in getVideoCategory.videos"
        :key="video.id"
        :source="video"
      )
</template>

<script>
import VideoPreLoader from "@/components/pages/VideoPreLoader.vue";

import { mapGetters, mapActions } from "vuex";
export default {
  components: {
    VideoPreLoader
  },
  computed: {
    ...mapGetters("videos", ["getVideoCategory"])
  },
  methods: {
    ...mapActions("videos", ["fetchVideos", "setVideo"])
  },
  beforeCreate() {
    this.$store.commit("videos/setVideoCategory", this.$route.params.category);
    this.$store.dispatch("videos/getVideoByCategory").then(str => {
      switch (str) {
        case "":
          break;
        default:
          alert(str);
      }
    });
  }
};
</script>

<style lang="sass">
.theme
  +afs(36px, 34px,28px)
  margin: 2rem 0rem

.video-group
  display: flex
  flex-flow: wrap
  margin-bottom: 2rem
  .item
    flex-basis: 50%
    @media screen and ( max-width: $PhoneWidth )
      flex-basis: 100%
</style>
