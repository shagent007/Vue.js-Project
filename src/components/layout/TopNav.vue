<template lang="pug">
  .topnav
    .container
      .left
        .content
          .item
            img(src="@/assets/social/telephone.svg", alt="alt")
            a(href="tel:+7495777777").text
              | {{TOP_NAV.contactInformation.telephoneNumber}}
          .item
            img(src="@/assets/social/email.svg", alt="alt")
            a(href="mailto:100days@mail.ru").text
              | {{TOP_NAV.contactInformation.email}}

      .center
        form
          input(type="text" disabled :placeholder="TOP_NAV.inputPlaceHolder")
          img(src="@/assets/ui/search-white.svg")

      .right
        .social
          router-link(to="/")
            img(src="@/assets/social/vk.svg")
          router-link(to="/")
            img(src="@/assets/social/youtube.svg")
          router-link(to="/")
            img(src="@/assets/social/facebook.svg")
          router-link(to="/")
            img(src="@/assets/social/yandex_zen.svg")
          router-link(to="/")
            img(src="@/assets/social/instagram.svg")
          router-link(to="/")
            img(src="@/assets/social/telegram.svg")
        .lang
          span.item(role="button") {{TOP_NAV.languages.first}}
          .item
          span.item(role="button") {{TOP_NAV.languages.second}}
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "top-nav",
  computed: {
    ...mapGetters("staticData", ["TOP_NAV"])
  }
};
/* eslint-disable */
</script>

<style lang="sass" scoped>
::placeholder
  color: #fff

.topnav
  align-items: center
  display: flex
  background-color: $Blue
  color: $White
  padding: 10px 0rem
  font-size: $font14

  a
    color: $White
    text-decoration: none

  .container
    display: flex
    justify-content: space-between

    .left
      display: flex
      justify-items: flex-start

      .content
        margin: 0
        display: flex
        align-items: center
        justify-content: space-between

      .item
        display: flex
        align-items: center
        white-space: nowrap
        img
          margin-right: .5rem
        &:nth-child(1)
          margin-right: 1rem

    .center
      display: flex
      align-items: flex-center
      width: 100%
      padding: 0rem 2rem
      form
        align-items: center
        position: relative
        width: 100%
        input
          border: none
          outline: none
          padding: 5px
          border-bottom: 1px solid $White
          background-color: transparent
          width: 100%
          color: $White

        img
          position: absolute
          top: 1px
          right: -5px
          cursor: pointer

    .right
      display: flex
      align-items: center
      justify-self: flex-end

      .social
        display: flex
        align-items: center
        justify-items: center
        margin-right: 1rem
        img
          margin-right: 0.5rem
        @media screen and ( max-width: $PhoneWidth )
          grid-gap: .5rem


        a
          display: flex
          align-items: center
          justify-content: flex-center


      .lang
        display: flex
        justify-content: flex-center
        align-items: center

        span
          cursor: pointer
          color: $White
          text-decoration: none

        .item:nth-child(2)
          width: 100%
          height: 100%
          position: relative
          margin: 0px 5px

          &:before
            position: absolute
            top: -10%
            left: 50%
            content: ''
            width: 1.5px
            height: 120%
            background-color: $White

    @media screen and (min-width: $TableWidth) and (max-width: $SmDesktopWidth)
      grid-template-columns: 1fr auto
      .left
        display: none
    @media screen and (max-width: $TableWidth)
      grid-template-columns: auto auto
      .center
        display: none
    @media screen and (max-width: 720px)
      display: block
      .left
        display: none
      .right
        display: flex
        justify-content: space-between
</style>
