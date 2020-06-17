<template lang="pug">
main-layout
  .container
    form.feedback(:name="nameForm")
      h1 {{FEEDBACK.title}}
      gg-input-validate.field(:error="$v.name")
        label.field__input-label {{ FEEDBACK.name }}
          gg-input.field__input-input(v-model="name" placeholder="Имя" name="name")
        img.field__icon(src="@/assets/ui/card-people-info.svg")

      gg-input-validate.field(:error="$v.email")
        label.field__input-label {{ FEEDBACK.email }}
          gg-input.field__input-input( v-model="email" placeholder="info@стратегия.рф" name="email")
        img.field__icon(src="@/assets/ui/card-people-mail.svg")

      gg-input-validate.field(:error="$v.theme" )
        label.field__input-label {{ FEEDBACK.theme }}
          gg-input.field__input-input( v-model="theme" placeholder="Тема сообщения" name="topic")
        img.field__icon(src="@/assets/ui/burger.svg")

      gg-input-validate.field(:error="$v.phone" )
        label.field__input-label {{ FEEDBACK.phone }}
          gg-input.field__input-input( v-model="phone" placeholder="+7-987-654-32-10" name="phone")
        img.field__icon(src="@/assets/ui/phone.svg")

      gg-input-validate.field(:error="$v.message" )
        label.field__input-label {{ FEEDBACK.message }}
          gg-text-area( v-model="message" placeholder="Текст сообщения" name="text")

      .button
        gg-button.send-button(color="black" @click="submitForm")
          span.span.send {{FEEDBACK.button}}
          i.fas.fa-paper-plane

</template>

<script>
import GgButton from "@/components/Base/GgButton";
import GgInput from "@/components/Base/GgInput";
import GgTextArea from "@/components/Base/GgTextArea";
import GgInputValidate from "@/components/ErrorHandler/GgInputValidate";

import { validationMixin } from "vuelidate";
import { required } from "vuelidate/lib/validators";

import { mapGetters } from "vuex";
const KEY_COMPONENT = "feedback";

export default {
  mixins: [validationMixin],
  components: {
    GgInputValidate,
    GgInput,
    GgTextArea,
    GgButton
  },
  data() {
    return {
      nameForm: "feedback",
      name: "",
      email: "",
      message: "",
      phone: "",
      theme: ""
    };
  },
  validations: {
    name: { required },
    email: { required },
    message: { required },
    phone: { required },
    theme: { required }
  },
  computed: {
    ...mapGetters("staticData", ["FEEDBACK"])
  },
  methods: {
    submitForm(e) {
      e.preventDefault();
      this.$v.$touch();

      const home = { name: "Home" };

      if (!this.$v.$invalid) {
        this.$store
          .dispatch("feedback/feedback", document.forms[this.nameForm])
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
      }
    }
  }
};
</script>

<style lang="sass">
.feedback
  display: grid
  grid-template-columns: 1fr
  grid-gap: 2rem
.send-button .span.send
  padding-right: 1rem
.button
  display: flex
  justify-content: flex-end
  @media screen and (max-width: $PhoneWidth)
    justify-content: center
    width: 100%

.field
  display: flex
  align-items: flex-end
.field__input-label
  width: 100%
.field__input-input
  padding: 0
  box-sizing: border-box
.field__icon
  height: 20px
  padding-right: 10px
  order: -1
</style>
