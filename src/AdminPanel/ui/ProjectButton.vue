<template lang="pug">
.MenuDropDown(:class="{ fullscreen }")
  .Menu__link
    base-button.MenuDropDown(
      @click="$emit('pick')"
      rounded
      innerBorder
      :class="{ active: dropDownActive }"
    )
      span.MenuDropDown__text {{ text }}
      img.MenuDropDown__image(src="@/AdminPanel/assets/chevron-down.svg")
</template>

<script>
import BaseButton from "@/AdminPanel/ui/BaseButton";

export default {
  components: {
    BaseButton
  },

  props: {
    text: {
      type: String,
      required: true
    },

    fullscreen: {
      type: Boolean,
      required: true,
      default: false
    },

    dropDownActive: {
      type: Boolean,
      required: true,
      default: false
    }
  }
};
</script>

<style lang="sass" scoped>
.MenuDropDown.fullscreen .Menu__link-container
  flex-flow: row nowrap

.Menu__link-container
  text-align: center
  width: 100%
  margin: auto
  display: flex
  flex-flow: column nowrap
  justify-content: center

.Menu__link-container:last-child
  justify-content: flex-start

.Menu__link
  box-sizing: border-box
  padding: 0 1rem 1rem
  width: 100%
  text-align: center

.MenuDropDown
  position: relative

.MenuDropDown__image
  padding: 0 20px 0 0

.MenuDropDown.active .MenuDropDown__image
  transform: rotateX(180deg)
</style>
