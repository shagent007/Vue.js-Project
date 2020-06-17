<template lang="pug">
.wrapper-videos-edit
  .account-item-header
    h1.title-edit Редактировать видео

    gg-video.marj(:videoSource="video" videoName="hey how")
    gg-input.marj(v-model="name" label="Название")
    gg-input.marj(v-model="desc" label="Описание")

  bottom-buttons(type="видео" @save="save")
</template>

<script>
//jstffn
import GgInput from "@/components/Base/GgInput";
import GgVideo from "@/components/Base/GgVideo";

import BottomButtons from "./BottomButtons";

import { mapActions } from "vuex";
export default {
  data() {
    return {
      name: "",
      desc: "",
      video: "video/video.mp4",
      caption: "caption"
    };
  },

  components: {
    BottomButtons,
    GgInput,
    GgVideo
  },

  methods: {
    ...mapActions("accountFiles", ["cancelEditing"]),
    save() {
      this.cancelEditing();
      this.$router.push({ name: "AccountFiles" });
    }
  }
};
</script>

<style lang="sass" scoped>
.wrapper-videos, .account-item-header
  display: flex
  flex-flow: column

.marj
  width: 100%
  margin: auto
  box-sizing: border-box
  padding-bottom: 2rem
  margin-bottom: 1rem
</style>
