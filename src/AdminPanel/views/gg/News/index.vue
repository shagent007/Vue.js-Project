<template lang="pug">
//- если открыта страница редактирования
router-view(v-if="$route.path.includes('edit')")

.News.Page__container(v-else)
  .Page__title все новости

  .News__search
    search-field(
      type="новость"
      v-model="newsSearch"
      @search="searchNews"
    )

  .Page__title-inner новости за текущий месяц

  .News__item(
    v-for="(newsItem, index) in news.currentMonth"
    :key="index"
  )
    .News__header(:class="{ image: newsItem.image }")
      .News__image(v-if="newsItem.image")
        img.News__image-image(:src="newsItem.image" height="100%" width="100%")

      .News__content
        .News__title {{ newsItem.title }}
        .News__info {{ newsItem.info }}

        base-button.News__button(text="Открыть новость")

      .Edit
      
        router-link(:to="{ name: 'AdminPanelGGNewsEdit' }")
          button-doc-edit.Edit__edit.Edit__button

        button-delete.Edit__delete.Edit__button

    .News__date Опубликовано {{ newsItem.date }}, Автор: {{ newsItem.author }}

  .Page__title-inner новости за прошлый месяц
  
  .Page__title-inner новости за 2020 год

</template>

<script>
import SearchField from "@/AdminPanel/ui/SearchField";
import BaseButton from "@/AdminPanel/ui/BaseButton";
import ButtonDelete from "@/views/Account/Files/ButtonDelete";
import ButtonDocEdit from "@/views/Account/Files/ButtonDocEdit";

import { mapGetters } from "vuex";
export default {
  components: {
    SearchField,
    BaseButton,
    ButtonDelete,
    ButtonDocEdit
  },

  data() {
    return {
      newsSearch: "",
      news: {
        currentMonth: [
          {
            title:
              "ВОЗ обращает внимание на скорость распространения коронавируса",
            info:
              "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Purus neque risus dignissim netus. Parturient pretium, enim platea vel. Posuere risus mi nec, egestas quis. Dignissim ultrices bibendum volutpat nulla id in sem felis. Congue sit volutpat mauris adipiscing. Dignissim vitae eget lorem diam...",
            image: "test-info-people.jpg",
            date: "03.04.20",
            author: "В. В. Путин"
          },
          {
            title:
              "ВОЗ обращает внимание на скорость распространения коронавируса",
            info:
              "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Purus neque risus dignissim netus. Parturient pretium, enim platea vel. Posuere risus mi nec, egestas quis. Dignissim ultrices bibendum volutpat nulla id in sem felis. Congue sit volutpat mauris adipiscing. Dignissim vitae eget lorem diam...",
            image: "",
            date: "03.04.20",
            author: "В. В. Путин"
          }
        ],
        lastMonth: [],
        currentYear: []
      }
    };
  },

  methods: {
    searchNews() {
      console.log("hello");
    }
  }
};
</script>

<style lang="sass" scoped>
.News__item
  box-shadow: 6px 2px 16px rgba(136, 165, 191, 0.54), -6px -2px 12px #FFFFFF
  background: linear-gradient(180deg, #F0F4F7 0%, #DCE6F2 48.96%, #F3FAFF 100%)
  border-radius: 10px
  margin: 10px

.News__image
  padding: 10px 0 10px 10px

  @media screen and (max-width: $PhoneWidth)
    padding: 10px

.News__image-image
  object-fit: cover
  border-radius: 10px

.News__header
  display: flex

  @media screen and (max-width: $PhoneWidth)
    flex-flow: column nowrap

.News__header.image .News__image
  width: 40%

.News__header.image .News__content
  width: 60%

.News__header.image .News__image,
.News__header.image .News__content,
.News__header .News__image,
.News__header .News__content
  @media screen and (max-width: $PhoneWidth)
    width: 100%
    box-sizing: border-box

.News__content
  display: flex
  flex-flow: column nowrap
  justify-content: space-between

  width: 100%
  font-size: 14px
  padding: 10px 0
  padding-left: 10px

  @media screen and (max-width: $PhoneWidth)
    padding: 10px

.News__title
  font-size: 18px
  color: $Black

.News__info
  padding: 10px 0

.News__button
  width: fit-content

  @media screen and (max-width: $PhoneWidth)
    width: 100%

.News__date
  font-size: 10px
  padding: 0 10px 10px
  font-style: italic
  font-weight: 500
  letter-spacing: 0.05em

::v-deep .News__content .ap-button__text
  padding: .5rem 1rem
  text-transform: uppercase
  font-size: 12px
  font-weight: bold
  letter-spacing: 2px

.Edit
  padding: 10px
  display: flex
  flex-flow: column nowrap
  justify-content: space-between

  @media screen and (max-width: $PhoneWidth)
    flex-flow: row nowrap

.Edit__button
  background: inherit
  box-shadow: 6px 2px 16px rgba(136, 165, 191, 0.54), -6px -2px 12px #FFFFFF
  border-radius: 10px
  padding: .5rem .7rem
</style>
