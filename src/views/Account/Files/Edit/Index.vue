<template lang="pug">
component(:is="editComponent" v-if="EDIT_LOADED")
</template>

<script>
import { mapGetters } from "vuex";
export default {
  computed: {
    ...mapGetters("accountFiles", ["EDIT_LOADED", "EDIT_ITEM"]),

    editComponent() {
      return "edit-" + this.EDIT_ITEM;
    }
  },

  components: {
    "edit-news": () => import("./News"),
    "edit-video": () => import("./Video")
  }
};
</script>

<style lang="sass" scoped>
/deep/ .account-item-header
  @media screen and (max-width: $TableWidth)
    padding-top: 400px
    padding-left: 0
/deep/ .title-edit
  margin-left: 5rem
</style>
