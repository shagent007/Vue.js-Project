<template lang="pug">
.wrapper
  .theme {{CONFIRMED.title}}
  img(src="@/assets/img/confirmed.jpg", alt="alt" slot="content")  
  gg-button(color="red" @click="push") {{CONFIRMED.button}}
</template>

<script>
import GgButton from "@/components/Base/GgButton.vue";
import { mapGetters } from "vuex";
export default {
  name: "confirmed",
  computed: {
    ...mapGetters("staticData", ["CONFIRMED"])
  },
  methods: {
    push() {
      this.$router.push("/");
    }
  },
  components: { GgButton }
};
</script>

<style lang="sass" scoped>
.wrapper
  display: grid
  grid-gap: 1rem
  justify-items: center
  img
    width: 60%
</style>
