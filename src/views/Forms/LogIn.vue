<template lang="pug">
form-layout(:dialogue="LOG_IN.dialogue" :nameForm="nameForm")
  .content(slot="content")
    .text
      .new {{LOG_IN.questionNewUser}}
      router-link.reg(to="SignUp") {{LOG_IN.buttonNameSignUp}}

    gg-input-validate(:error="$v.loginEmail")
      gg-input(
        v-model.trim="loginEmail"
        :label="LOG_IN.emailPlaceholder"
        type="email"
        name="email"
      )

    gg-input-validate(:error="$v.loginPassword")
      gg-input(
        v-model="loginPassword"
        :label="LOG_IN.passwordPlaceholder"
        type="password" 
        icon="far fa-eye-slash" 
        iconReverse="far fa-eye"
        name="password"
      )

    router-link.fogotPassword(to="ForgotPassword1") {{LOG_IN.buttonNameForgotPassword}}
    gg-button(color="red" @click.prevent="submittingForm") {{LOG_IN.buttonNameSignIn}}
  router-link.bottom(to="Policy" slot="bottom") {{LOG_IN.buttonNamePrivacyPolicy}}
</template>

<script>
import GgInput from "@/components/Base/GgInput";
import GgButton from "@/components/Base/GgButton";
import GgInputValidate from "@/components/ErrorHandler/GgInputValidate";

import { validationMixin } from "vuelidate";
import { required, minLength } from "vuelidate/lib/validators";
import { mapGetters } from "vuex";

import ApiService from "../../model/ApiService";

const KEY_COMPONENT = "Component: LogIn";
export default {
  mixins: [validationMixin],
  name: "log-in",
  data() {
    return {
      nameForm: "logIn",
      dialogue: {
        theme: "Войти",
        button: "Войти"
      },
      loginEmail: "",
      loginPassword: ""
    };
  },
  computed: {
    ...mapGetters("staticData", ["LOG_IN"])
  },
  components: {
    GgInput,
    GgInputValidate,
    GgButton
  },
  validations: {
    loginEmail: {
      required,
      valid(value) {
        const reg = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
        return reg.test(value);
      }
    },
    loginPassword: {
      required,
      minLength: minLength(8)
    }
  },
  methods: {
    /**
     * Если данные коректны отправляем их на сервер
     */
    submittingForm(e) {
      e.preventDefault();
      this.$v.$touch();

      const home = { name: "Home" };
      const confirmEmail = { name: "Email", params: { page: "confirm" } };

      if (!this.$v.$invalid) {
        this.$store
          .dispatch("userInformation/logIn", document.forms[this.nameForm])
          .then(flag => {
            switch (flag) {
              case "":
                this.$router.push(home);
                break;
              case ApiService.ERROR.NOT_ACCESS_EMAIL:
                this.$router.push(confirmEmail);
                break;
              case ApiService.ERROR.USER_IS_NOT_FOUND:
                alert("Пользователь не найден");
                break;
              case ApiService.ERROR.PASSWORD_IS_NOT_MATCH:
                alert("Пароль введен неправильно");
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
  }
};
</script>

<style lang="sass" scoped>
.dialogue
  height: 100vh
  padding: 0
</style>
