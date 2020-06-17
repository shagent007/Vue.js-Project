<template lang="pug">
main-layout
  .Page404 
    .title {{PAGE_404.title}}
    router-link.btn-grey(to="/") {{PAGE_404.link}}
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "Page404",
  computed: {
    ...mapGetters("staticData", ["PAGE_404"])
  }
};
</script>

<style lang="sass" scoped>
.wrapper
  height: 100vh

.Page404
  background-repeat: no-repeat
  background-size: cover
  background-position-x: center
  background-attachment: fixed
  height: 100vh
  display: grid
  align-items: start
  justify-items: center
  grid-gap: 1rem

  @media screen and (max-width: $TableWidth)
    background-image: url('../../assets/img/404_mobile.jpg')

  @media screen and (min-width: $TableWidth)
    background-image: url('../../assets/img/404.jpg')

.title
  padding: 10px
  background: white
  border-radius: 10px
  border: 4px solid grey

  align-self: end
  font-weight: bold
  +afs(36px,26px,24px)
  text-align: center
  color: #999

.btn-grey
  background: #999999
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.24), 0px 4px 8px rgba(0, 0, 0, 0.16)
  text-decoration: none
  color: #fff
  text-align: center
  font-weight: bold
  +afs(24px,20px, 18px)
  text-shadow: 0px 1px 2px rgba(8, 35, 48, 0.24), 0px 2px 6px rgba(8, 35, 48, 0.16)
  padding: .5rem 2rem
</style>
