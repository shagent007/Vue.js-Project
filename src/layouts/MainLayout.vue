<template lang="pug">
.wrapper
  .MainLayer
    top-nav
    main-header
    slot
    main-footer
    under-footer
</template>

<script>
import TopNav from "@/components/layout/TopNav.vue";
import MainHeader from "@/components/layout/MainHeader.vue";
import MainFooter from "@/components/layout/MainFooter.vue";
import UnderFooter from "@/components/layout/UnderFooter.vue";
export default {
  name: "Home",
  components: {
    MainFooter,
    TopNav,
    MainHeader,
    UnderFooter
  }
};
</script>

<style lang="sass" scoped>
.wrapper
  background-repeat: no-repeat
  background-size: cover
  background-position: center
  background-attachment: fixed
  overflow-x: hidden

  @media screen and (max-width: $TableWidth)
    background-image: url('../assets/img/background720.jpg')

  @media screen and (min-width: $TableWidth)
    background-image: url('../assets/img/background1080.jpg')

  .MainLayer
    background-color: rgba(255, 255, 255, 0.5)

/* контент страницы */
.MainLayer__content
</style>
