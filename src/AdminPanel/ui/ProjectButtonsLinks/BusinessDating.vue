<template lang="pug">

</template>

<script>
import BaseButton from "@/AdminPanel/ui/BaseButton";

export default {
  components: {
    BaseButton
  }
};
</script>

<style lang="sass" scoped>
.MenuItems.fullscreen .Menu__link-container
  flex-flow: row nowrap

.Menu.fullscreen .Menu__link
  width: 50%
  margin: 0 0 1rem

.Menu.fullscreen .Menu__button
  width: 70%

  @media screen and (max-width: $DesktopWidth)
    width: 80%

.Menu__link-container
  text-align: center
  width: 100%
  margin: auto
  display: flex
  flex-flow: column nowrap
  justify-content: center

.Menu__link-container:last-child
  justify-content: flex-start

.Menu__link
  box-sizing: border-box
  padding: 0 1rem 1rem
  width: 100%
  text-align: center
</style>
