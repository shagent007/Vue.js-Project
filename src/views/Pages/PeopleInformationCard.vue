<template lang="pug">
main-layout
  .container(v-if="info")
    .photo-bar
      img(:src="'/groupPeoplesPage/dynamic/' + info.img")
      button.btn-red {{ info.buttonName }}
    .iformation
      .name {{ info.name }}
      .age
        .text {{PEOPLE_INFORMATION_CARD.age}} 
        .info {{ info.age }}
      .info-about
        .text {{PEOPLE_INFORMATION_CARD.about}} 
        .info ничего нет
      .position
        .text {{PEOPLE_INFORMATION_CARD.location}}  
        .info {{ info.city }}
      .progress
        .text {{PEOPLE_INFORMATION_CARD.progress}} 
        .info ничего нет
      .message
        img(src="/send.svg")
        input(
          type="text" 
          :placeholder="PEOPLE_INFORMATION_CARD.inputPlaceholder"
          v-model="inputMessage"
        )
      button {{PEOPLE_INFORMATION_CARD.button}} 
</template>

<script>
import GgButton from "@/components/Base/GgButton";

import { mapGetters, mapActions } from "vuex";

export default {
  name: "PeopleIInformationCard",
  data() {
    return {
      inputMessage: "",
      info: null
    };
  },
  methods: {
    ...mapActions("groupPeoplePage", ["setCardPage", "deleteCardPage"])
  },
  mounted() {
    if (!this.CARD_PAGE) {
      this.setCardPage({ group: this.group, id: this.id });
    }
    this.info = this.CARD_PAGE;
  },
  beforeDestroy() {
    this.deleteCardPage();
  },
  computed: {
    ...mapGetters("groupPeoplePage", ["CARD_PAGE", "BUTTON_NAME"]),
    ...mapGetters("staticData", ["PEOPLE_INFORMATION_CARD"]),
    group() {
      return this.$route.params.group;
    },
    id() {
      return this.$route.params.id;
    }
  },
  components: {
    GgButton
  }
};
</script>

<style lang="sass" scoped>
.container
  display: grid
  grid-template-columns: 1fr 1fr
  grid-gap: 1rem
  background-color: $White
  align-items: stretch
  justify-items: center
  @media screen and (max-width: $TableWidth)
    grid-template-columns: 1fr
  .photo-bar
    display: grid
    box-shadow: 0px 6px 12px rgba(8, 35, 48, 0.14), 0px 16px 24px rgba(8, 35, 48, 0.08)
    img
      width: 100%
      &:hover
        border: 4px solid transparent
        box-sizing: border-box
        box-shadow: 0px 2px 4px rgba(54, 123, 245, 0.9), 0px 4px 8px rgba(54, 123, 245, 0.16)
  .iformation
    padding: 1rem
    display: grid
    align-items: start
    box-shadow: 0px 6px 12px rgba(8, 35, 48, 0.14), 0px 16px 24px rgba(8, 35, 48, 0.08);
    @media screen and (max-width: $TableWidth)
      width: 100%
    .name
      width: 100%
      +afs(36px,30px,20px)
      line-height: 34px
      letter-spacing: 0.1em
      text-transform: uppercase
      color: $Blue
    .age,
    .info-about,
    .position,
    .progress
      margin-top: 5%
      display: grid
      grid-template-columns: 1fr 1fr


    .text
      +afs(18px,24px,14px, 24px)
      color: $LightGrey
    .info
      +afs(18px,24px,14px, 24px)
      color: $Black
    .message
      display: flex
      flex-direction: row
      align-items: center
      align-content: center
      align-self: center
      width: 90%
      height: auto
      margin: 5% 5% 5% 5%
      border-bottom: 2px solid $Blue
      img
        width: 5%
      input
        margin-left: 3%
        width: 92%
        border: none



        font-size: 24px
        line-height: 23px
        display: flex
        align-items: center
    button
      display: flex
      justify-content: center
      align-content: center
      align-items: center
      font-weight: bold
      font-size: 24px
      line-height: 23px
      border: 4px solid $Blue
      box-sizing: border-box
      color: $Blue
      box-shadow: 0px 6px 12px rgba(8, 35, 48, 0.14), 0px 16px 24px rgba(8, 35, 48, 0.08)
      margin: 0 3% 0 auto
      &:hover
        background: $Blue
        color: white
</style>
