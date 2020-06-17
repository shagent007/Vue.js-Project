<template lang="pug">
main-layout
  .container(v-if="peopleList")

    img.container__image(:src="peopleList.image", alt="alt")

    gg-search-field.container__search(
      :placeholder="peopleList.searchPlaceholder" 
      textButton="Поиск"
      v-model="searchField"
    )

    gg-sort-buttons(:buttons="buttons" @click="handleSort")

    .menu-cards

      template(v-if="group === 'teams'")
        information-card-comands.menu-cards__item(
          v-for="comand in peopleList.peoples"
          :key="comand.id"
          v-bind="comand"
          @buttonClick="handleButtonClick(group, command.id)"
          @routCardPage="handleRouteCard"
        )

      template(v-else)
        information-card.menu-cards__item(
          v-for="people in peopleList.peoples"
          :key="people.id"
          v-bind="people"
          :buttonName="peopleList.buttonName"
          @buttonClick="handleButtonClick(group, people.id)"
          @routCardPage="handleRouteCard"
        )
</template>

<script>
import GgSearchField from "@/components/Base/GgSearchField";
import GgSortButtons from "@/components/pages/GgSortButtons";
import InformationCard from "@/components/pages/InformationCard";
import InformationCardComands from "@/components/pages/InformationCardComands";

import { mapActions, mapGetters } from "vuex";
import ApiService from "../../model/ApiService";

const KEY_COMPONENT = "GroupPeoplePage";
export default {
  name: "GroupPeoplePage",
  components: {
    GgSearchField,
    GgSortButtons,
    InformationCard,
    InformationCardComands
  },
  data() {
    return {
      searchField: "",
      buttons: [
        {
          name: "По возрасту",
          isActive: true,
          value: "age"
        },
        {
          name: "По алфавиту",
          isActive: false,
          value: "alphabet"
        },
        {
          name: "По рейтингу",
          isActive: false,
          value: "rating"
        }
      ],
      enumButtons: {
        age: 0,
        alphabet: 1,
        rating: 2
      }
    };
  },
  methods: {
    handleSort(value, buttonIndex) {
      if (this.SORTED_METHOD !== value) this.setSortedMethod(value);

      this.buttons = this.buttons.map((button, _index) => {
        button.isActive = _index === buttonIndex ? true : false;
        return button;
      });

      this.sortBy({ value, group: this.group });
    },

    handleButtonClick(group, id) {
      console.log(group, id);
      this.$router.push({ name: "Test", params: { group, id, test: 1 } });
    },

    handleRouteCard(info) {
      this.setCardPage(info);
    },

    ...mapActions("groupPeoplePage", [
      "sortBy",
      "setCardPage",
      "setSortedMethod"
    ])
  },
  mounted() {
    if (!this.SORTED_METHOD) {
      this.setSortedMethod("age");
    }
    this.handleSort(this.SORTED_METHOD, this.enumButtons[this.SORTED_METHOD]);
    this.$store
      .dispatch("groupPeoplePage/getPeoples", this.group)
      .then(flag => {
        switch (flag) {
          case "":
            break;
          case ApiService.ERROR.NO_PEOPLES_AVAILABLE:
            alert("Люди не найдены");
            break;
          default:
            console.group(KEY_COMPONENT);
            console.info("Не обработанная ошибка");
            console.log(flag);
            console.groupEnd();
        }
      });
  },
  computed: {
    group() {
      console.log(this.$route);
      return this.$route.params.group;
    },
    peopleList() {
      console.log(this.group, "peoplelist");
      return this.PEOPLE_LIST(this.group);
    },
    ...mapGetters("groupPeoplePage", ["PEOPLE_LIST", "SORTED_METHOD"])
  }
};
</script>

<style lang="sass" scoped>
/* картинка */
.container__image
  display: block
  position: relative
  width: 100%

/* поле поиска */
.container__search
  margin: 20px 0 0

/* карточки */
.menu-cards
  width: 100%
  display: flex
  flex-direction: row
  flex-flow: wrap
  justify-content: space-between

/* одна карточка */
.menu-cards__item
  margin-bottom: 2rem
  flex-basis: 33.333333%
  @media screen and (max-width: $TableWidth)
    flex-basis: 50%
  @media screen and (max-width: $PhoneWidth)
    flex-basis: 100%
</style>
