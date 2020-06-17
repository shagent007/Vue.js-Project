<template lang="pug">
main-layout
  .container
    .theme {{ACCOUNT_SETTING.title}}
    form(:name="nameForm")
      .theme {{ACCOUNT_SETTING.title}}
      .user
        label.label(@change="changePhoto")
          img(:src="image", alt="alt" id="logo")
          input(type="file" accept="image/*" ref="photo" name="image")
        .text   {{ACCOUNT_SETTING.textPhotoLoader}}

      gg-input-validate(:error="$v.formData.email")
        gg-input(
          :label="ACCOUNT_SETTING.emailPlaceholder"
          type="email"
          v-model="formData.email"
          name="email"
        )

      .group-3
        gg-input-validate(:error="$v.formData.firstName")
          gg-input(
            :label="ACCOUNT_SETTING.firstName" 
            v-model="formData.firstName" 
            name="firstName"
          )

        gg-input-validate(:error="$v.formData.lastName")
          gg-input(
            :label="ACCOUNT_SETTING.secondName" 
            v-model="formData.lastName" 
            name="lastName"
          )

        gg-input-validate(:error="$v.formData.middleName")
          gg-input(
            :label="ACCOUNT_SETTING.patronymic" 
            v-model="formData.middleName" 
            name="middleName"
          )
      
      .group.group-label {{ACCOUNT_SETTING.titleChangePassword}}

      gg-input-validate(:error="$v.formData.oldPassword")
        gg-input(
          :label="ACCOUNT_SETTING.oldPassword"
          type="password" 
          icon="far fa-eye-slash" 
          iconReverse="far fa-eye"
          v-model="oldPassword"
          name="oldPassword"
        )

      gg-input-validate(:error="$v.formData.newPassword")
        gg-input(
          :label="ACCOUNT_SETTING.newPassword"
          type="password" 
          icon="far fa-eye-slash" 
          iconReverse="far fa-eye"
          v-model="newPassword"
          name="newPassword"
        )

      gg-input-validate(:error="$v.formData.newPasswordRepeated")
        gg-input(
          :label="ACCOUNT_SETTING.confirmPassword"
          type="password" 
          icon="far fa-eye-slash" 
          iconReverse="far fa-eye"
          v-model="newPasswordRepeated"
          name="newPasswordRepeat"
        )
      .group.group-label {{ACCOUNT_SETTING.titlePersonalData}}
      .group
          .label {{ACCOUNT_SETTING.titleSex}}
          gg-input-validate(:error="$v.formData.gender")
              gg-select(
                MyId="genderSelect" 
                :options="ACCOUNT_SETTING.genderOptions" 
                :label="ACCOUNT_SETTING.indicateSex" 
                v-model="formData.gender" 
                name="gender"
              )
      .group
        .label {{ACCOUNT_SETTING.dateBirth}}
        .group-3
          gg-input-validate(:error="$v.formData.birthDay")
            gg-select(
              MyId="selectDay" 
              :options="days" 
              :label="ACCOUNT_SETTING.day" 
              v-model="formData.birthDay" 
              name="birthDay"
            )

          gg-input-validate(:error="$v.formData.birthMonth")
            gg-select(
              MyId="selectMonth" 
              :options="ACCOUNT_SETTING.months" 
              :label="ACCOUNT_SETTING.month" 
              v-model="formData.birthMonth" 
              name="birthMonth"
            )

          gg-input-validate(:error="$v.formData.birthYear")
            gg-select(
              MyId="selectYear" 
              :options="years" 
              :label="ACCOUNT_SETTING.year" 
              v-model="formData.birthYear" 
              name="birthYear"
            )

      .group
        .label {{ACCOUNT_SETTING.titleLocation}}
        .group-3
          gg-input-validate(:error="$v.formData.country")
            gg-select(
              MyId="select1" 
              :options="options" 
              :label="ACCOUNT_SETTING.country" 
              v-model="formData.country" 
              name="country"
            )

          gg-input-validate(:error="$v.formData.region")
            gg-select(
              MyId="select1" 
              :options="options" 
              :label="ACCOUNT_SETTING.district" 
              v-model="formData.region" 
              name="region"
            )

          gg-input-validate(:error="$v.formData.city")
            gg-select(
              MyId="select1" 
              :options="options" 
              :label="ACCOUNT_SETTING.city" 
              v-model="formData.city" 
              name="city"
            )
            
      .group
        .label {{ACCOUNT_SETTING.titleRepresentativeRegion}}

        gg-input-validate(:error="$v.formData.spokesman")
          gg-select(
            MyId="selectSpokesman" 
            :options="options" 
            :label="ACCOUNT_SETTING.trainer" 
            v-model="formData.spokesman" 
            name="role"
          )
              
      .group
        gg-text-area(
          placeholder="Напишите о себе" 
          :label="ACCOUNT_SETTING.littleBitAboutYourself"
        )

      .group
        gg-text-area(
          placeholder="Напишите о своих достижениях" 
          :label="ACCOUNT_SETTING.progress"
        )

      gg-button(
        color="red" 
        @click.prevent="submittingForm"
      ) {{ACCOUNT_SETTING.buttonName}}
</template>

