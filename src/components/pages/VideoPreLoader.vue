<template lang="pug">
  .video(
    @click="$emit('routVideo')"
  )
    .caption
      .text {{source.title}}

    img.playButton(src="@/assets/VideoUI/play_button.svg", alt="alt" @click="(e) => clickPlay(e, source.id)")
   
    .poster(
      :style="{backgroundImage:`url(${source.image})`}"
    )
</template>

<script>
import { mapMutations } from "vuex";
const videos = "videos";

export default {
  name: "video-pre-loader",
  props: {
    source: {
      type: Object,
      required: true
    }
  },
  watch: {
    $route(to) {
      this.$store.commit("videos/setVideoId", to.params.id);
      this.$store.dispatch("videos/getVideoById").then(str => {
        switch (str) {
          case "":
            break;
          default:
            alert(str);
        }
      });
    }
  },
  methods: {
    clickPlay(e, id) {
      e.preventDefault();
      if (this.$route.params.id.toString() !== id.toString()) {
        this.$router.push({ name: "VideoPage", params: { id: id } });
      }
    }
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
  },
  data() {
    return {
      publicPath: process.env.BASE_URL
    };
  }
};
</script>

<style lang="sass" scoped>
.poster
  width: 100%
  height: 300px
  background-repeat: no-repeat
  background-size: cover
  background-position: center
.caption
  position: absolute
  top: 0
  left: 0
  background: linear-gradient(180deg, rgba(38, 50, 57, 0.0001) 0%, #263239 100%)
  mix-blend-mode: normal
  opacity: 0.8
  transform: rotate(-180deg)
  color: $White
  z-index: 1
  +afs(18px,12px,10px)
  width: 100%
  box-sizing: border-box
  padding: 1rem
.text
  transform: rotate(-180deg)

.playButton
  position: absolute
  top: 50%
  left: 50%
  transform: translate(-50%, -50%)
  cursor: pointer
  z-index: 110
  width: 4rem
@media screen and ( max-width: $TableWidth )
  width: 3rem

.video
  box-sizing: border-box
  position: relative
  width: 100%
  display: flex
  z-index: 100
  cursor: pointer



.layer
  z-index: 120
</style>
