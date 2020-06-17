<template lang="pug">
.functional-wrapper
  .account-item-header
    component(:is="page") 
</template>

<script>
import { mapGetters } from "vuex";
export default {
  name: "functional",

  data() {
    return {
      page: "trainerMentor"
    };
  },

  components: {
    partipicant: () => import("./Participant.vue"),
    trainerMentor: () => import("./TrainerMentor.vue")
  },

  mounted() {
    if (this.getIsTrainer || this.getIsMentor) this.page = "trainerMentor";
    else this.page = "partipicant";
  },

  computed: {
    ...mapGetters("userInformation", ["getIsTrainer", "getIsMentor"])
  }
};
</script>

<style lang="sass" scoped>
.functional-wrapper
  width: 100%
  padding-bottom: 10px
</style>
