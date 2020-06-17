<template lang="pug">
base-button.ProjectButton(
  rounded
  :disable="pageSelected"
  :class="{ selected }"
)
  span.ProjectButton__text {{ text }}
  img.ProjectButton__icon(src="../assets/chevron-right.svg")
</template>

<script>
import BaseButton from "../ui/BaseButton";

export default {
  components: {
    BaseButton
  },

  props: {
    text: {
      type: String,
      required: true
    },

    selected: {
      type: String,
      required: true
    }
  }
};
</script>

<style lang="sass" scoped>
.ProjectButton.selected .ProjectButton__icon
  transform: rotateX(180deg)
</style>
