<template lang="pug">
  .wrapper
    .container
      p.Slider__title(v-if="name") {{ name }}
      .Slider(
        ref="wrap"
        @mousedown="SavePoint"
        @mouseup="ChangePoint"
        @touchstart="SaveTouch"
        @touchend="ChangeTouch"
        :style="{height: `${height}px`}"
        onselectstart="return false"
      )
        .outer-left(@click="SliderReverse()")
          img(src="@/assets/ui/chevron-left.svg", alt="alt")
        .outer-right(@click="SliderAverse()")
          img(src="@/assets/ui/chevron-right.svg", alt="alt")
        .slide(
          ref="slide"
          v-for="(item,index) in slide"
          :key="index"
          :style="{backgroundImage:`url(${item.image})`}"
          @click="() => clickElem(item.id)"
        )
          .text(v-if="isImg")
            .theme {{item.title}}
            .date {{item.date}}
          .video(v-if="!isImg")
            .title {{item.title}}
            img(src="@/assets/VideoUI/play_button.svg")

</template>

<script>
export default {
  name: "gg-slider",
  props: {
    name: String,
    slide: Array,
    height: Number,
    isImg: Boolean
  },
  data() {
    return {
      publicPath: process.env.BASE_URL,
      mouseX: 0,
      index: 0,
      counter: 0,
      averse: 0,
      reverse: 0,
      SlideCount: [4, 1],
      transform: 0,
      isLoaded: false
    };
  },
  methods: {
    clickElem(id) {
      if (this.isImg) {
        this.$router.push({ name: "NewsArticle", params: { id: id } });
      } else {
        this.$router.push({ name: "VideoPage", params: { id: id } });
      }
    },
    SliderAverse() {
      if (this.counter == 0) this.index = 1;
      if (this.counter > this.averse) {
        this.index += 2;
        this.averse = this.counter;
      }
      this.SliderControl(this.$refs.slide, 10, this.index);
      this.index++;
      this.averse++;
      this.counter++;
    },

    SliderReverse() {
      if (this.counter == 0) this.index = this.$refs.slide.length - 1;
      if (this.counter > this.reverse) {
        this.index -= 2;
        this.reverse = this.counter;
      }
      this.SliderControl(this.$refs.slide, 1, this.index);
      if (this.index == 0) this.index = this.$refs.slide.length;
      else this.index--;
      this.counter++;
      this.reverse++;
    },

    SliderControl(slider, z, index) {
      let SlideActiveZ = [];

      for (var i = 0; i < slider.length; i++) {
        slider[i].style.zIndex = null;
        slider[i].style.transform = null;
      }

      this.transform = this.SlideCount[1] * -100;

      for (let i = 0; i < this.SlideCount[0] - 2; i++) SlideActiveZ.push(10);
      SlideActiveZ.unshift(z);
      SlideActiveZ.push(1);

      for (let i = 0; i < this.SlideCount[0]; i++) {
        slider[(index + i) % slider.length].style.zIndex = SlideActiveZ[i];
        slider[(index + i) % slider.length].style.transform =
          "translateX(" + this.transform + "%)";
        this.transform += 100;
      }
    },

    SavePoint: function(event) {
      this.mouseX = event.clientX;
    },
    ChangePoint: function(event) {
      if (event.clientX > this.mouseX) this.SliderReverse();
      else if (event.clientX < this.mouseX) this.SliderAverse();
    },
    SaveTouch: function(event) {
      this.mouseX = event.changedTouches[0].screenX;
    },
    ChangeTouch: function(event) {
      if (event.changedTouches[0].screenX > this.mouseX) this.SliderReverse();
      else if (event.changedTouches[0].screenX < this.mouseX)
        this.SliderAverse();
    }
  },
  mounted() {
    if (this.slide.length > 0) this.SliderAverse();
  },
  updated() {
    this.SliderAverse();
  }
};
</script>

<style lang="sass" scoped>
.wrapper
  width: 100%
  padding: 1rem 0rem
  overflow-x: hidden
.Slider
  width: 100%
  position: relative
.slide
  cursor: pointer
  position: absolute
  width: 50%
  height: 100%
  display: grid
  top: 0
  left: 0
  transition: transform .5s
  z-index: 0
  background-size: cover
  background-position: center
  background-repeat: no-repeat
  @media screen and ( max-width: $PhoneWidth )
    width: 100%

.sl0, .sl1, .sl2, .sl3
  box-shadow: 0px 6px 12px rgba(8, 35, 48, 0.14), 0px 16px 24px rgba(8, 35, 48, 0.08)
.Slider__title
  font-size: 30px
  font-weight: 600
  text-transform: uppercase
.text
  color: $White
  display: flex
  width: 100%
  height: 100%
  flex-direction: column
  align-items: center
  text-align: center
  justify-content: flex-end
  padding: 2rem
  box-sizing: border-box
  background: linear-gradient(180deg, rgba(0, 57, 166, 4e-05) 0%, rgba(0, 57, 166, 0.4) 85.76%)
  .theme
    font-size: 24px
    margin-bottom: 1rem
  .date
    font-size: 12px
.video
  color: $White
  text-transform: uppercase
  .title
    +afs(24px,22px,20px)
    padding: 1rem
    background: linear-gradient(0deg, rgba(38, 50, 57, 0.0001) 0%, #263239 100%)
  img
    width: 3rem
    position: absolute
    top: 50%
    left: 50%
    transform: translate(-50%,-50%)


.outer-left, .outer-right
  position: absolute
  top: 0
  width: 200%
  height: 100%
  left: 0
  cursor: pointer
  z-index: 20
  background-color: rgba(255, 255, 255, 0.5)
  img
    position: absolute
    top: 50%
    transform: translateY(-50%)
    @media screen and (min-width: 992px) and (max-width: 1100px)
      display: none
    @media screen and (max-width: 860px)
      display: none

.outer-left
  transform: translateX(-100%)
  img
    right: 1em
.outer-right
  transform: translateX(50%)
  img
    left: 1em
</style>
