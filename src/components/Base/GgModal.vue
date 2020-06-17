<template lang="pug">
transition(name="modal")
  .wrapper-modal(ref="modal")
    .inner
      .close
        button(@click="$emit('close')") x
      .content
        slot(name="content")
</template>

<script>
export default {
  mounted() {
    setTimeout(() => {
      document.body.addEventListener("click", this.handleClose);
    }, 0);
  },
  methods: {
    handleClose(event) {
      const check = event.path.filter(element => element == this.$refs.modal);
      if (!check.length) {
        document.body.removeEventListener("click", this.handleClose);
        this.$emit("close");
      }
    }
  }
};
</script>

<style lang="sass" scoped>
.modal-enter
  opacity: 0


.modal-leave-active
  opacity: 0


.modal-enter .wrapper-modal,
.modal-leave-active .wrapper-modal
  -webkit-transform: scale(1.1)
  transform: scale(1.1)


.wrapper-modal
  transition: all 0.3s ease
  position: fixed
  padding: 0 20px
  box-sizing: border-box
  z-index: 1000
  background-color: $White
  max-height: 90vh
  max-width: 100vw
  box-sizing: border-box
  display: flex
  right: 24%
  left: 24%
  top: 30px
  overflow: auto

  @media screen and (max-width: $PhoneWidth)
    left: 5%
    right: 5%

  .inner
    margin: auto


.content
  display: flex
  flex-flow: column nowrap
  +afs(1.5rem, 1.2rem, 1rem)

.close
  display: flex
  justify-content: flex-end
  position: sticky
  top: 0
  background: $White
  padding: 10px 0

  button
    line-height: 20px
    border: 0
    background: $White
    font-family: cursive
    font-weight: bold
    font-size: 28px
    color: $Blue
    cursor: pointer

    &:focus
      outline: 0
</style>
