<template lang="pug">
main-layout
  .container
    component(:is="currentPage")
</template>

<script>
export default {
  name: "payment",
  data() {
    return {
      currentPage: "method"
    };
  },
  components: {
    method: () => import("./Method.vue"),
    refund: () => import("./Refund.vue")
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
