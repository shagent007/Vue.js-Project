<template lang="pug">
form-layout(:dialogue="FOGOT_PASSWORD.dialogue" :nameForm="nameForm")
  .content(slot="content")
    gg-input(
        :label="FOGOT_PASSWORD.newPasswordPlaceholder"
        type="password"  
        icon="far fa-eye-slash" 
        iconReverse="far fa-eye"
        name="lastPassword"
      )
    gg-input(
        :label="FOGOT_PASSWORD.confirmPasswordPlaceholder"
        type="password" 
        icon="far fa-eye-slash" 
        iconReverse="far fa-eye"
        name="newPassword"
      )
    button.submit(@click.prevent="submittingForm") {{FOGOT_PASSWORD.buttonName3}}
  .bottom(slot="bottom") 
</template>

<script>
import GgInput from "@/components/Base/GgInput";

import { mapGetters } from "vuex";
// import ApiService from "../model/ApiService";

const KEY_COMPONENT = "forgotPassword3";

export default {
  name: "log-in",
  data() {
    return {
      nameForm: "forgotPassword3",
      dialogue: {
        theme: "ВОССТОНОВЛЕНИЕ ПАРОЛЯ",
        button: "Войти"
      }
    };
  },
  computed: {
    ...mapGetters("staticData", ["FOGOT_PASSWORD"])
  },
  components: {
    GgInput
  },
  methods: {
    submittingForm(e) {
      e.preventDefault();
      //this.$v.$touch();

      const home = { name: "Home" };

      //if (!this.$v.$invalid) {
      this.$store
        .dispatch(
          "userInformation/passwordUpdate",
          document.forms[this.nameForm]
        )
        .then(flag => {
          switch (flag) {
            case "":
              this.$router.push(home);
              break;
            default:
              console.group(KEY_COMPONENT);
              console.info("Не обработанная ошибка");
              console.log(flag);
              console.groupEnd();
          }
        });
      //}
    }
  }
};
</script>

<style lang="sass" scoped>
.dialogue
  height: 100vh
  padding: 0
.content
  grid-gap: 2rem !important
</style>
