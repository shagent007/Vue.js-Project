<template lang="pug">
.functional-wrapper  
  .wrapper-tab
    .tab-buttons 
      .tab(
        v-for="(item,index) in ACCOUNT_FUNCTIONAL.tabButtons" 
        @click="chageTab(index)" 
        :class="{'active': item.tab}"
        :key="index" 
      ) {{item.title}}
    .tab-content 
      form.content(:class="{'active': ACCOUNT_FUNCTIONAL.tabButtons[0].tab}" :name="videoForm.nameForm") 
        .inputs
          gg-input-validate(:error="$v.Video.VideoTitle")  
            gg-input.content__input(
              icon="fas fa-pen" 
              :label="ACCOUNT_FUNCTIONAL.video.Labels.title" 
              v-model="Video.VideoTitle" :name="videoForm.title"
            )

          gg-input-validate(:error="$v.Video.VideoDescription") 
            gg-input.content__input(
              icon="fas fa-pen" 
              :label="ACCOUNT_FUNCTIONAL.video.Labels.description" 
              v-model="Video.VideoDescription" :name="videoForm.information"
            )

        .other
          .upload(:class="{'none': noneV}")
            input(type="file" accept="video/*" ref="video" :name="videoForm.video" style="display: none" @change="UploadVideo")
            .text( @click="$refs.video.click()") {{ACCOUNT_FUNCTIONAL.video.upload}}
            img(src="@/assets/ui/upload.svg", alt="alt")
          .uploadFile(:class="{'none':!noneV}")
            img.delete(src="@/assets/VideoUI/deleteFile.svg" @click="deleteFile('TrainerVideo')" )
            img.play(src="@/assets/VideoUI/play_button.svg" @click="playVideo" :class="{'none': play}")  
            video(class="file" id="TrainerVideo" @click="playVideo" ref="player")
          gg-button(color="red" @click.prevent="uploadVideo") {{ACCOUNT_FUNCTIONAL.button}}
      form.content(:class="{'active': ACCOUNT_FUNCTIONAL.tabButtons[1].tab}" :name="newsForm.nameForm")
        .inputs
          gg-input-validate(:error="$v.News.NewsTitle") 
            gg-input(icon="fas fa-pen" :label="ACCOUNT_FUNCTIONAL.news.Labels.title" v-model="News.NewsTitle" :name="newsForm.title")
          gg-input-validate(:error="$v.News.NewsExcerpt") 
            gg-input(icon="fas fa-pen" :label="ACCOUNT_FUNCTIONAL.news.Labels.description" v-model="News.NewsExcerpt" :name="newsForm.briefInformation")
          gg-input-validate(:error="$v.News.NewsText") 
            gg-text-area(icon="fas fa-pen" :label="ACCOUNT_FUNCTIONAL.news.Labels.text" v-model="News.NewsText" :placeholder="ACCOUNT_FUNCTIONAL.news.Labels.placeholder" :name="newsForm.fullInformation")
        .other
          .upload(:class="{'none': noneP}")
            input(type="file" accept="image/*" ref="img" :name="newsForm.image" style="display: none" @change="UploadImg")
            .text( @click="$refs.img.click()") {{ACCOUNT_FUNCTIONAL.news.upload}}
            img(src="@/assets/ui/upload.svg", alt="alt")
          .uploadFile(:class="{'none':!noneP}")
            img.delete(src="@/assets/VideoUI/deleteFile.svg" @click="deleteFile('TrainerImg')" )  
            img(class="file" id="TrainerImg")
          gg-button(color="red" @click.prevent="uploadNews") {{ACCOUNT_FUNCTIONAL.button}}
</template>

<script>
import GgInput from "@/components/Base/GgInput";
import GgButton from "@/components/Base/GgButton";
import GgTextArea from "@/components/Base/GgTextArea";
import GgInputValidate from "@/components/ErrorHandler/GgInputValidate";

import { required } from "vuelidate/lib/validators";
import { validationMixin } from "vuelidate";

import { mapGetters } from "vuex";
const userInformation = "userInformation";

