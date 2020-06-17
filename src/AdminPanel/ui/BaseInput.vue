<template lang="pug">
.ap-input 
  label.ap-input__label {{ label }}
    input.ap-input__input(
      :value="value"
      :type="type"
      :placeholder="placeholder"
      @input="$emit('change', $event.target.value)"
    )
</template>

<script>
export default {
  model: {
    prop: "value",
    event: "change"
  },
  props: {
    label: String,
    value: String,
    placeholder: String,
    type: {
      type: String,
      default: "text"
    }
  },
  data() {
    return {
      input: ""
    };
  }
};
</script>

<style lang="sass" scoped>
.ap-input
  display: inline-block

.ap-input, .ap-input__input
  border-radius: 10px

.ap-input__label
  font-weight: bold

  display: flex
  flex-flow: column nowrap

.ap-input__input
  padding: 1rem 2rem
  margin: 1rem 0 0

  font-size: 16px

  border: none

  background-color: #E3EDF7
  box-shadow: 4px 2px 10px rgba(136, 165, 191, 0.54), -5px -3px 12px #FFFFFF

.ap-input__input:focus
  box-shadow: inset 3px 3px 7px rgba(136, 165, 191, 0.6), inset -3px -3px 7px #FFFFFF
  outline: none
</style>
