<template lang="pug">
.sort-bar
  .title
    .text {{GG_SORT_BUTTONS}}
    button
  .sort-buttons
    button(
      v-for="(button, index) in buttons"
      :key="index"
      :class="{'active': button.isActive}"
      @click="$emit('click', button.value, index)"
    ) {{ button.name }}
</template>

<script>
import { mapGetters } from "vuex";
export default {
  props: {
    buttons: Array
  },
  // buttons == [{
  // name: String,
  // isActive: Boolean
  // }]
  computed: {
    ...mapGetters("staticData", ["GG_SORT_BUTTONS"])
  }
};
</script>

<style lang="sass">
.sort-bar
  display: flex
  flex-direction: column
  margin: 2rem 0rem
  height: auto
  width: 100%

  .title
    display: flex
    height: 21px
    width: auto

    .text
      height: 100%
      font-family: Gotham Pro
      font-style: normal
      font-weight: normal
      font-size: 22px
      line-height: 21px

    button
      height: 100%
      border: none
      background-color: inherit
      background-image: url("../../assets/sort.svg")
      background-repeat: no-repeat
      background-position: center
      background-clip: border-box
      background-size: contain

  .sort-buttons
    margin-top: 5%
    width: 100%
    height: auto
    display: flex
    flex-direction: row
    flex-flow: wrap
    justify-content: flex-start
    @media screen and (max-width: $PhoneWidth)
      justify-content: space-between
    @media screen and (max-width: 480px)
      flex-direction: column

    button
      padding: 1rem
      background: $White
      margin-right: 1rem
      border: 2px solid #F3F3F3
      box-sizing: border-box
      border-radius: 10px
      +afs(22px,20px,18px)
      text-align: center
      color: #999A9B
      @media screen and (max-width: $PhoneWidth)
        margin: 0px
        margin-bottom: 1rem

      &.active
        color: #0039A6
        border: 2px solid #0039A6
</style>
