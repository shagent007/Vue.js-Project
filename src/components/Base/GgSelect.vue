<template lang="pug">
.my_select
  gg-input(
    type='text'
    :list='MyId'
    @input="val => $emit('input', val)"
    :label="label"
    :name="name"
  )
  datalist(:id="MyId")
    option(v-for='(item, index) in options', :value='item', :key='index')

</template>

<script>
import GgInput from "@/components/Base/GgInput";
export default {
  name: "my-select",
  props: {
    name: String,
    options: {
      type: Array,
      required: true
    },
    label: String,
    MyId: {
      type: String,
      required: true
    }
  },
  components: { GgInput }
};
</script>

<style lang="sass" scoped>
.my_select
  margin-bottom: 1rem
  height: auto

input
  width: 100%
  padding: .5rem
  box-sizing: border-box
  outline: none
  border-radius: .5rem
  border: 1px solid $Black
  &:focus
    outline: none
    border-color: $Blue


option
  width: 100%
  color: $Black
  background-color: $White
</style>
