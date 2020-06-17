<template lang="pug">
.AdminPanel
  .AdminPanel__layer

  template(v-if="getIsAdmin")
    admin-layout
      router-view

  template(v-else)
    login-page
</template>

<script>
import AdminLayout from "@/AdminPanel/layout";
import LoginPage from "@/AdminPanel/views/Login";

import { mapGetters } from "vuex";
export default {
  components: {
    AdminLayout,
    LoginPage
  },
  computed: {
    ...mapGetters("userInformation", ["getIsAdmin"])
  }
};
</script>

<style lang="sass">
@import "./setting.sass"
@import "./fonts/stylesheet.css"

.AdminPanel
  color: #31456A

.AdminPanel__layer
  z-index: -1
  position: fixed
  height: 100vh
  width: 100vw
  background: linear-gradient(180deg, #F0F4F7 0%, #DCE6F2 48.96%, #F3FAFF 100%)

.AdminPanel, button
  font-family: Montserrat
</style>
