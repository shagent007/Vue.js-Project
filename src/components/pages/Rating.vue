<template lang="pug">
.container
  .VideoMore
    .theme {{TABLE_ATTR.title}}
  .Rating
    .theme {{TABLE_ATTR.title}}

    .Rating__graphic

      apexcharts(
        height="100%"
        :width="graphicWidth"
        v-if="GRAPHIC_VALUES"
        type="bar"
        :series="GRAPHIC_VALUES"
        :options="chartOptions"
      )
  //-
    .grey {{TABLE_ATTR.subtitle}}
    .box
      .values
        .val-item(v-for="(value,index) in TABLE_ATTR.tableValues" :key="index") {{value}}
      .ratings
        .inner
          .raiting-item(v-for="(item,index) in SORT_RATING",  :key="index" :style="{}")         
            .value(:style="{'height': RATING_VALUE[index]}" @click="showHelp(index)") 
              .team-name(ref="help") {{item.name}}
            .team-num №{{index+1}}
          .Lines
            .line(v-for="line in 4" :key="line")
  .table
    .theme {{TABLE_ATTR.tableTitle}}
    table
      thead
        tr
          td(v-for="name in TABLE_ATTR.tableTopNames") {{name}}
      tbody
        tr(v-for="(item,index) in SORT_RATING", :key="index")
          td {{index+1}}
          td {{item.name}}
          td {{item.project}}
          td {{item.trainer}}
          td {{item.town}}
          td {{item.value}}
</template>

<script>
import { mapGetters, mapActions } from "vuex";
export default {
  name: "rating",

  data() {
    return {
      chartOptions: {
        chart: {
          type: "bar",
          height: "100%"
        },
        colors: ["#367BF5"],
        xaxis: {
          tickPlacement: "on"
        }
      }
    };
  },

  computed: {
    ...mapGetters("rating", [
      "TABLE_ATTR",
      "SORT_RATING",
      "RATING_VALUE",
      "GRAPHIC_VALUES"
    ]),

    graphicWidth() {
      // берем в нулевом элементе свойство data
      const width = this.GRAPHIC_VALUES[0].data.reduce(total => total + 50, 0);

      // 100 пикселей для красивого отступа
      return width + 100 + "px";
    }
  },

  methods: {
    ...mapActions("rating", ["sortingPosts"]),

    showHelp(index) {
      this.$refs.help.forEach(element => element.classList.remove("active"));
      this.$refs.help[index].classList.add("active");
    }
  },

  mounted() {
    this.sortingPosts();
  }
};
</script>

<style lang="sass" scoped>
.container
  display: grid
  grid-template-columns: 1fr 1fr
  grid-gap: 1rem
  @media screen and ( max-width: $TableWidth )
    display: block


.VideoMore
  grid-column: 1/3

.grey
  font-size: 12px
  padding-left: 1rem
  margin-top: 1rem

.Rating
  display: flex
  flex-flow: column nowrap

  background-color: $White
  color: $DarkGrey
  font-size: 12px

  height: 330px
  overflow: hidden

  padding: 1rem
  margin-bottom: 2rem

  box-shadow: 0px 6px 12px rgba(8, 35, 48, 0.14), 0px 16px 24px rgba(8, 35, 48, 0.08)

  .theme
    +afs(24px,18px,16px)
    padding-left: 1rem
    white-space: nowrap

/* график */
.Rating__graphic
  overflow: auto hidden
  width: 100%
  height: 100%

.box
  height: 240px
  width: 100%
  overflow: hidden
  display: grid
  padding-bottom: 60px
  grid-template-columns: 4rem 1fr
  grid-gap: 1rem
  margin-top: -30px
  .ratings
    height: 100%
    z-index: 10
    padding-top: 30px
    width: 100%
    padding-bottom: 20px
    overflow-x: auto
    .inner
      height: 100%
      z-index: 10
      display: flex
      width: fit-content
      position: relative
      overflow-y: visible
      align-items: flex-end
      .raiting-item
        height: 100%
        display: grid
        align-items: end
        justify-items: center
        padding-top: 30px
        grid-template-rows: 1fr 30px
        box-sizing: border-box
        z-index: 10
        margin: 0rem 1rem

        .value
          box-sizing: border-box
          z-index: 10
          width: 27px
          cursor: pointer
          display: grid
          justify-items: center
          position: relative
          background: linear-gradient(90deg, #9BAAFA 0%, #367BF5 100%)


          .team-name
            position: absolute
            top: -10px
            transform: translateY(-100%)
            padding: .5rem 1rem
            background: linear-gradient(90deg, #9BAAFA 0%, #367BF5 100%)
            box-shadow: 0px 2px 6px rgba(35, 36, 37, 0.3)
            color: $White
            transition: .3s
            opacity: 0
            &.active
              opacity: 1
            &:after
              position: absolute
              border: 10px solid transparent
              content: ''
              top: 100%
              left: 50%
              transform: translateX(-50%)
              border-top-color: #6491f8
        .value:hover
          .team-name
            opacity: 1
  .values
    display: grid
    align-items: end
    justify-items: end
    .val-item:last-child
      position: relative
      &:after
        position: absolute
        content: '№ команды'
        color: inherit
        font-size: 12px
        top: 200%
        white-space: nowrap
        left: 0
        transform: translateX(-75%)
  .Lines
    display: grid
    align-items: center
    position: absolute
    top: 0
    left: 0
    width: 100%
    height: 100%
    .line
      width: 100%
      height: 1px
      background-color: $Black

.table
  background-color: $White
  box-shadow: 0px 6px 12px rgba(8, 35, 48, 0.14), 0px 16px 24px rgba(8, 35, 48, 0.08)
  height: 330px
  padding: 1rem
  overflow-y: auto
  margin-bottom: 2rem
  .theme
    font-size: 24px
  table
    border-collapse: collapse
    text-align: center
    width: 100%
    font-size: 12px
    thead
      font-weight: bold
      font-size: 14px
    td
      padding: .5rem 1rem
      border-bottom: 1px solid $DarkGrey
</style>
