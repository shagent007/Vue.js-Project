<template lang="pug">
  .card
    .info
      router-link.img(
        @click="routCardPage"
        :to="`${$route.params.group}/${id}`"
        :style="{backgroundImage: `url('${image}')`}"
      )
      .name {{ name }}
      .information {{ information }}
      .team(v-if="team !== ''") {{INFORMATION_CARD}} {{ team }}
    gg-button(:color="color" @click="$emit('buttonClick')") {{ buttonName }}
</template>

<script>
import GgButton from "@/components/Base/GgButton";

import { mapGetters } from "vuex";
export default {
  components: {
    GgButton
  },
  name: "information-card",
  props: {
    id: String,
    image: String,
    name: String,
    team: String,
    information: String,
    buttonName: String
  },
  data() {
    return {
      publicPath: process.env.BASE_URL + "groupPeoplesPage/dynamic/"
    };
  },
  computed: {
    group() {
      return this.$route.params.group;
    },
    color() {
      const group = this.$route.params.group;
      return group === "participants"
        ? "black"
        : group === "trainers"
        ? "red"
        : "blue";
    },
    ...mapGetters("groupPeoplePage", ["BUTTON_NAME"]),
    ...mapGetters("staticData", ["INFORMATION_CARD"])
  },
  methods: {
    routCardPage() {
      const { img, name, team, id, age, city, buttonName } = this;
      this.$emit("routCardPage", {
        img,
        name,
        team,
        id,
        age,
        city,
        buttonName
      });
    }
  }
};
</script>

<style lang="sass" scoped>
.card
  flex: 1
  flex-basis: 33%
  min-width: 320px
  height: auto
  font-family: Gotham Pro
  font-style: normal
  font-weight: normal
  display: flex
  flex-direction: column
  justify-content: center
  align-content: center
  align-items: center
  background: inherit

  .info
    width: 100%
    height: auto
    display: flex
    flex-direction: column
    justify-content: center
    box-shadow: 0px 6px 12px rgba(8, 35, 48, 0.14), 0px 16px 24px rgba(8, 35, 48, 0.08)
    background-color: $White

    a.img
      width: 100%
      height: 516px
      background-repeat: no-repeat
      background-position: center
      background-clip: border-box
      background-size: cover

    .name
      height: 64px
      margin: 10px 5px 0 5px
      +afs(24px, 20px, 16px)
      line-height: 23px
      font-weight: 500
      text-transform: uppercase
      text-align: center

    .information
      height: 32px
      margin: 5px 5px 0 5px
      font-size: 12px
      line-height: 11px
      font-weight: 500
      text-transform: uppercase
      text-align: center

    .team
      height: 32px
      margin: 5px 5px 10px 5px
      font-size: 14px
      line-height: 13px
      font-weight: 500
      text-transform: uppercase
      text-align: center

  button
    margin: 30px 10% 30px 10%
    @media screen and (max-width: $PhoneWidth)
      margin: 15px 2% 15px 2%

@media screen and (max-width: $PhoneWidth)
  .card
    min-width: 250px
</style>
