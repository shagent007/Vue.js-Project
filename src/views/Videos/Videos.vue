<template lang="pug">
main-layout
  .container
    .category(
      v-for="(list, index) in getAll"
      :key="index"
    )
      .title {{ list.title }}

      .video-container(:class="'treatment' + list.category")
        video-pre-loader.item(
          v-for="(video, vIndex) in list.videos"
          :key="vIndex"
          :source="video"
          @routVideo="transitonVideo(video, list.category)"
        )

      .footer
        button.link(@click="() => clickMore(list.category)") Больше обращений
        span.chevron >
      
</template>

<script>
import VideoPreLoader from "@/components/pages/VideoPreLoader.vue";
import { mapActions, mapGetters } from "vuex";
const videos = "videos";
export default {
  components: {
    VideoPreLoader
  },
  computed: {
    ...mapGetters(videos, ["getAll"])
  },
  methods: {
    clickMore(category) {
      this.$router.push({
        name: "VideosCategory",
        params: { category: category }
      });
    }
  },
  beforeCreate() {
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
.category
  margin: 15px 0

.title
  letter-spacing: 0.1em
  text-transform: uppercase
  +afs(36px, 30px, 20px)
  font-weight: 500
  margin-bottom: 15px

.video-container
  display: flex
  flex-flow: wrap

  // /deep/ .video .caption .text
  // font-size: 1rem
  .item
    flex-basis: 25%

  &.treatment
    &appeal
      .item
        &:nth-child(1),
        &:nth-child(2)
          flex-basis: 50%
        @media screen and (max-width: $PhoneWidth)
          &:nth-child(1)
            flex-basis: 100%
          &:nth-child(2),
          &:nth-child(3),
          &:nth-child(4),
          &:nth-child(5)
            flex-basis: 50%
          &:nth-child(6),
          &:nth-child(7),
          &:nth-child(8),
          &:nth-child(9),
          &:nth-child(10)
            display: none


    &regionVideos
      .item
        flex-basis: 50%
        @media screen and (max-width: $PhoneWidth)
          flex-basis: 100%
          &:nth-child(4),
          &:nth-child(5),
          &:nth-child(6)
            display: none


    &cisVideos
      .item
        flex-basis: 25%
      @media screen and (max-width: $TableWidth)
        .item
          flex-basis: 33.33333%
          &:nth-child(7),
          &:nth-child(8)
            display: none
        @media screen and (max-width: $PhoneWidth)
          .item
            flex-basis: 50%



    &friendlyCountryVideos
      .item
        flex-basis: 33.3333%
        @media screen and (max-width: $TableWidth)
          flex-basis: 50%
          &:last-child
            display: none
        @media screen and (max-width: $PhoneWidth)
          flex-basis: 100%




.footer
  display: flex
  align-items: center
  justify-content: center
  margin: 1rem 0rem
  .link, .chevron
    color: $Red
    border: none
    outline: none
    +afs(26px, 24px, 20px)
    background-color: transparent
  .chevron
    transform: rotate(90deg)
    padding-bottom: 15px
    font-weight: bold
    font-family: monospace
    +afs(25px, 25px, 17px)
</style>
