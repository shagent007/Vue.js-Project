<template lang="pug">
form-layout(:dialogue="FOGOT_PASSWORD.dialogue" :nameForm="nameForm")
  .content(slot="content")
    gg-input(:label="FOGOT_PASSWORD.confirmEmailPlaceholder" type="email" v-model="email" name="code")
    gg-button(color="red" @click.prevent="submittingForm") {{ FOGOT_PASSWORD.buttonName2 }}
  .bottom(slot="bottom") {{FOGOT_PASSWORD.confirmEmail}}
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

const KEY_COMPONENT = "Component: forgotPassword2";

export default {
  name: "log-in",
  mixins: [regularsMixin, validationMixin],
  data() {
    return {
      nameForm: "forgotPassword2",
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
      //this.$v.$touch();
      const forgotPassword3 = { name: "ForgotPassword3" };

      //if (!this.$v.$invalid) {
      this.$store
        .dispatch(
          "userInformation/sendingCodeFromLetter",
          document.forms[this.nameForm]
        )
        .then(flag => {
          switch (flag) {
            case "":
              this.$router.push(forgotPassword3);
              break;
            case ApiService.ERROR.INCORRECT_CODE:
              alert("Неверный пароль");
              break;
            default:
              console.group(KEY_COMPONENT);
              console.info("Не обработанная ошибка");
              console.log(flag);
              console.groupEnd();
          }
        });
    }
  },
  validations: {
    email: {
      required
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
