<template lang="pug">
.functional-wrapper
  .theme {{ACCOUNT_FUNCTIONAL.tabButtons[0].title}}
  .inputs
    gg-input-validate(:error="$v.Video.VideoTitle")
      gg-input(icon="fas fa-pen" :label="ACCOUNT_FUNCTIONAL.video.Labels.title" v-model="Video.VideoTitle")
    gg-input-validate(:error="$v.Video.VideoDescription") 
      gg-input(icon="fas fa-pen" :label="ACCOUNT_FUNCTIONAL.video.Labels.description" v-model="Video.VideoDescription")
  .other
    .upload(:class="{'none': none}")
      input(type="file" accept="video/*" ref="video" name="vid" style="display: none" @change="Upload")
      .text( @click="$refs.video.click()") {{ACCOUNT_FUNCTIONAL.video.upload}}
      img(src="@/assets/ui/upload.svg", alt="alt")
    .video(:class="{'none':!none}")
      //- img.delete(src="@/assets/VideoUI/deleteFile.svg" @click="deleteVideo" )
      img.play(src="@/assets/VideoUI/play_button.svg" @click="playVideo" :class="{'none': play}")  
      video(id="video" @click="playVideo" ref="player")
    gg-button(color="red" @click.prevent="uploadVideo") {{ACCOUNT_FUNCTIONAL.button}}
</template>

<script>
import GgInput from "@/components/Base/GgInput";
import GgButton from "@/components/Base/GgButton";
import GgTextArea from "@/components/Base/GgTextArea";
import GgInputValidate from "@/components/ErrorHandler/GgInputValidate";

import { required } from "vuelidate/lib/validators";
import { validationMixin } from "vuelidate";

import { mapGetters } from "vuex";
export default {
  name: "partipicant",
  mixins: [validationMixin],
  data() {
    return {
      none: false,
      play: false,
      Video: {
        VideoTitle: "",
        VideoDescription: ""
      }
    };
  },
  computed: {
    ...mapGetters("staticData", ["ACCOUNT_FUNCTIONAL"])
  },
  methods: {
    Upload() {
      if (this.$refs.video.files[0]) {
        let video = document.getElementById("video");
        video.src = URL.createObjectURL(this.$refs.video.files[0]);
        this.none = !this.none;
      }
    },
    uploadVideo() {
      this.$v.Video.$touch();
    },
    playVideo() {
      if (this.$refs.player.paused) {
        this.$refs.player.play();
        this.play = true;
      } else {
        this.$refs.player.pause();
        this.play = false;
      }
    },
    deleteVideo() {
      this.play = false;
      this.$refs.player.src = "";
      this.none = !this.none;
    }
  },

  validations: {
    Video: {
      VideoTitle: { required },
      VideoDescription: { required }
    }
  },
  components: {
    GgInput,
    GgTextArea,
    GgInputValidate,
    GgButton
  }
};
</script>

<style lang="sass" scoped>
.theme
  margin: 0px 0px 1rem 0px
  padding: 0px

.inputs
  display: grid
  grid-gap: 1rem

.video
  position: relative
  display: grid
  width: 250px
  margin-top: 2rem

  .play
    position: absolute
    top: 50%
    left: 50%
    transform: translate(-50% ,-50%)
    width: 30%
    cursor: pointer
    z-index: 100
  .delete
    position: absolute
    top: 0px
    right: 0px
    cursor: pointer
    z-index: 100

#video
  width: 250px

.other
  display: grid
  grid-gap: 1rem
  button
    justify-self: end
  .upload
    margin-top: 2rem
    display: grid
    grid-template-columns: auto 1fr
    align-items: end
    color: $Blue
    font-weight: 500
    cursor: pointer
    justify-items: start
    grid-gap: 1rem
    .text
      border-bottom: 2px solid $Blue
      +afs(18px, 18px, 14px)
      font-style: italic
.none
  display: none !important
</style>
