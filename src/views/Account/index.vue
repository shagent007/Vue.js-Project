<template lang="pug">
main-layout
  .container
    .global-title {{ STATIC.personal_area }}
    .block-information
      .menu-title {{ STATIC.stages }}
      .top-container
        .container-menu-button
          router-link.menu-button(
            v-for="(button, index) in menuButtons"
            :to="button.url"
            :class="{ 'active': button.value === currentPage }"
            :key="index"
          ) {{ STATIC.menuButtons[button.value] }}
          
        router-view(v-if="filesRoute")

        //- если путь например /account/profile
        component(v-else :is="currentPage")

        
  .chat-icon(@click="chat = true")
    img.first(src="@/assets/ui/open-chat-first.svg")
    img.second(src="@/assets/ui/open-chat-second.svg")
    .text открыть чат
  gg-chat(v-model="chat")
</template>

<!--
  У КАЖДОГО КОМПОНЕНТА ДОЛЖНО БЫТЬ ДВА КОНТЕЙНЕРА.

  ОДИН ОБЯЗАТЕЛЬНЫЙ С КЛАССОМ .account-item-header,
  ЕМУ БУДЕТ СТАВИТЬСЯ margin-left
  ДЛЯ ОТСТУПА ОТ МЕНЮ

  ВТОРОЙ НЕОБЯЗАТЕЛЕН, В НЕГО ПОМЕЩАЕТСЯ
  ДОПОЛНИТЕЛЬНЫЙ КОНЕНТ, КОТОРЫЙ БУДЕТ ВО ВСЮ
  ШИРИНУ И БУДЕТ РАСПОЛОГАТЬСЯ СНИЗУ
-->

<script>
import GgChat from "@/components/Chat/Index.vue";

import { mapGetters } from "vuex";
export default {
  data() {
    return {
      chat: false,
      accountPaths: {
        profile: "profile",
        finance: "finance",
        team: "team",
        functional: "functional",
        files: "files",
        rating: "rating"
      },
      menuButtons: [
        { url: `/account/profile`, value: "profile" },
        { url: `/account/finance`, value: "finance" },
        { url: `/account/team`, value: "team" },
        { url: `/account/functional`, value: "functional" },
        { url: `/account/files`, value: "files" },
        { url: `/account/rating`, value: "rating" }
      ],
      editPaths: ["video", "test", "news"],
      currentPage: "profile"
    };
  },
  components: {
    profile: () => import("@/views/Account/Profile"),
    finance: () => import("@/views/Account/Finance"),
    team: () => import("@/views/Account/Team"),
    functional: () => import("@/views/Account/Functional/Index"),
    rating: () => import("@/views/Account/Rating"),
    files: () => import("@/views/Account/Files/Index"),
    GgChat
  },
  mounted() {
    this.changeRout(this.$route.path);
  },
  watch: {
    $route(to) {
      console.log(to);
      this.changeRout(to.path);
    }
  },
  computed: {
    filesRoute() {
      return this.$route.path.includes("files");
    },
    ...mapGetters("account", ["STATIC"])
  },
  methods: {
    changeRout(path) {
      const pathArray = path.split("/");
      const page = pathArray[pathArray.length - 1];

      console.log(page, pathArray);
      if (this.filesRoute) {
        // проверяем на реальные пути
        if (page === "files" || this.editPaths.includes(page)) {
          this.currentPage = page;
        } else {
          this.$router.push({ name: "Page404" });
        }
      } else if (path.includes("team") && path.includes("create-test")) {
        return;
      } else {
        this.currentPage = page;
      }
    }
  }
};
</script>

<style lang="sass" scoped>
.top-container
  min-height: 390px

::v-deep .account-item-header
  padding-left: 270px
  min-height: 390px

  @media screen and (max-width: $TableWidth)
    padding: 10px 0 0
.container
  display: flex
  flex-direction: column

  .global-title
    font-weight: 500
    +afs(36px, 32px, 24px)
    letter-spacing: 0.1em
    text-transform: uppercase
    text-align: center
    margin-bottom: 3%
    margin-top: 3%

  .block-information
    display: flex
    flex-flow: column nowrap
    box-shadow: 0px 6px 12px rgba(8, 35, 48, 0.14), 0px 16px 24px rgba(8, 35, 48, 0.08)

    .menu-title
      background-color: inherit
      padding: 2rem
      +afs(24px, 20px, 16px)
      text-transform: uppercase
      font-weight: 400

    .top-container

      .container-menu-button
        position: absolute
        height: 380px
        width: 265px
        display: flex
        flex-flow: column nowrap
        justify-content: space-between
        z-index: 99

        @media screen and (max-width: $TableWidth)
          position: relative
          width: 50%

        @media screen and (max-width: $PhoneWidth)
          width: 100%

        a.menu-button
          flex: 1
          width: 93%

          display: flex
          flex-direction: row
          align-items: center
          align-self: center
          align-content: center
          box-sizing: content-box

          background: linear-gradient(90deg, #B9CCF2 -3.33%, #F0F5FF 100%)
          box-shadow: 6px 6px 12px rgba(8, 35, 48, 0.14), 16px 16px 24px rgba(8, 35, 48, 0.08)

          font-size: 20px
          line-height: 19px
          letter-spacing: 0.1em
          text-transform: uppercase
          color: rgba(0, 0, 0, 0.81)
          text-decoration: none

          margin: 5% 3% 0 0
          padding-left: 7%

          border-left: #B9CCF2 solid 10px

          &.active
            background: linear-gradient(90deg, #FFECE4 -3.33%, #FEF6F3 100%)
            color: rgba(213, 43, 30, 0.81)
            box-shadow: none
            border: none

          &:first-child
            margin-top: 0

.chat-icon
  display: inline-flex
  align-items: center
  position: fixed
  bottom: 10px
  right: 0
  z-index: 1
  cursor: pointer

  .text
    display: flex
    opacity: 0
    position: relative
    box-sizing: border-box
    height: fit-content
    margin-left: -7rem
    background-size: 150px
    padding: 10px 15px 10px 40px
    background-position-y: 3px
    background-position-x: 4px
    background-repeat: no-repeat
    transition: margin-left 1s ease, opacity 1s ease

  &:hover .text
    @media screen and (min-width: $SmDesktopWidth)
      margin-left: 1rem
      opacity: 1
      background-image: url('../../assets/ui/open-chat-arrow.svg')

  .second
    position: absolute
    left: 13px
    bottom: -5px
</style>
