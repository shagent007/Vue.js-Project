<template lang="pug">
.content.BottomButtons
  gg-button.button(color="black") Удалить {{ type }}
  gg-button.button(
    @click="$emit('save')"
    color="red"
  ) Сохранить изменения
</template>

<script>
import GgButton from "@/components/Base/GgButton";
export default {
  props: {
    type: String
  },

  components: {
    GgButton
  }
};
</script>

<style lang="sass">
.content
  display: flex
  justify-content: space-between
  margin: 2rem

  @media screen and (max-width: $TableWidth)
    justify-content: flex-start
    flex-flow: column nowrap

  .button
    @media screen and (max-width: $TableWidth)
      width: fit-content
      padding: 0 2rem
      margin-top: 1rem
</style>
