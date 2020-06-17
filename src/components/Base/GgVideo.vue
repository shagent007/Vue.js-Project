<template lang="pug">
.wrapper-video
  .video(:class="{'fullScreen':fullScreen}")
    .inner
      .caption(
        :class="{show}" 
        @mouseover="show = true",
        @mouseleave="show=false;more=false"
      )
        .text {{ videoName }}

      //- three dots menu
      .more(
        v-if="moreVideos"
        @click="more=true"
      )
        i.fas.fa-circle
        i.fas.fa-circle
        i.fas.fa-circle

      //- play button on the center screen
      img.playButton(
        src="@/assets/VideoUI/play_button.svg"
        @click="play();more=false"
        v-show="!playPause"
        alt="play button icon"
      )

      video(
        ref="video"
        :src="videoSource",
        @click="show=!show, more=false",
        @timeupdate="progress()"
      )

      .controls(:class="{'show': show}" @mouseover="show=true", @mouseleave="show=false; more=false")
        .track
          input.range(ref="input" type="range" min="1" max="100" value="1" @input="change()")
          .buffer(ref="buffer")
        .buttons
          .start

            //- previous video and backward
            img(src="@/assets/VideoUI/previouz_track.svg", alt="alt" @click="prevVideo")
            img(src="@/assets/VideoUI/backward.svg", alt="alt" @click="backward")

            //- bottom play-pause icon
            .PlayPause
              template(v-if="playPause")
                img(
                  src="@/assets/VideoUI/pause.svg"
                  :class="{'none':playPause}"
                  @click="play()"
                  alt="play/pause icon"
                )
              template(v-else)
                img(
                  src="@/assets/VideoUI/play.svg"
                  :class="{'none':playPause}"
                  @click="play()"
                  alt="play/pause icon"
                )

            //- forward and next video
            img(src="@/assets/VideoUI/forward.svg", alt="alt" @click="forward")
            img(src="@/assets/VideoUI/next_track.svg", alt="alt" @click="nextVideo")

            .volume
              .img
                img(ref="vol1" src="@/assets/VideoUI/volume_1.svg", alt="alt")
                img(ref="vol2" src="@/assets/VideoUI/volume_2.svg", alt="alt")
                img(ref="vol3" src="@/assets/VideoUI/volume_3.svg", alt="alt")
              .val
                input(ref="volume" type="range" min="1" max="100" value="1" @input="volume()")
                
            .time {{curMin}}:{{curSec}} / {{durMin}}:{{durSec}}
          .end
            .Screen
              template(v-if="fullScreen")
                img(
                  @click="fullScreen=!fullScreen, screenLock()" 
                  src="@/assets/VideoUI/minimize.svg"
                  alt="fullscreen icon" 
                )
              template(v-else)
                img(
                  @click="fullScreen=!fullScreen, screenLock()" 
                  src="@/assets/VideoUI/maximize.svg"
                  alt="fullscreen icon" 
                )
    .anotherVideo(:class="{'show':more}" v-if="moreVideos")
      .videoItem(
        v-for="video in moreVideos" 
        :key="video.id"
      ) 
        video-pre-loader(:source="video")
</template>

<script>
function addZero(num) {
  if (num < 10) num = "0" + num;
  return num;
}

function formatTime(type, time) {
  let formatted;

  switch (type) {
    case "min":
      formatted = addZero(Math.trunc(time / 60));
      break;
    case "sec":
      formatted = addZero(Math.trunc(time % 60));
      break;
  }

  return formatted;
}

import { mapMutations, mapGetters, mapState } from "vuex";
const videos = "videos";

