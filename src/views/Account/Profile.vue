<template lang="pug">
.wrapper
  .account-item-header
    .logo-photo(:style="{backgroundImage: `url('${image}')`}")
    .brief-information
      .brief-information-container(v-for="(item, index) in briefInformation(getBriefInformation)" :key="index")
        .brief-information-container-title {{item.title}}
        .brief-information-container-info {{item.info}}
  .mentor-info(v-if="getIsMentor || getIsTrainer")
    .brief-mentor-information(v-for="(item, index) in briefMentorInformation" :key="index")
      .title {{item.title}}
      .info {{item.info}}
  .content
    .detailed-information
      .detailed-information-container(v-for="(item, index) in detailedInformation(getDetailedInformation)" :key="index")
        .detailed-information-title {{item.title}}
        .detailed-information-info {{item.info}}
      .button-edit
        gg-button(color="red" @click="$router.push('/')") {{buttonInformation.name}}
</template>

<script>
import GgButton from "@/components/Base/GgButton";
import { mapGetters, mapState } from "vuex";

const accountProfile = "accountProfile";
const userInformation = "userInformation";

export default {
  name: "profile",
  components: {
    GgButton
  },
  data() {
    return {
      photoLink: process.env.BASE_URL + "test-info-people.jpg",

      buttonInformation: { name: "Редактировать", url: "/account/setting" }
    };
  },
  computed: {
    ...mapState(userInformation, ["image", "id"]),
    ...mapGetters(accountProfile, [
      "briefInformation",
      "detailedInformation",
      "briefMentorInformation"
    ]),
    ...mapGetters(userInformation, [
      "getBriefInformation",
      "getDetailedInformation",
      "getIsMentor",
      "getIsTrainer"
    ])
  },
  mounted() {
    this.$store.dispatch("userInformation/getDetailedInformation");
  }
};
</script>

<style lang="sass" scoped>
.wrapper
  box-sizing: border-box

.content
  padding-bottom: 1rem
.account-item-header
  display: flex
  flex-flow: row wrap
  justify-content: space-between
  @media screen and (max-width: $DesktopWidth)
    flex-flow: column nowrap
    padding-left: 0 !important


.logo-photo
  background-repeat: no-repeat
  background-position: center
  background-clip: content-box
  background-size: cover
  height: 380px
  padding-right: 10px
  width: 290px
  @media screen and (max-width: $DesktopWidth)
    margin-left: 50%
    padding-bottom: 20px
    max-width: 290px
    width: 260px
  @media screen and (max-width: $PhoneWidth)
    width: 100%
    margin: auto

.brief-information
  display: flex
  flex-flow: column nowrap
  justify-content: space-between
  box-sizing: border-box
  flex: 2
  @media screen and (max-width: $DesktopWidth)
    padding: 0 20px

  .brief-information-container
    display: flex
    justify-content: space-between
    margin-top: 10px
    &:first-child
      .brief-information-container
        font-size: 22px
        @media screen and (max-width: $PhoneWidth)
          font-size: 18px
      .brief-information-container-info
        font-size: 22px
        @media screen and (max-width: $PhoneWidth)
          font-size: 18px

    .brief-information-container-title
      //size
      flex: 2
      height: 100%
      //container
      display: flex
      flex-direction: row
      flex-wrap: wrap
      justify-content: flex-start
      text-align: left
      //text
      font-size: 18px
      line-height: 23px
      text-transform: uppercase
      color: #828282
      font-family: Gotham Pro
      @media screen and (max-width: $PhoneWidth)
        flex: 1
        font-size: 16px

    .brief-information-container-info
      //size
      flex: 3
      height: 100%
      //container
      display: flex
      flex-direction: row
      flex-wrap: wrap
      //text
      color: #000000
      font-size: 18px
      line-height: 19px
      hyphens: manual
      //indents
      margin-left: 3%
      @media screen and (max-width: $TableWidth)
        justify-content: flex-end
      @media screen and (max-width: $PhoneWidth)
        flex: 1
        font-size: 16px
        justify-content: flex-end
        text-align: right
.mentor-info
  width: 100%
  height: auto
  display: grid
  justify-items: center
  align-items: center
  grid-auto-flow: column
  grid-template-rows: 1fr 1fr
  grid-template-columns: 1fr 1fr
  grid-gap: 20px
  box-sizing: border-box
  padding: 30px 3% 0 3%
  @media screen and (max-width: $TableWidth)
    grid-template-columns: 1fr
    grid-template-rows: 1fr 1fr 1fr 1fr
    padding: 30px 20px 0 20px
  .brief-mentor-information
    height: auto
    display: grid
    width: 100%
    grid-template-columns: 1fr 1fr
    .title
      font-size: 20px
      line-height: 120%
      color: #828282
      text-align: left
      @media screen and (max-width: $PhoneWidth)
        font-size: 18px
    .info
      font-size: 20px
      line-height: 120%
      color: #000000
      text-align: center
      @media screen and (max-width: $TableWidth)
        text-align: right
      @media screen and (max-width: $PhoneWidth)
        font-size: 18px

.detailed-information
  //size
  width: 100%
  height: auto
  //container
  display: flex
  flex-direction: column
  box-sizing: border-box
  //indents
  padding: 0 30px 0 3%
  @media screen and (max-width: $DesktopWidth)
    padding: 30px 20px 0 20px
  .detailed-information-container
    //size
    flex: 1
    width: 100%
    //container
    display: flex
    flex-flow: row nowrap
    //indents
    margin-top: 3%
    @media screen and (max-width: $TableWidth)
      flex-flow: column nowrap
    .detailed-information-title
      //size
      flex: 1
      height: auto
      //text
      font-size: 20px
      line-height: 120%
      color: #828282
      hyphens: manual
      @media screen and (max-width: $TableWidth)
        flex: 1
        margin-bottom: 1rem
      @media screen and (max-width: $PhoneWidth)
        flex: 2
        font-size: 16px
    .detailed-information-info
      //size
      flex: 5
      height: auto
      //container
      display: flex
      //text
      font-size: 20px
      line-height: 120%
      color: #000000
      hyphens: manual
      @media screen and (max-width: $TableWidth)
        flex: 2
      @media screen and (max-width: $PhoneWidth)
        flex: 3
        font-size: 16px
.button-edit
  display: flex
  justify-content: flex-end
  margin: 1rem
  @media screen and (max-width: $PhoneWidth)
    justify-content: center
</style>
