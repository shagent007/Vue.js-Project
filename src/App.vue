<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
export default {
  mounted() {
    this.$store.dispatch("userInformation/getOldSession");
  }
};
</script>

<style lang="sass">
@import "./assets/font/stylesheet.css"
</style>
