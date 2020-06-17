<template lang="pug">
.wrapper
    .theme {{CONFIRM.title}}
    img(src="@/assets/img/confirm.jpg", alt="alt" slot="content") 
    .text {{CONFIRM.text.start}} {{email}} {{CONFIRM.text.end}}
    button.blue(@click.prevent="confirmAgain") {{CONFIRM.blue}}
</template>

<script>
import { mapGetters, mapState } from "vuex";
const userInformation = "userInformation";
const staticData = "staticData";

const KEY_COMPONENT = "Confirm";
export default {
  name: "confirm",
  computed: {
    ...mapGetters(staticData, ["CONFIRM"]),
    ...mapState(userInformation, ["email"])
  },
  methods: {
    confirmAgain(e) {
      e.preventDefault();
      const nameMethod = "confirmAgain";
      this.$store.dispatch("userInformation/sendingConfirmAgain").then(flag => {
        switch (flag) {
          case "":
            this.accessEmail();
            break;
          default:
            console.group(KEY_COMPONENT);
            console.info(nameMethod + " Не обработанная ошибка");
            console.log(flag);
            console.groupEnd();
        }
      });
    },
    accessEmail() {
      const nameMethod = "accessEmail";
      this.$store.dispatch("userInformation/accessEmail").then(flag => {
        switch (flag) {
          case "":
            this.$router.push("/");
            break;
          default:
            console.group(KEY_COMPONENT);
            console.info(nameMethod + " Не обработанная ошибка");
            console.log(flag);
            console.groupEnd();
        }
      });
    }
  },
  mounted() {
    this.$store.dispatch("userInformation/getOldEmail");
    this.accessEmail();
  }
};
</script>

<style lang="sass" scoped>
.wrapper
    display: grid
    grid-gap: 1rem
    justify-items: center
    img
      width: 50%

.text
    text-align: center
.blue
    cursor: pointer
    border: none
    font-size: inherit
    background: inherit
    text-align:  center
    border-bottom: 1px solid $Blue
    font-style: italic
    color: $Blue
</style>
