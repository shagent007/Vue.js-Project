<template lang="pug">
button(
  :disabled="disabled"
  :class="['color_' + color, { reverse, transparent }, 'trans']"
  @click="handleClick($event)"
)
  span.button-text
    slot
</template>

<script>
export default {
  props: {
    color: {
      type: String,
      default: "white"
    },
    reverse: {
      type: Boolean,
      default: false
    },
    transparent: {
      type: Boolean,
      default: false
    },
    disabled: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    handleClick(event) {
      if (!this.disabled) {
        this.$emit("click", event);
      }
    }
  }
};
</script>

<style lang="sass" scoped>
.color_
  &red, &deepRed
    background-color: $Red
    border-color: $Red
  &blue
    background-color: $Blue
    border-color: $Blue
  &grey
    background-color: $Grey
    border-color: $Grey
  &black
    background-color: $Black
    border-color: $Black

.reverse.color_

  &red,
  &deepRed,
  &blue,
  &grey,
  &black
    background-color: $White

  &red, &deepRed
    border-color: $Red
    color: $Red

  &blue
    border-color: $Blue
    color: $Blue

  &grey
    border-color: $Grey
    color: $Grey

  &black
    border-color: $Black
    color: $Black

button

  &:active
    &.color_

      &red,
      &blue,
      &grey,
      &black
        background-color: $White

      &red
        color: $Red

      &blue
        color: $Blue

      &grey
        color: $Grey

      &black
        color: $Black

      &deepRed span
        width: 100%
        height: 100%
        background: rgba(0, 0, 0, 0.2)

    &.reverse.color_

      &red,
      &blue,
      &grey,
      &black,
      &deepRed
        color: $White

      &red
        border-color: $Red
        background-color: $Red

      &blue
        border-color: $Blue
        background-color: $Blue

      &grey
        border-color: $Grey
        background-color: $Grey

      &black
        border-color: $Black
        background-color: $Black

button
  border-width: 4px
  border-style: solid
  color: $White
  cursor: pointer
  +afs(24px, 18px, 16px)
  text-transform: uppercase
  padding: 0
  display: flex
  justify-content: center

  &.trans.transparent
    background-color: inherit
    border: 0

    &:active
      background-color: inherit
      color: inherit

  .button-text
    padding: 5px

button[disabled]
  background-color: $WhiteGrey
  color: $Grey
  border-color: $Grey
  cursor: progress

  &:active
    background-color: $WhiteGrey
    color: $Grey
    border-color: $Grey
    cursor: progress
</style>
