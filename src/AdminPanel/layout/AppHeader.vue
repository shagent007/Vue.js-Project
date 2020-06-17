<template lang="pug">
.Header
  .Header__menu-icon(
    @click="$emit('openCloseMenu', !consolePage)"
    :class="{ active: consolePage }"
  )
    img(
      src="@/AdminPanel/assets/menu-icon.svg"
      alt=""
      width="100%"
      height="100%"
    )

  .Header__logo
    img(
      src="@/AdminPanel/assets/logo.png"
      alt="Логотип Лидеры управления"
      height="100%"
    )

  .Header__title панель администратора

  user-info.UserInfo(
    :name="user.name"
    :image="user.image"
  )

  .Header__logout(
    @click="adminLogout"
  )
    img(
      src="@/AdminPanel/assets/logout.svg" 
      alt="кнопка выхода" 
      type="button"
    )

</template>

<script>
import UserInfo from "@/AdminPanel/ui/UserInfo";

import { mapActions } from "vuex";
export default {
  model: {
    prop: "consolePage",
    event: "openCloseMenu"
  },

  components: {
    UserInfo
  },

  props: {
    consolePage: Boolean
  },

  data() {
    return {
      user: {
        name: "Сергей Борисович",
        image: require("@/AdminPanel/assets/logo-ded-small.jpg")
      }
    };
  },

  methods: {
    ...mapActions("userInformation", ["adminLogOut"]),
    adminLogout() {
      this.$router.push({ name: "AdminPanel" });
      this.adminLogOut();
    }
  }
};
</script>

<style lang="sass" scoped>
/* контейнер шапки */
.Header
  display: flex
  justify-content: space-around
  align-items: center
  margin: 0 20px

/* логотип */
.Header__logo
  padding-left: 70px
  height: 70px

  @media screen and (max-width: $PhoneWidth)
    display: none

/* надпись панель администратора */

.Header__title
  padding-left: 5rem
  color: black

  text-transform: uppercase

  font-family: Montserrat Alternates
  font-style: normal
  font-weight: 600
  font-size: 24px

  @media screen and (max-width: $TableWidth)
    padding: 1rem
    font-size: 16px

// выравнивание по вертикали
.Header__title,
.UserInfo,
.Header__logout
  display: flex
  align-items: center

/* информация о юзере */
.UserInfo

  @media screen and (max-width: $TableWidth)
    display: none

.Header__logout
  margin-right: 1rem

  @media screen and (max-width: $TableWidth)
    margin: 0

/* иконка меню */
.Header__menu-icon
  @media screen and (min-width: 1200px)
    display: none

/* стили для иконок */
.Header__menu-icon,
.Header__logout
  min-width: 20px
  min-height: 20px
  max-width: 20px
  max-height: 20px
  padding: 10px
  background: linear-gradient(180deg, #F0F4F7 0%, #DCE6F2 48.96%, #F3FAFF 100%)
  box-shadow: 6px 2px 16px rgba(136, 165, 191, 0.54), -6px -2px 12px #FFFFFF
  border-radius: 4px

.Header__logout:active,
.Header__menu-icon:active,
.Header__logout.active,
.Header__menu-icon.active
  background: linear-gradient(180deg, #F0F4F7 0%, #DCE6F2 48.96%, #F3FAFF 100%)
  box-shadow: inset 3px 3px 7px rgba(136, 165, 191, 0.6), inset -3px -3px 7px #FFFFFF
  border-radius: 4px
</style>