export default {
  name: "gg-video",
  props: {
    videoSource: String,
    videoName: String,
    moreVideos: Array
  },
  data() {
    return {
      started: false,
      playPause: false,
      fullScreen: false,
      publicPath: process.env.BASE_URL,
      curMin: "00",
      curSec: "00",
      durMin: "00",
      durSec: "00",
      show: true,
      more: false
    };
  },
  watch: {
    $route(to) {
      this.$store.commit("videos/setVideoId", to.params.id);
      this.$store.dispatch("videos/getVideoById");
    }
  },
  methods: {
    ...mapMutations(videos, ["setVideoId", "next", "prev"]),

    nextVideo() {
      this.next();
      if (this.getChange) {
        console.log("next");
        this.$router.push({ name: "VideoPage", params: { id: this.videoId } });
      }
    },
    prevVideo() {
      this.prev();
      if (this.getChange) {
        console.log("prev");
        this.$router.push({ name: "VideoPage", params: { id: this.videoId } });
      }
    },
    changeVideo(e, id) {
      console.log("kli");
      this.setVideoId(id);
      this.$store.dispatch("videos/getVideoById");
    },
    play() {
      const video = this.$refs.video;
      this.started = true;

      if (video.paused) {
        video.play();
        this.playPause = true;
        video.style.objectFit = "contain";
      } else {
        video.pause();
        this.playPause = false;
        video.style.objectFit = "cover";
      }

      this.$refs.volume.value = this.$refs.video.volume * 100;

      this.$refs.volume.style.background =
        "linear-gradient(90deg, rgb(255, 18, 0) " +
        this.$refs.volume.value +
        "%, rgb(116, 116, 116) " +
        this.$refs.volume.value +
        "%)";
    },
    progress() {
      const video = this.$refs.video;
      const current = this.$refs.input;

      let durationCoefficient = video.currentTime / video.duration;
      current.value = durationCoefficient * 100;

      current.style.background =
        "linear-gradient(90deg, rgb(255, 18, 0) " +
        current.value +
        "%, rgba(236, 239, 241, 0.2) " +
        current.value +
        "%)";

      // buffer
      const lastbuf = video.buffered.length - 1;
      const width = video.buffered.end(lastbuf);

      this.$refs.buffer.style.width = 100 / (video.duration / width) + "%";
      // ======

      if (current.value == 100) {
        video.pause();
        this.playPause = false;
        current.value = 1;
        video.currentTime = 0;
      }

      this.curMin = formatTime("min", video.currentTime);
      this.curSec = formatTime("sec", video.currentTime);
      this.durMin = formatTime("min", video.duration);
      this.durSec = formatTime("sec", video.duration);
    },

    change() {
      const video = this.$refs.video;
      const current = this.$refs.input;
      video.currentTime = (current.value * video.duration) / 100;
    },

    screenLock() {
      document.querySelector("body").classList.toggle("lock");
    },

    volume() {
      const volume = this.$refs.volume;

      this.$refs.vol1.style.display = "none";
      this.$refs.vol2.style.display = "none";
      this.$refs.vol3.style.display = "none";

      if (volume.value < 33) this.$refs.vol1.style.display = "block";
      else if (volume.value > 33 && volume.value < 66)
        this.$refs.vol2.style.display = "block";
      else this.$refs.vol3.style.display = "block";

      volume.style.background =
        "linear-gradient(90deg, rgb(255, 18, 0) " +
        volume.value +
        "%, rgb(116, 116, 116) " +
        volume.value +
        "%)";
      this.$refs.video.volume = volume.value / 100;
    },

    backward() {
      this.$refs.video.currentTime -= 5;
    },

    forward() {
      this.$refs.video.currentTime += 5;
    }
  },

  components: {
    "video-pre-loader": () => import("@/components/pages/VideoPreLoader")
  },

  mounted() {
    console.log(this.moreVideos);
    console.log("I'm alive!");
  },

  computed: {
    ...mapState(videos, ["videoId"]),
    ...mapGetters(videos, ["getChange"]),
    fullScreenIcon() {
      return this.fullScreen
        ? "@/assets/VideoUI/maximize.svg"
        : "@/assets/VideoUI/minimize.svg";
    },
    playPauseIcon() {
      return this.playPause
        ? "@/assets/VideoUI/play.svg"
        : "@/assets/VideoUI/pause.svg";
    }
  }
};
</script>

