<template lang="pug">
.Login

  .Login__label вход

  form.Login__form.Form
    base-input.Form__input(
      label="Имя пользователя"
      placeholder="Введите ваш логин"
      type="text"
      v-model="inputName"
    )

    base-input.Form__input(
      label="Пароль"
      placeholder="Введите ваш пароль"
      type="password"
      v-model="inputPassword"
    )

    base-checkbox.Form__checkbox(
      label="Запомнить меня"
      :checked="remember"
      v-model="remember"
    )

  base-button.Form__button(
    rounded
    innerBorder

    @click="adminLogin"
  ) Войти
</template>

<script>
import BaseButton from "../ui/BaseButton";
import BaseInput from "../ui/BaseInput";
import BaseCheckbox from "../ui/BaseCheckbox";

import { mapActions } from "vuex";
export default {
  components: {
    BaseButton,
    BaseInput,
    BaseCheckbox
  },

  data() {
    return {
      inputName: "",
      inputPassword: "",
      remember: false
    };
  },

  methods: {
    ...mapActions("userInformation", ["adminLogIn"]),
    adminLogin() {
      this.adminLogIn();
    }
  }
};
</script>

<style lang="sass" scoped>
.Login
  margin: auto auto
  padding: 1rem

  max-width: 400px
  max-height: 100%

  display: flex
  flex-flow: column nowrap
  align-items: center


.Login__form,
.Login__label
  width: 100%

.Login__label
  padding: 1rem 0
  text-transform: uppercase
  font-size: 36px

.Login__form
  display: flex
  flex-flow: column nowrap

.Form__input, .Form__checkbox
  margin: 1rem 0

.Form__button
  margin: 3rem 0
</style>
