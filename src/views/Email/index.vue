<template lang="pug">
.dialogue
  form
    component(:is="currentPage")
</template>

<script>
export default {
  name: "e-mail",
  data() {
    return {
      currentPage: "confirm"
    };
  },
  components: {
    confirm: () => import("./Confirm.vue"),
    confirmed: () => import("./Confirmed.vue")
  },
  mounted() {
    this.currentPage = this.$route.params.page;
  },
  watch: {
    $route(to) {
      this.currentPage = to.params.page;
    }
  },
  computed: {
    page() {
      return this.$route.params.page;
    }
  }
};
</script>

<style lang="sass" scoped>
.dialogue
  height: 100vh
  padding: 0
  form
    justify-items: center
</style>
