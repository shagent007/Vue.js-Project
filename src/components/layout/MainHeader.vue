<template lang="pug">
header
  gg-menu
  .container
    .logoWrapp
      .burger(@click="changeStateMenu()")
        .span
        .span
        .span
      .center
      router-link.logo(to="/")
        img(src="@/assets/logo/Globalgamelogo.png", alt="alt")
        .brand
          .brand-red  {{GG_HEADER.brand.bottomSiteName}}
    .navigation
      ul
        li(v-for="button in GG_HEADER.arrayNavigationButtons")
          router-link.navigation__link(
            class="navLink" :to="button.href"
            :class="{ active: button.href === $route.path, disabled: button.disabled  }"
          ) {{button.name}}

    .form
      form
        input(
          type="text" 
          disabled
          :placeholder="GG_HEADER.searchPlaceHolder"
        )
        img(src="@/assets/ui/search.svg")
        gg-notification.not.xs(:data="notification")
          i.fas.fa-bell
    .right(v-if="!getIsLogin")
      router-link(:to='links.logIn').sign {{GG_HEADER.transitionMenuAuthorization.signIn}}
      router-link(:to='links.signUp').reg {{GG_HEADER.transitionMenuAuthorization.signUp}}
    .login(v-if="getIsLogin")
      .user
        .text
          .name {{getName}}
          .role {{getRole}}
        .img
          .logo(:style="{backgroundImage: `url('${image}')`, content: loadPhoto}")
          router-link(to="/account/setting")
            img(src="@/assets/ui/setting.svg", alt="alt")
      .menu
        router-link.lk(:to="links.account")  {{GG_HEADER.urlPersonalArea}}
        gg-notification.not(:data="notification")
          i.fas.fa-bell
        img(@click.prevent="methodLogOut" src="@/assets/ui/LogOut.svg")
</template>

<script>
import GgMenu from "./GgMenu";
import GgNotification from "../pages/GgNotification.vue";

import { mapGetters, mapState, mapMutations, mapActions } from "vuex";
const userInformation = "userInformation";
const ggHeader = "mainLayout/ggHeader";
const ggMain = ggHeader + "/ggMain";

export default {
  name: "gg-header",
  components: { GgMenu, GgNotification },
  data() {
    return {
      links: {
        account: "/account/",
        logIn: "/LogIn",
        signUp: "/SignUp"
      },
      notification: [
        {
          emblema: "flag.png",
          title: "Кирилл и Мефодий",
          link: "/news",
          isVideo: true,
          img: "test-info-people.jpg"
        },
        {
          emblema: "flag.png",
          title: "Кирилл и Мефодий",
          link: "/news",
          isVideo: true,
          img: "test-info-people.jpg"
        },
        {
          emblema: "flag.png",
          title: "Кирилл и Мефодий",
          link: "/news",
          isVideo: true,
          img: "test-info-people.jpg"
        },
        {
          emblema: "flag.png",
          title: "Кирилл и Мефодий",
          link: "/news",
          isVideo: true,
          img: "test-info-people.jpg"
        },
        {
          emblema: "flag.png",
          title: "Кирилл и Мефодий",
          link: "/news",
          isVideo: true,
          img: "test-info-people.jpg"
        },
        {
          emblema: "flag.png",
          title: "Кирилл и Мефодий",
          link: "/news",
          isVideo: true,
          img: "test-info-people.jpg"
        },
        {
          emblema: "flag.png",
          title: "Кирилл и Мефодий",
          link: "/news",
          isVideo: true,
          img: "test-info-people.jpg"
        }
      ]
    };
  },
  computed: {
    ...mapGetters(userInformation, ["getIsLogin", "getName", "getRole"]),
    ...mapGetters("staticData", ["GG_HEADER"]),
    ...mapState(userInformation, ["image"]),
    ...mapGetters(ggMain, ["isActive"])
  },
  methods: {
    ...mapMutations(ggMain, ["changeStateMenu"]),
    ...mapActions(userInformation, ["logOut", "loadPhoto"]),
    methodLogOut() {
      this.logOut();
      if (this.$route.path !== "/") this.$router.replace("/");
    }
  },
  mounted() {
    console.log(this.getIsLogin);
  }
};
/* eslint-disable */
</script>

<style lang="sass" scoped>
.logoWrapp
  display: flex
  align-items: center
