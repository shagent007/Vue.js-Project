<template lang="pug">
.GgTextArea
  .my_text_area(:class="{'active' : isActive}")
    label {{ label ? label : "" }}
    textarea(ref="textarea" :placeholder="placeholder",  @focus="onFocus" ,@blur="onBlur" @input="$emit('input', $event.target.value)" :name="name")
    .svg(ref="icon" v-if="icon" @click="Reverse()")
      i(:class="icon" )
    .devider
</template>

<script>
export default {
  name: "gg-text-area",
  props: {
    placeholder: String,
    label: String,
    icon: String,
    name: String
  },
  data() {
    return {
      isActive: false
    };
  },
  methods: {
    onFocus() {
      this.isActive = true;
    },
    onBlur() {
      if (!this.$refs.textarea.value) this.isActive = false;
    }
  }
};
</script>

<style lang="sass" scoped>
.my_text_area
  position: relative
  +afs(18px,16px,12px)

textarea
  background-color: transparent
  resize: none
  width: 100%
  color: $Black
  outline: none
  border: none
  min-height: 10rem
  border-bottom: 1px solid $Black
  position: relative
  box-sizing: border-box

.svg
  position: absolute
  right: 0
  bottom: 3px

.devider
  position: absolute
  bottom: 3px
  left: 0
  height: 1px
  width: 0%
  transition: .3s
  background-color: $Blue


.my_text_area.active
  textarea
    border-bottom-color: transparent
  .devider
    width: 100%
</style>