export default {
  name: "trainerMentor",

  mixins: [validationMixin],

  data() {
    return {
      videoForm: {
        nameForm: "Add New Video",
        title: "title",
        information: "fullDescription",
        video: "video"
      },
      newsForm: {
        nameForm: "Add New News",
        title: "title",
        briefInformation: "briefDescription",
        fullInformation: "fullDescription",
        image: "image"
      },
      testForm: {
        nameForm: "Add New Test"
      },
      noneV: false,
      noneP: false,
      play: false,
      isVariants: [
        { isVariant: true },
        { isVariant: true },
        { isVariant: true },
        { isVariant: true },
        { isVariant: true }
      ],
      Video: {
        VideoTitle: "",
        VideoDescription: ""
      },
      News: {
        NewsTitle: "",
        NewsExcerpt: "",
        NewsDescription: "",
        NewsText: ""
      }
    };
  },
  computed: {
    ...mapGetters("staticData", ["ACCOUNT_FUNCTIONAL"]),
    ...mapGetters(userInformation, ["getId", "getCountry"])
  },
  methods: {
    chageTab(index) {
      this.ACCOUNT_FUNCTIONAL.tabButtons.forEach(
        element => (element.tab = false)
      );
      this.ACCOUNT_FUNCTIONAL.tabButtons[index].tab = true;
    },
    UploadVideo() {
      if (this.$refs.video.files[0]) {
        const video = document.getElementById("TrainerVideo");
        video.src = URL.createObjectURL(this.$refs.video.files[0]);
        this.noneV = true;
      }
    },
    UploadImg() {
      if (this.$refs.img.files[0]) {
        const img = document.getElementById("TrainerImg");
        img.src = URL.createObjectURL(this.$refs.img.files[0]);
        this.noneP = true;
      }
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
    deleteFile(id) {
      this.play = false;
      document.getElementById(id).src = null;
      if (id == "TrainerVideo") this.noneV = false;
      else this.noneP = false;
    },
    uploadVideo(e) {
      const KEY_COMPONENT = "uploadVideo";
      e.preventDefault();
      this.$v.Video.$touch();

      const defaultVideo = () => {
        this.Video = {
          VideoTitle: "",
          VideoDescription: ""
        };
      };
      this.$store
        .dispatch("videos/addVideo", {
          form: document.forms[this.videoForm.nameForm],
          country: this.getCountry,
          creatorId: this.getId
        })
        .then(flag => {
          switch (flag) {
            case "":
              defaultVideo();
              break;
            default:
              console.group(KEY_COMPONENT);
              console.info("Не обработанная ошибка");
              console.log(flag);
              console.groupEnd();
          }
        });
    },
    uploadNews(e) {
      e.preventDefault();
      const KEY_COMPONENT = "uploadNews";
      this.$v.News.$touch();

      const defaultNews = () => {
        this.News = {
          NewsTitle: "",
          NewsExcerpt: "",
          NewsDescription: "",
          NewsText: ""
        };
      };
      this.$store
        .dispatch("news/addNews", {
          form: document.forms[this.newsForm.nameForm],
          creatorId: this.getId
        })
        .then(flag => {
          switch (flag) {
            case "":
              defaultNews();
              break;
            default:
              console.group(KEY_COMPONENT);
              console.info("Не обработанная ошибка");
              console.log(flag);
              console.groupEnd();
          }
        });
    }
  },
  validations: {
    Video: {
      VideoTitle: { required },
      VideoDescription: { required }
    },
    News: {
      NewsTitle: { required },
      NewsDescription: { required },
      NewsText: { required },
      NewsExcerpt: { required }
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

.wrapper-tab
  box-shadow: 0px 7px 8px rgba(0,0,0,0.15), 2px 1px 2px rgba(0,0,0,0.15)
  border-top-left-radius: 1rem
  border-top-right-radius: 1rem
  margin: 0rem 1rem 1rem 1rem

.tab-buttons
  display: flex
  .tab
    background-color: white
    text-align: center
    flex-basis: 50%
    cursor: pointer
    padding: 1rem
    border-top-right-radius: 1rem
    border-top-left-radius: 1rem
    box-shadow: 0px 0px 7px rgba(0, 0, 0, 0.2), 0px 5px 15px rgba(0, 0, 0, 0.1)
    text-shadow: 0px 1px 2px rgba(8, 35, 48, 0.24), 0px 2px 6px rgba(8, 35, 48, 0.16)
    color: $LightGrey
    +afs(26px, 20px, 16px)

    &.active
      color: $Black
      box-shadow: -2px -1px 2px rgba(0,0,0,0), 2px -1px 2px rgba(0,0,0,0.2)
      font-weight: 500

.tab-content
  background-color: $White
  padding: 1rem
  .content
    display: none
    &.active
      display: block
      .scheme
        overflow-x: auto
        .h1
          +afs(30px, 20px, 16px)
          text-align: center
          margin: 2rem 0rem
          img
            min-width: 660px

.content__input ::v-deep .input__input
  font-weight: bold

.inputs
  display: grid
  grid-gap: 1rem

.other
  display: grid
  grid-gap: 1rem
  .btn-red
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
.testItem
  margin-bottom: 4rem
.radio
  display: grid
  grid-template-columns: 1fr 1fr
  grid-gap: 1rem
  margin-top: 1rem
  margin-bottom: 1rem
  input[type=radio]
    display: none
  input[type=radio] + label:before
    content: "\2714"
    color: transparent
    display: inline-block
    border: 1px solid $Black
    font-size: 20px
    font-weight: 900
    line-height: 22px
    margin: -5px 5px 0 0
    height: 20px
    width: 20px
    text-align: center
    vertical-align: middle
    transition: color ease .3s
  input[type=radio]:checked + label:before
    color: rgb(31,142,79)
    border-color: rgb(31,142,79)
.uploadFile
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

.file
  width: 250px
.none
  display: none !important
</style>
