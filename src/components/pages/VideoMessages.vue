<template lang="pug">
.container
    .VideoMore
      .theme {{name}}
      router-link.more(:to="{ name: 'VideosCategory', params: {category: category}}") {{linkName}}
    .VideoMessages
      .message( 
        v-for="(item,index) in videos"
        :key="index"
      )
        video-pre-loader(
          :source="item"
          @routVideo="routVideo(item)"
        )
</template>

<script>
import VideoPreLoader from "./VideoPreLoader";
export default {
  name: "video-messages",
  props: {
    name: String,
    category: String,
    linkName: String,
    linkTo: String,
    videos: Array
  },
  components: { VideoPreLoader },
  methods: {
    routVideo(video) {
      this.$router.push({
        name: "VideoPage",
        params: { id: video.id }
      });
    }
  }
};
</script>

<style lang="sass" scoped>
.container
  margin-top: 3rem
  margin-bottom: 3rem

h1
  font-size: 36px
  font-weight: normal
  letter-spacing: 0.1em

.VideoMessages
  display: flex
  flex-flow: wrap
  text-transform: uppercase
  .message
    flex-basis: 25%
  .playButton
    position: absolute
    top: 50%
    left: 50%
    transform: translate(-50%, -50%)
    background-color: $Red
    padding: 1rem
    color: $White
    cursor: pointer
    font-size: 2rem
    display: none
    &.active
      display: block
</style>
