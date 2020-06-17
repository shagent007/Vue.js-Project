<template lang="pug">
.ap-checkbox(@click="$emit('change', !checked)")

  .ap-checkbox__check
    img(
      v-if="checked"
      src="../assets/checked.svg"
    )

  .ap-checkbox__label {{ label }}
</template>

<script>
export default {
  model: {
    prop: "checked",
    event: "change"
  },

  props: {
    label: String,
    checked: {
      type: Boolean,
      default: false
    }
  }
};
</script>

<style lang="sass" scoped>
.ap-checkbox
  cursor: pointer
  display: flex

.ap-checkbox__check
  width: 1rem
  height: 1rem
  border-radius: 50%
  box-shadow: inset 3px 3px 7px rgba(136, 165, 191, 0.6), inset -3px -3px 7px #FFFFFF

.ap-checkbox__label
  margin-left: 1rem
</style>
