<template lang="pug">
form-layout(:dialogue="SIGN_UP.dialogue" :nameForm="nameForm")
  .content(slot="content")
    .text
      .new {{SIGN_UP.isLogIn}}
      router-link.reg(to="LogIn") {{SIGN_UP.logIn}}

    gg-input-validate(:error="$v.signUpForm.email")
      gg-input(
        :label="SIGN_UP.email"
        type="email"
        v-model.trim="signUpForm.email"
        name="email"
      )
    
    .group-2
      gg-input-validate(:error="$v.signUpForm.firstName")
        gg-input(
          :label="SIGN_UP.name"
          v-model.trim="signUpForm.firstName"
          name="firstName"
        )
        
      gg-input-validate(:error="$v.signUpForm.lastName")
        gg-input(
          :label="SIGN_UP.surName"
          v-model.trim="signUpForm.lastName"
          name="lastName"
        )
  
    .group
      gg-input-validate(:error="$v.signUpForm.gender")
        gg-select(
          MyId="selectGender"
          :options="SIGN_UP.gender.genderOptions"
          :label="SIGN_UP.gender.name"
          v-model.trim="signUpForm.gender"
          name="gender"
        )

    gg-input-validate(:error="$v.signUpForm.password")
      gg-input(
          :label="SIGN_UP.password" 
          type="password" 
          icon="far fa-eye-slash" 
          iconReverse="far fa-eye"
          v-model.trim="signUpForm.password"
          name="password"
        )

    gg-input-validate(:error="$v.signUpForm.repeatedPassword")
      gg-input(
        :label="SIGN_UP.passwordConfirm"
        type="password"
        icon="far fa-eye-slash"
        iconReverse="far fa-eye"
        v-model.trim="signUpForm.repeatedPassword"
        name="repeatedPassword"
      )

    .group
      .label {{SIGN_UP.date.label}}
    .group-3
        gg-input-validate(:error="$v.signUpForm.birthDay")
          gg-select(
            MyId="selectDay" 
            :options="days" 
            :label="SIGN_UP.date.day" 
            v-model="signUpForm.birthDay"
            name="dayBirth"
          )

        gg-input-validate(:error="$v.signUpForm.birthMonth") 
          gg-select(
            MyId="selectMonth"
            :options="months"
            :label="SIGN_UP.date.month"
            v-model="signUpForm.birthMonth"
            name="monthBirth"
          )
        
        gg-input-validate(:error="$v.signUpForm.birthYear")
          gg-select(
            MyId="selectYear"
            :options="years"
            :label="SIGN_UP.date.year"
            v-model="signUpForm.birthYear"
            name="yearBirth"
          )

    .group
      .label {{SIGN_UP.location.label}}

      gg-input-validate(:error="$v.signUpForm.country")
        gg-select(
          @click="getCountry"
          MyId="selectCountry"
          :options="countries"
          :label="SIGN_UP.location.country"
          v-model.trim="signUpForm.country"
          name="country"
        )

      .group-2
        gg-input-validate(:error="$v.signUpForm.region")
          gg-select(
            @click="getRegion"
            MyId="selectTown"
            :options="regions"
            :label="SIGN_UP.location.region"
            v-model.trim="signUpForm.region"
            name="region"
          )

        gg-input-validate(:error="$v.signUpForm.town")
          gg-select(
            @click="getCity"
            MyId="selectCountry12"
            :options="cities"
            :label="SIGN_UP.location.town"
            v-model.trim="signUpForm.town"
            name="city"
          )

       

    .group
      .label {{SIGN_UP.role.label}}
      gg-input-validate(:error="$v.signUpForm.representative")
        gg-options(
          :options="roles"
          :placeholder="SIGN_UP.role.rank"
          v-model="signUpForm.representative"
          name="role"
        )
      
    .checkbox
      gg-input-validate(:error="$v.signUpForm.privacyPolicy")
        input#privacyPolicyCheckbox(type='checkbox' v-model="signUpForm.privacyPolicy")
        label(
          for='privacyPolicyCheckbox'
          tabindex="0"
          @keyup.space="signUpForm.privacyPolicy = !signUpForm.privacyPolicy"
        ) {{SIGN_UP.acceptPolicy}}

    gg-button(
      color="red" 
      @click.prevent="submittingForm"
      :disabled="sendRequestRegistration"
    ) {{SIGN_UP.reg}}
  router-link.bottom(to="Policy" slot="bottom") {{SIGN_UP.privacyPolicy}}
