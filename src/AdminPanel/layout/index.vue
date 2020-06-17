<template lang="pug">
.layout-wrapper(
  :class="{ 'console-page': consolePage }"
)

  app-header.layout-wrapper__header(
    v-model="consolePage"
  )

  app-menu.layout-wrapper__menu(
    v-model="consolePage"
  )

  .layout-wrapper__content(
    v-show="!consolePage"
  )
    slot
</template>

<script>
import BaseButton from "@/AdminPanel/ui/BaseButton";
import AppHeader from "./AppHeader";
import AppMenu from "./AppMenu";

export default {
  components: {
    BaseButton,
    AppHeader,
    AppMenu
  },

  data() {
    return {
      consolePage: true
    };
  },

  computed: {
    pageSelected() {
      return this.$route.fullPath.split("/").length > 3;
    }
  }
};
</script>

<style lang="sass" scoped>
.layout-wrapper__menu
  float: left

  // высота окна - ( высота шапки + паддинг конента)
  min-height: calc(100vh - 110px)

  @media screen and (max-width: 1200px)
    width: 100%

/* если открыта консоль на планшете или телефоне */
.layout-wrapper.console-page .layout-wrapper__content

  @media screen and (max-width: 1200px)
    display: none

.layout-wrapper.console-page .layout-wrapper__menu

  @media screen and (max-width: 1200px)
    display: block

/* если закрыта консоль на планшете или телефоне */
.layout-wrapper .layout-wrapper__menu

  @media screen and (max-width: 1200px)
    display: none

.layout-wrapper.console-page .layout-wrapper__content

  @media screen and (max-width: 1200px)
    display: block

/* стили для контента страницы */

.layout-wrapper__content
  padding: 40px 50px
  box-shadow: inset 5px 5px 10px #A6ABBD, inset -5px -5px 10px #FAFBFF
  border-radius: 40px 0px 0px 0px
  display: flex

  @media screen and (max-width: $PhoneWidth)
    padding: 30px 15px
    border-radius: 0

/* стили для заголовков страниц */
::v-deep .Page__title,
::v-deep .Page__title-inner
  font-weight: bold
  letter-spacing: 0.1em
  text-transform: uppercase

::v-deep .Page__title
  +afs(36px, 24px, 16px)

::v-deep .Page__title-inner
  margin: 20px 0
  +afs(18px, 14px, 12px)

/* тени для таблицы */
::v-deep .AdminPanel__table
  box-shadow: 0px 8px 16px rgba(0, 0, 0, 0.1)

/* скрыл кнопки которые там уже были чтобы вставить свои */
::v-deep .EditPage .content
  display: none

/* отступ для поля поиска */
::v-deep .SearchField
  padding: 30px 40px
  box-sizing: border-box

  @media screen and (max-width: $TableWidth)
    padding: 20px 0

/* ширина 100% для контейнера страницы */
::v-deep .Page__container
  width: 100%
</style>