<style lang="sass" scoped>
.video
  box-sizing: border-box
  position: relative
  width: 100%
  z-index: 100
  overflow: hidden

  .inner
    display: flex
    flex-direction: column

    .caption
      margin: 0
      position: absolute
      top: 0
      left: 0
      transition: 1s
      background: linear-gradient(180deg, rgba(38, 50, 57, 0.0001) 0%, #263239 100%)
      mix-blend-mode: normal
      opacity: 0.8
      transform: rotate(-180deg) translateY(90%)
      color: $White
      +afs(36px, 26px, 20px)
      width: 100%
      z-index: 150
      box-sizing: border-box
      padding: 1rem

      &.show
        transform: rotate(-180deg) translateY(0%)

      .text
        transform: rotate(-180deg)

    .more
      font-size: 5px
      color: $White
      position: absolute
      top: 2rem
      right: 1rem
      padding: 0rem 1rem
      cursor: pointer
      z-index: 200
      display: grid
      align-items: center
      justify-items: center
      grid-gap: 3px

    .playButton
      position: absolute
      top: 50%
      left: 50%
      transform: translate(-50%, -50%)
      cursor: pointer
      z-index: 110
      width: 4rem
      @media screen and (max-width: $TableWidth)
        width: 3rem

    video
      width: 100%

    .controls
      background: linear-gradient(180deg, rgba(38, 50, 57, 0.0001) 0%, #263239 100%)
      position: absolute
      left: 0
      bottom: 0
      width: 100%
      transform: translateY(80%)
      transition: 1s

      &.show
        transform: translateY(0%)

      .track
        width: 100%
        margin: 0
        position: relative
        top: 0

        input
          width: 100%
          margin: 0
          -webkit-appearance: none
          outline: none
          cursor: pointer
          height: 3px
          transition: .5s
          position: absolute
          z-index: 100
          top: 50%
          transform: translateY(-50%)

        input::-webkit-slider-thumb
          -webkit-appearance: none
          appearance: none
          width: 4px
          height: 4px
          border-radius: 12px
          background-color: $Red

        .buffer
          position: absolute
          top: 50%
          transform: translateY(-50%)
          width: 0%
          z-index: 100
          background-color: $Red
          opacity: 0.3
          height: 3px

        input::-webkit-slider-thumb
          -webkit-appearance: none
          appearance: none
          width: 1px
          height: 2px

      .val
        display: flex

        input
          width: 100%
          background: $Grey
          margin: 0
          -webkit-appearance: none
          opacity: .5
          outline: none
          cursor: pointer
          height: 8px
          border-radius: 8px
          transition: .5s

          &:hover
            opacity: 1

        input::-webkit-slider-thumb
          -webkit-appearance: none
          appearance: none
          width: 12px
          height: 12px
          border-radius: 12px
          background-color: $Red


      .buttons
        display: grid
        grid-template-columns: auto auto
        padding: 1rem

        img
          width: 1rem


        .start
          display: grid
          grid-template-columns: repeat(7, auto)
          align-items: center
          justify-self: start
          grid-gap: 1rem

        .volume
          display: grid
          grid-template-columns: auto auto
          grid-gap: 1rem
          align-items: center
          @media screen and (max-width: $PhoneWidth)
            display: none

          img
            &:nth-child(1),
            &:nth-child(2)
              display: none

        .time
          color: #ECEFF1

        .end
          display: grid
          align-items: center
          justify-items: end
          justify-self: end

        @media screen and (max-width: $PhoneWidth)
          img
            width: 0.7rem

  &.fullScreen
    background-color: #333
    width: 100%
    height: 100vh
    position: fixed
    top: 0
    left: 0
    display: grid
    align-items: center
    justify-items: center

    .inner
      height: 100vh
      display: flex
      width: fit-content
      position: relative

    img
      cursor: pointer

.anotherVideo
  position: absolute
  top: 10%
  right: 0
  transform: translateX(100%)
  display: grid
  grid-gap: 1rem
  background-color: rgba(0, 0, 0, 0.5)
  width: 20rem
  box-sizing: border-box
  z-index: 100
  height: 100%
  overflow-y: auto
  transition: .5s
  z-index: 250
  padding: 1rem
  height: 80%

  &.show
    transform: translateX(0%)

  @media screen and (max-width: $TableWidth)
    width: 15rem

  .videoItem
    position: relative
    display: grid
    height: fit-content

    img
      width: 100%

    .name
      position: absolute
      width: 100%
      height: 100%
      background: linear-gradient(180deg, rgba(0, 57, 166, 4e-05) 0%, rgba(0, 57, 166, 0.4) 85.76%)
      display: grid
      align-items: end
      justify-items: center
      color: $White
      top: 0
      left: 0

      .text
        padding-bottom: 1rem

.caption
  +afs(36px, 24px, 18px)
  margin-top: 2rem

.description
  margin-top: 1rem
  +afs(24px, 18px, 14px)

.titlePausedVideo
  +afs(36px, 30px, 24px)
  position: absolute
  top: 3%
  left: 3%
  box-shadow: none
  color: $White
  padding: 10px
</style>