<script>
import GgInput from "@/components/Base/GgInput";
import GgTextArea from "@/components/Base/GgTextArea";
import GgButton from "@/components/Base/GgButton";
import GgSelect from "@/components/Base/GgSelect";
import GgOptions from "@/components/Base/GgOptions";
import GgInputValidate from "@/components/ErrorHandler/GgInputValidate";

import regularsMixin from "@/mixins/regularsMixin.js";
import { validationMixin } from "vuelidate";
import { required, sameAs, minLength } from "vuelidate/lib/validators";

import { mapState, mapGetters } from "vuex";
const userInformation = "userInformation";

const KEY_COMPONENT = "AccountSetting";
export default {
  mixins: [validationMixin, regularsMixin],
  name: "account-setting",
  data() {
    return {
      nameForm: "AccountSetting",
      options: ["1", "2", "3", "4"],
      roles: ["Участник", "Тренер", "Наставник"],
      days: new Array(31).fill().map((_, index) => 1 + index),
      years: new Array(100)
        .fill()
        .map((_, index) => new Date().getFullYear() - index),

      fetchedOldPassword: "asdfasdfasdf",

      oldPassword: "",
      newPassword: "",
      newPasswordRepeated: "",

      spokesman: "",

      formData: {
        image: "",
        email: "",
        firstName: "",
        lastName: "",
        middleName: "",
        gender: "",
        birthDay: "",
        birthMonth: "",
        birthYear: "",
        country: "",
        region: "",
        city: ""
      }
    };
  },
  computed: {
    ...mapGetters("staticData", ["ACCOUNT_SETTING"]),
    ...mapGetters("userInformation", ["getAccountInfo"]),
    ...mapState(userInformation, {
      aboutSelf: "aboutUser",
      achivments: "achievements"
    })
  },
  components: {
    GgInput,
    GgSelect,
    GgInputValidate,
    GgButton,
    GgTextArea,
    GgOptions
  },
  methods: {
    changePhoto() {
      let image = document.getElementById("logo");
      image.src = URL.createObjectURL(this.$refs.photo.files[0]);
    },
    submittingForm(e) {
      e.preventDefault();

      this.$v.$touch(); // check all forms

      if (!this.$v.$invalid) {
        this.$store
          .dispatch(
            "userInformation/settingAccount",
            document.forms[this.nameForm]
          )
          .then(flag => {
            switch (flag) {
              case "":
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
    pasteImage(value, index) {
      if (this.profileImages[index] !== undefined) {
        this.profileImages.splice(index, 1, value);
      }
      if (this.profileImages[this.profileImages.length - 1] !== "") {
        this.profileImages.push("");
      }
    }
  },
  validations: {
    formData: {
      email: {
        required,
        valid(value) {
          return this.regularEmail.test(value);
        }
      },
      newPassword: {
        required,
        minLength: minLength(8),
        newPasswordInvalid(value) {
          return !(value === this.oldPassword);
        }
      },
      newPasswordRepeated: {
        required,
        sameAsPassword: sameAs("newPassword")
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
      middleName: {
        required,
        valid(value) {
          return value.replace(this.regularName, "").length === 0;
        }
      },
      oldPassword: {
        required
        // sameAsOldPassword: sameAs("fetchedOldPassword")
      },
      gender: {
        required,
        valid(value) {
          return this.ACCOUNT_SETTING.genderOptions.includes(value);
        }
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
          return this.ACCOUNT_SETTING.months.includes(value);
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
      region: { required },
      city: { required },

      spokesman: { required }
    }
  },
  mounted() {
    this.formData = this.getAccountInfo;
    this.$store.dispatch("userInformation/getDetailedInformation");
  }
};
</script>

<style lang="sass" scoped>

.theme
    +afs(36px,30px,24px)
    text-transform: uppercase
    margin: 2rem 0rem
    text-shadow: 0px 1px 2px rgba(8, 35, 48, 0.24), 0px 2px 6px rgba(8, 35, 48, 0.16)
form
    padding: 1rem
    box-shadow: 0px 6px 12px rgba(8, 35, 48, 0.14), 0px 16px 24px rgba(8, 35, 48, 0.08)
    width: 600px
    background-color: $White
    display: grid
    grid-gap: 1.5rem
    margin: auto
    height: auto
    @media screen and ( max-width: $TableWidth )
        box-sizing: border-box
        width: 100%
    .theme
        +afs(24px,24px,20px)
        margin: 0
.label
    font-size: 18px
    color: $Grey


.group-2, .group-3
    display: grid
    grid-gap: 1rem
    height: auto

.group-2
    grid-template-columns: 1fr 1fr
.group-3
    grid-template-columns: 1fr 1fr 1fr

.user
    display: grid
    align-items: center
    grid-template-columns: auto 1fr
    grid-gap: 1rem
    label
      width: 134px
      height: 134px
      display: block
      cursor: pointer
      @media screen and (max-width: $PhoneWidth)
        width: 100px
        height: 100px

      img
        width: 100%
        height: 100%
        object-fit: cover
      input[type="file"]
        outline: 0
        opacity: 0
        pointer-events: none
        user-select: none
    .text
        font-size: 20px
</style>
