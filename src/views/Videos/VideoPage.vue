<template lang="pug">
main-layout
  .container
    gg-video(
      :videoSource="getVideo.video"
      :videoName="getVideo.title"
      :moreVideos="getVideo.videosSameCategory"
    )
    .caption {{getVideo.title}}
    .description {{getVideo.information}}
</template>

<script>
import GgVideo from "@/components/Base/GgVideo";

import { mapGetters, mapActions } from "vuex";

export default {
  name: "video-page",
  data() {
    return {
      category: "",
      videoID: ""
    };
  },
  components: {
    GgVideo
  },
  watch: {
    $route(to) {
      const id = to.params.id;
      this.videoID = id;
    }
  },
  computed: {
    ...mapGetters("videos", ["getVideo"])
  },
  beforeCreate() {
    this.$store.commit("videos/setVideoId", this.$route.params.id);
    this.$store.dispatch("videos/getVideoById").then(str => {
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

<style lang="sass" scoped>
.caption
  +afs(36px, 24px, 18px)
  margin-top: 2rem

.description
  margin-top: 1rem
  +afs(24px, 18px, 14px)
</style>
