<template lang="pug">
button.ap-button(
  :class="{ rounded, 'inner-border': innerBorder, active, disable }"
  @mousedown="active = true"
  @mouseup="active = false"
  @click="$emit('click')"
  :disabled="disable"
)
  .ap-button__text
    slot {{ text }}
</template>

<script>
export default {
  props: {
    rounded: {
      type: Boolean,
      default: false
    },
    innerBorder: {
      type: Boolean,
      default: false
    },
    text: String,
    disable: {
      type: Boolean,
      default: false
    }
  },

  data() {
    return {
      active: false
    };
  }
};
</script>

<style lang="sass" scoped>
.ap-button
  padding: 0
  margin: 0 auto
  background-color: #E3EDF7
  border: 3px solid #E3EDF7
  cursor: pointer
  box-shadow: 4px 2px 10px rgba(136, 165, 191, 0.54), -5px -3px 12px #FFFFFF

.ap-button, .ap-button__text
  border-radius: 10px
  display: flex
  justify-content: center
  width: 100%

.ap-button.rounded, .ap-button.rounded .ap-button__text
  border-radius: 100px

.ap-button:focus
  outline: none

.ap-button.disable
  opacity: 0.6
  box-shadow: none
  border: 1px solid rgba(0, 0, 0, 0.2)

.ap-button.active
  opacity: 0.6
  box-shadow: none

.ap-button.active .ap-button__text
  border-color: inherit
  box-shadow: inset 3px 3px 7px rgba(136, 165, 191, 0.6), inset -3px -3px 7px #FFFFFF

.ap-button.rounded .ap-button__text
  box-sizing: border-box

  text-transform: uppercase
  font-weight: 600
  font-size: 20px
  letter-spacing: 3px

  padding: 1.5rem 3rem

  width: 100%
  height: 100%

.ap-button.inner-border .ap-button__text
  border-width: 1px
  border-style: solid
  border-color: white
</style>
