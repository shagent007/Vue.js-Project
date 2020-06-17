<template lang="pug">
.input-wrap
  .input(:class="{'active' : isActive, 'light': light}")
    label.label(v-if="label") {{label}}

    input.input__input(
      :style="{borderBottomStyle: borderType}"
      ref="input"
      :list="list"
      :type="type"
      @focus="onFocus"
      @blur="onBlur"
      @input="$emit('input', $event.target.value)"
      :value="value"
      :name="name"
      :placeholder="placeholder"
    )

    .svg(ref="icon" v-if="icon" @click="Reverse()")
      i(:class="icon" )
    .svg(ref="iconReverse" v-if="iconReverse" @click="Reverse()"  style="display: none;")
      i(:class="iconReverse")
    .underline(:class="{'active' : isActive}")
</template>

<script>
export default {
  name: "my-input",
  props: {
    label: String,
    type: {
      type: String,
      default: "text"
    },
    borderType: {
      type: String,
      default: "solid"
    },
    icon: String,
    list: String,
    value: String,
    light: Boolean,
    iconReverse: String,
    name: String,
    placeholder: String
  },
  data() {
    return {
      title: "Поиск",
      isActive: false,
      counter: 0
    };
  },
  methods: {
    onFocus() {
      this.isActive = true;
    },
    onBlur() {
      if (!this.$refs.input.value) this.isActive = false;
    },
    Reverse() {
      this.$refs.input.focus();

      if (this.counter % 2 == 0) {
        this.$refs.input.type = "text";
        this.$refs.iconReverse.style.display = "block";
        this.$refs.icon.style.display = "none";
      } else {
        this.$refs.input.type = "password";
        this.$refs.iconReverse.style.display = "none";
        this.$refs.icon.style.display = "block";
      }
      this.counter++;
    }
  },
  mounted() {
    if (this.$refs.input._value) this.isActive = true;
  },
  beforeUpdate() {
    if (this.$refs.input._value) this.isActive = true;
  },
  updated() {
    if (this.$refs.input._value) this.isActive = true;
  }
};
</script>

<style lang="sass" scoped>
.input
  position: relative
  width: 100%
  height: 1rem
  z-index: 50
  margin-top: 1rem
  +afs(18px,16px,12px)
  .svg
    position: absolute
    bottom: 3px
    right: 0
    cursor: pointer
    z-index: 60


  label
    position: absolute
    bottom: 3px
    left: 0
    z-index: 0
    transition: 0.3s

  input
    bottom: 0
    left: 0
    position: absolute
    background-color: transparent
    z-index: 10
    border: none
    outline: none
    width: 100%
    border-bottom-width: 1px
    border-bottom-color: $Black

  .underline
    position: absolute
    bottom: -1px
    left: 0
    width: 0%
    height: 1px
    transition: .3s
    background-color: $Blue
    z-index: 0

  &.active
    label
      transition: 0.3s
      bottom: 1.3rem
      +afs(14px,12px,12px)
      color: #747474
    input
      border-bottom-width: 0px
    .underline
      width: 100%
    .svg
      color: $Blue

  &.light
    label
      color: #eee
    input
      border-bottom-color: $White
      color: $White
    &.active
      input
        border-bottom-color: transparent

// при авто-заполнении webkit заполняет background синим
// цветом и убрать его нельзя, поэтому заменил на белый

.input__input:-internal-autofill-selected
  box-sizing: border-box
  box-shadow: inset 0 0 0 1px rgba(255, 255, 255, 0), inset 0 0 0 100px white
  background-color: transparent !important
.input__input:-webkit-autofill,
.input__input:-webkit-autofill:hover,
.input__input:-webkit-autofill:focus
.input__input:-webkit-autofill,
  background: transparent
  box-shadow: inset 0 0 0 1px rgba(255, 255, 255, 0), inset 0 0 0 100px white
</style>
