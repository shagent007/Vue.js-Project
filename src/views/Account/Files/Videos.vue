<template lang="pug">
.wrapper-video
  h2.block-title Мои видео
  .video-grid
    .video(
      v-for="(video, index) in videos"
      :key="index"    )
      .layer
      //- временно так
      img(src="../../../../public/test-info-people.jpg" width='100%')
      gg-tooltip(tooltipText="Удалить видео")
        gg-confirm.delete(
          title="Вы хотите подтвердить действие?"
          @answer="deleteVideo"
        )
          button-delete 

      .info Нажмите на превью для редактирования
      .name {{ video.name }}
</template>

<script>
// @click="$router.push({ name: 'AccountEditVideo' })"
import ButtonDelete from "./ButtonDelete";
import GgConfirm from "@/components/Base/GgConfirm";
import GgTooltip from "@/components/Base/GgTooltip";

export default {
  data() {
    return {
      videos: new Array(6).fill({
        picture: "",
        name: "формирование управленченской команды, кнр"
      }),
      public: process.env.BASE_URL
    };
  },

  methods: {
    deleteVideo(answer) {
      console.log(answer);
    }
  },

  components: {
    ButtonDelete,
    GgConfirm,
    GgTooltip
  }
};
</script>

<style lang="sass" scoped>
.wrapper-video
  padding: 0 1rem
.video-grid
  display: grid
  grid-template-columns: repeat(2, 1fr)

  @media screen and (max-width: $TableWidth)
    grid-template-columns: 1fr

.video
  position: relative
  display: flex

  &:hover
    .layer, .info
      display: block

  .layer
    position: absolute
    display: none
    width: 100%
    height: 100%
    background-color: rgba(0, 0, 0, 0.5)

  .delete, .name, .info
    position: absolute

  .name, .info
    color: $White
    text-align: center
    width: 100%
    text-shadow: 0px 0px 7px $Black

  .info
    display: none
    top: 50%
    font-style: italic

  .delete
    top: 0
    right: 0

  .name
    text-transform: uppercase
    bottom: 1rem
    font-weight: 500
</style>
