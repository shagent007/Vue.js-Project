<template lang="pug">
  .container
    .gradiend(:class="{'active': isActive}" @click="changeStateMenu()")
    .menu(:class="{'active': isActive}")
      .top
        .logo
          img(src="@/assets/logo/Globalgamelogo.png", alt="alt")
          .brand
            .brand-red  {{GG_HEADER.brand.bottomSiteName}}
          .x(@click="changeStateMenu()")
            i.fas.fa-times
        .in(v-if="!getIsLogin")
          router-link.sign(to="LogIn" @click="changeStateMenu()") {{GG_HEADER.transitionMenuAuthorization.signIn}}
          router-link.reg(to="SignUp" @click="changeStateMenu()") {{GG_HEADER.transitionMenuAuthorization.signUp}}
        .login(v-if="getIsLogin")
          .user
            .text
              .name {{getName}}
              .role {{getRole}}
            .img
              img(src="@/assets/ui/user.svg", alt="alt")
              router-link(to="AccountSetting" @click="changeStateMenu()")
                img(src="@/assets/ui/setting.svg", alt="alt")
          router-link.lk(to="lk" @click="changeStateMenu()")  {{GG_HEADER.urlPersonalArea}}
            img(src="@/assets/ui/LogOut.svg")
      .ul
        ul.extra-menu
          li(
            v-for="(item, index) in GG_HEADER.arrayNavigationButtons" 
            :key="index"
            @click="changeStateMenu()"
          )
            router-link(
              :to="item.href" 
              :class="{'active': isActiveNavigationButton(item.href)}"
            ) {{item.name}}

        ul.post(v-for="block in GG_HEADER.leavingMenuBlocks")
          li {{block.title}}

          li(
            v-for="(item,index) in block.arrayNavigationButtons"
            :key="index"
            @click="changeStateMenu()"
          )
            router-link(
              @click="changeStateMenu()"
              :to="item.href" 
              :class="{'active': isActiveNavigationButton(item.href)}"
            ) {{item.title}}

      .contact
        .item
          img(src="@/assets/social/telephone-blue.svg", alt="alt")
          a(href="tel:+7495777777").text
            | {{GG_HEADER.contactInformation.telephoneNumber.text}}
        .item
          img(src="@/assets/social/mail-blue.svg", alt="alt")
          a(href="mailto:100days@mail.ru").text
            | {{GG_HEADER.contactInformation.email.text}}
</template>

<script>
import { mapGetters, mapMutations } from "vuex";
const userInformation = "userInformation";
const ggHeader = "mainLayout/ggHeader";
const ggMain = ggHeader + "/ggMain";

export default {
  name: "gg-menu",
  computed: {
    ...mapGetters(userInformation, ["getIsLogin", "getName", "getRole"]),
    ...mapGetters("staticData", ["GG_HEADER"]),
    ...mapGetters(ggMain, ["isActive"])
  },
  methods: {
    ...mapMutations(ggMain, ["changeStateMenu"]),
    isActiveNavigationButton(href) {
      return href === this.$route.path;
    }
  }
};
</script>

<style lang="sass" scoped>
.logo
  display: grid
  grid-template-columns: auto auto
  align-items: center
  justify-self: start
  grid-gap: .5rem
  justify-items: start
  img
    justify-self: start
    width: 4.5rem
  .brand
    font-weight: bold
    display: grid
    align-items: center
    justify-self: start
    .brand-blue
      font-size: 24px
      color: $Blue
    .brand-red
      font-size: 20px
      color: $Red

.gradiend
  position: fixed
  top: 0
  left: -9999px
  width: 100%
  height: 100vh
  background: linear-gradient(180deg, rgba(0, 57, 166, 0) 0%,rgba(0, 57, 166, 0.4) 86.18%)
  box-shadow: 0px 6px 12px rgba(8, 35, 48, 0.14), 0px 16px 24px rgba(8, 35, 48, 0.08)
  z-index: 150

  &.active
    left: 0

.menu
  position: fixed
  top: 0
  left: -9999px
  height: 100vh
  min-width: 50%
  transition: 0.3s
  overflow-y: auto
  background-color: $White
  z-index: 150
  box-shadow: 0px 6px 12px rgba(8, 35, 48, 0.14), 0px 16px 24px rgba(8, 35, 48, 0.08)

  .login
    display: grid
    grid-gap: .5rem
    padding: 1rem
    justify-items: end
    .lk
      font-size: 14px
      display: grid
      grid-gap: 1rem
      grid-template-columns: 1fr auto
      color: $Red
    .user
      display: grid
      grid-gap: .5rem
      grid-template-columns: 1fr auto
      height: 48px
      align-items: center
      .text
        grid-gap: 0.5rem
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
      button
        border: none
        background-color: inherit


  .in
    display: none
    width: 100%
    background: rgba(0, 57, 166, 0.05)
    justify-items: center
    align-items: center
    @media screen and ( max-width: $PhoneWidth )
      display: grid
    a
      padding: .5rem
      display: block
      text-align: center
      text-decoration: none
    .sign
      color: $Blue
      font-size: 18px
    .reg
      color: $Red
      font-size: 20px
      text-decoration: underline

  .logo
    align-self: start
    padding: 1rem 2rem
    grid-template-columns: 4.5rem 1fr auto
    background: rgba(0, 57, 166, 0.2)
    .brand-blue
      +afs(24px,24px,18px)
    .x
      font-size: 2rem
      color: $Blue
      margin-left: 1rem
      cursor: pointer
    @media screen and ( max-width: 400px )
      .brand-red
        display: none


  .contact
    display: none
    align-self: start
    align-items: center
    justify-items: start
    grid-gap: 1rem
    padding: 0rem 0rem 2rem 2rem
    @media screen and ( min-width: $TableWidth ) and ( max-width: $SmDesktopWidth )
      display: grid
    @media screen and ( max-width: 710px )
      display: grid
    .item
      display: grid
      grid-template-columns: auto auto
      align-items: center
      grid-gap: 1rem
      white-space: nowrap
      +afs(16px, 14px, 12px)
      a
        color: $Blue
        text-decoration: none

  &.active
    left: 0

  .ul
    display: grid
    grid-template-columns: 1fr 1fr
    grid-gap: 1rem
    @media screen and ( max-width: $TableWidth )
      grid-template-columns: 1fr

  ul, ul.extra-menu
    padding: 0
    margin: 0
    list-style: none
    margin-bottom: 3rem
    padding: 0rem 1rem
    li
      a
        display: block
        padding: 0.5rem 1rem
        transition: 0.3s
        text-decoration: none
        color: $Black
        &:hover, &.active
          color: $Red
  ul.extra-menu
    display: none
    @media screen and (max-width: $TableWidth)
      display: block

  .post
    text-transform: none
    li:first-child
      padding: 0.5rem 1rem
      color: $Blue
      text-transform: uppercase
      font-weight: 500
</style>
