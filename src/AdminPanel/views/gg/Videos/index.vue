<template lang="pug">
//- если открыта страница редактирования
router-view(v-if="$route.path.includes('edit')")

.Videos.Page__container(v-else)

  .Page__title Все видео

  .Videos__search
    search-field(
      type="видео"
      v-model="videosSearch"
      @search="searchVideos"
    )

  .Page__title-inner видео за текущий месяц

  .Videos__container
    .Videos__item(
      v-for="(video, index) in videos"
      :key="index"
    )

      .Videos__date Опубликовано {{ video.date }}, Автор: {{ video.author }}

      .Videos__video
        video-pre-loader(
          :source="video"
        )
        .Edit

          router-link(:to="{ name: 'AdminPanelGGVideosEdit' }")
            button-doc-edit.Edit__button

          button-delete.Edit__button

</template>

<script>
import SearchField from "@/AdminPanel/ui/SearchField";
import VideoPreLoader from "@/components/pages/VideoPreLoader";
import ButtonDelete from "@/views/Account/Files/ButtonDelete";
import ButtonDocEdit from "@/views/Account/Files/ButtonDocEdit";

export default {
  components: {
    VideoPreLoader,
    ButtonDelete,
    ButtonDocEdit,
    SearchField
  },

  data() {
    return {
      videosSearch: "",
      videos: [
        {
          title:
            "ВОЗ обращает внимание на скорость распространения коронавируса",
          image: "test-info-people.jpg",
          date: "03.04.20",
          author: "В. В. Путин"
        },
        {
          title:
            "ВОЗ обращает внимание на скорость распространения коронавируса",
          image: "test-info-people.jpg",
          date: "03.04.20",
          author: "В. В. Путин"
        },
        {
          title:
            "ВОЗ обращает внимание на скорость распространения коронавируса",
          image: "test-info-people.jpg",
          date: "03.04.20",
          author: "В. В. Путин"
        }
      ]
    };
  },

  methods: {
    searchVideos() {
      console.log("hekk");
    }
  }
};
</script>

<style lang="sass" scoped>
.Videos__container
  display: flex
  flex-flow: row wrap

.Videos__item
  box-shadow: 6px 2px 16px rgba(136, 165, 191, 0.54), -6px -2px 12px #FFFFFF
  border-radius: 10px
  width: 45%
  padding: 10px
  margin-bottom: 10px

  @media screen and (max-width: $PhoneWidth)
    width: 100%

.Videos__item:nth-child(odd)
  margin-right: 1rem

  @media screen and (max-width: $PhoneWidth)
    margin-right: 0

.Videos__date
  padding-bottom: 10px
  text-align: right
  font-style: italic
  font-size: 10px

.Videos__video
  position: relative
  border-radius: 4px
  overflow: hidden

::v-deep .Videos__video .caption
  top: none
  bottom: 0
  background: none
  color: $White
  opacity: 1

.Edit
  z-index: 100
  display: flex
  justify-content: space-between
  width: 100%
  position: absolute
  top: 0

.Edit__button
  background: linear-gradient(180deg, #F0F4F7 0%, #DCE6F2 48.96%, #F3FAFF 100%)
  box-shadow: 6px 2px 16px rgba(136, 165, 191, 0.54), -6px -2px 12px #FFFFFF
  border-radius: 4px
  padding: .5rem .7rem

.Edit__button:active
  background: #FFFFFF
  box-shadow: inset 3px 3px 7px rgba(136, 165, 191, 0.6), inset -3px -3px 7px #FFFFFF
</style>
