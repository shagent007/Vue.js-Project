<template lang="pug">
.search-bar
  .search
    input.input.search-input(
      :placeholder="placeholder" 
      type="search"
      :value="value"
      @input="$emit('input', $event.target.value)"
    )
    img.search__icon(
      v-if="value.length === 0"
      src="@/assets/ui/search.svg"
      height="30px"
    )
  button.search-bar__button(@click="$emit('search')") 
    span.text {{ textButton }}
    img.icon_button(
      src="@/assets/ui/search.svg"
      height="30px"
    )
</template>

<script>
export default {
  model: {
    prop: "value",
    event: "input"
  },

  props: {
    placeholder: String,
    textButton: String,
    value: String
  }
};
</script>

<style lang="sass" scoped>
.search-bar
  display: flex

  .search
    margin-right: 20px
    position: relative
    z-index: 100
    display: flex
    flex: 1
    background: #C5DDFC
    box-shadow: 0px 6px 12px rgba(8, 35, 48, 0.14), 0px 16px 24px rgba(8, 35, 48, 0.08)
    @media screen and (max-width: $PhoneWidth)
      margin-right: 0px


    input
      width: 100%
      background: #C5DDFC
      border: none
      outline: none
      +afs(24px,20px, 18px)
      padding: 1rem
      line-height: 23px


.search-bar__button
  cursor: pointer
  font-size: 24px
  line-height: 23px
  color: $Black
  outline: none
  border: none
  box-shadow: 0px 6px 12px rgba(8, 35, 48, 0.14), 0px 16px 24px rgba(8, 35, 48, 0.08)
  background: rgba(197, 221, 252, 1)
  padding: 10px

.text
  @media screen and (max-width: $PhoneWidth)
    display: none

.icon_button
  display: none
  @media screen and (max-width: $PhoneWidth)
    display: flex

.search__icon
  position: absolute
  top: 0
  right: 20px
  bottom: 0
  margin: auto
  @media screen and (max-width: $PhoneWidth)
    display: none
</style>
