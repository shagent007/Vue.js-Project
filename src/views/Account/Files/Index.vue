<template lang="pug">
.wrapper

  .account-item-header(:class="{ 'only-videos': !showNewsTest }")
    gg-videos(:data="VIDEOS" @setEdit="editContent => setEditing({ editContent, editItem: 'video' })")
      
  .content(v-if="showNewsTest")
    hr
    gg-news(:data="NEWS" @setEdit="editContent => setEditing({ editContent, editItem: 'news' })")

</template>

<script>
import GgVideos from "./Videos";
import ButtonDelete from "./ButtonDelete";

import { mapGetters, mapActions } from "vuex";
export default {
  components: {
    GgVideos,
    ButtonDelete,
    "gg-news": () => import("./News")
    // "gg-tests": () => import("./Tests")
  },
  data() {
    return {
      editItem: "news"
    };
  },
  computed: {
    ...mapGetters("userInformation", ["getIsTrainer", "getIsMentor"]),
    ...mapGetters("accountFiles", ["IS_EDITING", "NEWS", "TESTS", "VIDEOS"]),

    showNewsTest() {
      return this.getIsTrainer || this.getIsMentor;
    }
  },
  methods: {
    ...mapActions("accountFiles", ["setEditing"])
  }
};
</script>

<style lang="sass" scoped>
.wrapper
  display: flex
  width: 100%
  flex-flow: column nowrap
.content
  padding: 0 2rem
  display: flex
  flex-flow: column nowrap
  padding-bottom: 2rem
hr
  margin: 3rem 0
::v-deep .block-title
  margin: 0 0 1rem 2rem
  font-size: 24px
  line-height: 23px
  text-transform: uppercase

.only-videos
  margin-bottom: 1rem
</style>