.logo
  display: flex
  align-items: center
  justify-content: flex-start
  @media screen and ( max-width: $PhoneWidth )
    display: none
  img
    margin-right: .5rem
    width: 7rem
  .brand
    font-weight: bold
    display: flex
    align-items: center
    justify-content: flex-start
    @media screen and ( max-width: $SmDesktopWidth )
      display: none
    .brand-blue
      +afs(24px, 20px, 18px)
      color: $Blue
    .brand-red
      +afs(24px, 20px, 18px)
      color: $Red


header
  position: relative
  padding-top: 1rem
  padding-bottom: 1rem
  font-weight: 500
  text-transform: uppercase
  box-shadow: 0px 6px 12px rgba(8, 35, 48, 0.14), 0px 16px 24px rgba(8, 35, 48, 0.08)
  background-color: $White
  margin-bottom: 2rem

  .container
    display: flex
    align-items: center
    justify-content: space-between
    grid-gap: 1rem
    text-transform: uppercase

    .burger
      width: 3rem
      display: flex
      align-items: center
      cursor: pointer
      flex-direction: column
      margin-right: 1rem
      .span
        width: 100%
        margin-bottom: .5rem
        height: 5px
        background-color: $Blue




    .navigation
      display: flex
      margin: 0rem 1rem
      align-items: center
      justify-content: flex-end
      @media screen and ( max-width: $TableWidth )
        display: none
      ul
        padding: 0
        margin: 0
        display: flex
        align-items: center
        list-style: none
        flex-flow: wrap
        width: 320px
        li
          flex: 1
          &:nth-child(1),
          &:nth-child(2),
          &:nth-child(3)
            border-bottom: 1px solid $Black
            padding-bottom: .5rem
          &:nth-child(4),
          &:nth-child(5),
          &:nth-child(6)
            padding-top: .5rem

          &:nth-child(1),
          &:nth-child(4)
            a
              border: none
        a
          border-left: 1px solid $Black
          display: block
          color: $Black
          transition: 0.3s
          text-align: center
          text-decoration: none
          &:hover,
          &.active
            color: $Red
          &.disabled
            color: $Grey
            cursor: context-menu
    .form
      display: none
      align-items: center
      width: 100%
      padding: 0 2rem
      @media screen and ( max-width: $TableWidth )
        display: flex
      @media screen and ( max-width: $PhoneWidth )
        padding: 0px
      .xs
        display: none
        justify-content: flex-end
        margin-top: 1rem
        @media screen and ( max-width: $PhoneWidth )
          display: flex
    form
      width: 100%
      position: relative
      display: none
      @media screen and ( max-width: $TableWidth )
        display: block
      @media screen and ( max-width: $PhoneWidth )
        width: 100%
      input
        border: none
        outline: none
        padding: 5px
        border-bottom: 1px solid $Blue
        background-color: transparent
        width: 100%
        color: $Blue


      img
        position: absolute
        top: 1px
        right: -5px
        cursor: pointer
.navigation__link.disabled
  color: $Grey

.login
  display: flex
  flex-flow: wrap
  width: 175px
  margin-left: 2rem
  justify-content: flex-end
  @media screen and ( max-width:$PhoneWidth )
    display: none
  .lk
    font-size: 14px
    display: flex
    align-items: center
    justify-content: flex-end
    white-space: nowrap
    color: $Red
  .user
    display: flex
    justify-content: flex-end
    height: 48px
    align-items: center
    margin-bottom: .5rem
    .text
      margin-right: .5rem
      text-align: right
      align-items: center
      .name
        color: $Blue
        font-size: 14px
        font-weight: 500
      .role
        font-size: 12px
        font-weight: 500
    .logo
      background-repeat: no-repeat
      background-position: center
      background-clip: content-box
      background-size: cover
      height: 48px
      width: 48px
    .img
      align-items: center
      display: flex
      position: relative
      a img
        position: absolute
        top: 50%
        opacity: 0
        left: 50%
        transform: translate(-50%, -50%)
        width: 3rem
        background-color: rgba(0,0,0,0.5)
        padding: 1rem
        box-sizing: border-box
        transition: .5s
      &:hover
        a img
          opacity: 1
  .menu
    display: flex
    justify-content: space-between
    .not
      svg
        margin: 0rem 1rem
        transition: .3s
        cursor: pointer
        &:hover
          color: $Red
    button
      border: none
      background-color: inherit

.right
  display: flex
  justify-content: flex-end
  align-items: center
  @media screen and (max-width: $PhoneWidth)
    display: none
  .sign
    margin-right: .5rem
  a
    color: $Blue
    text-decoration: none
    +afs(18px,16px,14px)
    transition: 0.3s

    &:first-child
      margin-right: 20px

    &:hover
      color: $Red
      border-bottom: 1px solid $Red
</style>
