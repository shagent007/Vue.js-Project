<template lang="pug">
form-layout(:dialogue="FOGOT_PASSWORD.dialogue" :nameForm="nameForm")
  .content(slot="content")
    gg-input-validate(:error="$v.email")
      gg-input(:label="FOGOT_PASSWORD.emailPlaceholder" type="email" v-model="email" name="email")
    gg-button(color="red" @click.prevent="submittingForm") {{ FOGOT_PASSWORD.buttonName1 }}
  .bottom(slot="bottom") {{FOGOT_PASSWORD.informationForgotPasswordFirst}}
</template>

<script>
import GgInput from "@/components/Base/GgInput";
import GgButton from "@/components/Base/GgButton";
import GgInputValidate from "@/components/ErrorHandler/GgInputValidate";

import regularsMixin from "@/mixins/regularsMixin.js";
import { validationMixin } from "vuelidate";
import { required } from "vuelidate/lib/validators";

import { mapGetters } from "vuex";
import ApiService from "../../model/ApiService";

const KEY_COMPONENT = "Component: forgotPassword1";

export default {
  name: "log-in",
  mixins: [regularsMixin, validationMixin],
  data() {
    return {
      nameForm: "forgotPassword1",
      dialogue: {
        theme: "ВОССТОНОВЛЕНИЕ ПАРОЛЯ",
        button: "Войти"
      },
      email: ""
    };
  },
  computed: {
    ...mapGetters("staticData", ["FOGOT_PASSWORD"])
  },
  components: {
    GgInput,
    GgInputValidate,
    GgButton
  },
  methods: {
    submittingForm(e) {
      e.preventDefault();
      this.$v.$touch();

      const forgotPassword2 = { name: "ForgotPassword2" };

      if (!this.$v.$invalid) {
        this.$store
          .dispatch(
            "userInformation/passwordRecovery",
            document.forms[this.nameForm]
          )
          .then(flag => {
            switch (flag) {
              case "":
                this.$router.push(forgotPassword2);
                break;
              case ApiService.ERROR.EMAIL_NOT_FOUND:
                alert("email не зарегестрирован");
                break;
              default:
                console.group(KEY_COMPONENT);
                console.info("Не обработанная ошибка");
                console.log(flag);
                console.groupEnd();
            }
          });
      }
    }
  },
  validations: {
    email: {
      required,
      valid(value) {
        return this.regularEmail.test(value);
      }
    }
  }
};
</script>

<style lang="sass" scoped>
.dialogue
  height: 100vh
  padding: 0
.dialogue
  height: 100vh
  padding: 0
.content
  grid-gap: 2rem !important
</style>