</template>

<script>
import GgInput from "@/components/Base/GgInput";
import GgSelect from "@/components/Base/GgSelect";
import GgOptions from "@/components/Base/GgOptions";
import GgInputValidate from "@/components/ErrorHandler/GgInputValidate";
import GgButton from "@/components/Base/GgButton";

import regularsMixin from "@/mixins/regularsMixin.js";
import { validationMixin } from "vuelidate";
import { required, sameAs, minLength } from "vuelidate/lib/validators";

import { mapGetters, mapState } from "vuex";
export default {
  mixins: [validationMixin, regularsMixin],
  name: "log-in",
  data: function() {
    return {
      sendRequestRegistration: false,
      nameForm: "signUp",
      roles: ["Игрок", "Тренер", "Наставник", "Тьютер"],
      countries: ["1", "2", "3"],
      cities: ["1", "2", "3"],
      regions: ["1", "2", "3"],

      months: Array(12)
        .fill()
        .map((_, index) => 1 + index),

      days: Array(31)
        .fill()
        .map((_, index) => 1 + index),

      years: Array(100)
        .fill()
        .map((_, index) => new Date().getFullYear() - index),

      signUpForm: {
        email: "",

        firstName: "",
        lastName: "",

        password: "",
        repeatedPassword: "",

        birthDay: "",
        birthMonth: "",
        birthYear: "",

        country: "",
        town: "",
        region: "",

        gender: "",

        representative: "",
        privacyPolicy: false
      }
    };
  },
  components: {
    GgInput,
    GgSelect,
    GgInputValidate,
    GgButton,
    GgOptions
  },
  computed: {
    ...mapGetters("staticData", ["SIGN_UP"])
    // ...mapGetters("signUp", ["countryList", "citiList", "regionList"])
  },
  validations: {
    signUpForm: {
      email: {
        required,
        valid(value) {
          return this.regularEmail.test(value);
        }
      },
      firstName: {
        required,
        valid(value) {
          return value.replace(this.regularName, "").length === 0;
        }
      },
      lastName: {
        required,
        valid(value) {
          return value.replace(this.regularName, "").length === 0;
        }
      },
      password: {
        required,
        minLength: minLength(8)
      },
      repeatedPassword: {
        required,
        sameAsPassword: sameAs("password")
      },
      birthDay: {
        required,
        valid(value) {
          if (value < 1 || value > 31) return false;
          return !/\D/.test(value);
        }
      },
      birthMonth: {
        required,
        valid(value) {
          if (value < 1 || value > 12) return false;
          return !/\D/.test(value);
        }
      },
      birthYear: {
        required,
        valid(value) {
          if (
            value > this.years[0] ||
            value < this.years[this.years.length - 1]
          )
            return false;

          return !/\D/.test(value);
        }
      },
      country: { required },
      town: { required },
      region: { required },
      representative: { required },
      gender: { required },
      privacyPolicy: {
        required: value => value
      }
    }
  },
  methods: {
    getCountry() {},
    getRegion() {},
    getCity() {},
    submittingForm(e) {
      e.preventDefault();
      //const ERROR_EMAIL_ALREADY_EXIST = "This email already exist!";
      this.$v.$touch();

      if (!this.$v.$invalid) {
        this.sendRequestRegistration = true;
        this.$store
          .dispatch("userInformation/signUp", document.forms[this.nameForm])
          .then(flag => {
            if (flag === "") {
              this.$router.push("/e-mail/confirm");
            } else {
              alert(flag);
              //TODO: валидация
            }
          })
          .catch(err => console.log(err))
          .finally(() => (this.sendRequestRegistration = false));
      }
    }
  }
};
</script>

<style scoped lang="sass">
.checkbox
  position: relative

input[type="checkbox"]
  display: none

.group .label
  padding-bottom: 10px

label
  margin-left: 25px

label:before
  content: ""
  display: inline-block
  width: 16px
  height: 16px
  margin-right: 10px
  position: absolute
  left: 0
  border: 1px solid #0039a6
  border-radius: 3px

input[type="checkbox"]:checked + label:before
  content: "\2713"
  font-size: 15px
  color: #d52b1e
  text-align: center
  line-height: 15px
</style>
