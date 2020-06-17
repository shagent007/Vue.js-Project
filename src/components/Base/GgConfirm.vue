<template lang="pug">
.wrapper-tooltip
  .tooltip-confirm(
    v-if="show" 
    ref="confirm"
    :class="arrowDirection"
    :style="{ top, left }"
  )
    span.arrow
    .title {{ title }}
    .button-group
      button.button.resolve(@click="$emit('answer', true); closeTooltip()") Принять
      button.button.reject(@click="$emit('answer', false); closeTooltip()") Отменить
  div(
    @click="showTooltip"
    :class="containerClass"
  )
    slot
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      default: "Вы хотите подтвердить действие?"
    }
  },

  data() {
    return {
      top: 0,
      left: 0,
      show: false,
      shownEarlier: false,
      arrowDirection: "right",
      containerClass: "wrapper-content"
    };
  },

  methods: {
    showTooltip(event) {
      if (this.show) return;

      this.show = true;

      this.$nextTick(async () => {
        const modal = this.$refs.confirm;
        modal.style.width = "200px";
        console.log(this.$refs.confirm.offsetWidth, "modal width before");
        await this.$nextTick(() =>
          console.log(this.$refs.confirm.offsetWidth, "modal width after")
        );

        // проверка на то что элемент не вызывался, потому при
        // втором вызове width и height модалки почему то равны 0
        if (!this.shownEarlier) {
          // ширина и высота модалки
          const width = modal.clientWidth;
          const height = modal.clientHeight;

          console.log(
            modal.getBoundingClientRect(),
            height,
            width,
            "container"
          );

          // контейнер, около которого надо вывести модалку
          const container = event.path.find(el => {
            return el.classList.contains(this.containerClass);
          });

          // параметры контейнера
          const box = container.firstChild.getBoundingClientRect();

          // размещение тултипа -->

          this.top = this.getTop(box.top, box.height, height);

          if (this.haveFreeSpaceRight(box, width)) {
            this.left = this.getCenter(box, width);
            this.arrowDirection = "center";
          } else {
            this.arrowDirection = "bottom-right";
            this.left = this.getLeft(box, width);
            this.arrowDirection = "bottom-right";
          }

          this.top += "px";
          this.left += "px";

          this.shownEarlier = true;
        }

        document.body.appendChild(modal);
      });

      return;
    },

    closeTooltip() {
      this.show = false;
    },

    getTop(containerTop, containerHeight, elementHeight) {
      console.log(containerTop, elementHeight);
      return containerTop - containerHeight - elementHeight + pageYOffset;
    },

    getCenter(container, width) {
      console.log("getCenter", width);
      return (
        container.left + pageXOffset - width + width / 2 + container.width / 2
      );
    },

    getLeft(container, width) {
      return container.left + pageXOffset - width + container.width + 5;
    },

    haveFreeSpaceRight(container, elementWidth) {
      return window.innerWidth - container.x > elementWidth / 2 + 100;
    }
  }
};
</script>

<style lang="sass" scoped>
.tooltip-confirm
  background-color: $White
  padding: 20px

.tooltip-confirm
  position: absolute
  z-index: 999
  box-shadow: 0px 1px 2px rgba(8, 35, 48, 0.24), 0px 2px 6px rgba(8, 35, 48, 0.16)

  &.bottom-right .arrow
    right: 0
    border-top: 2rem solid $White
  &.center .arrow
    right: calc(50% - 25px)
    border-top: 2rem solid $White

.arrow
  bottom: -2rem
  position: absolute

  border-left: solid transparent
  border-right: solid transparent

  border-right-width: 25px
  border-left-width: 25px

.button-group, .title
  display: flex
  justify-content: space-between

.button
  border: 0
  background-color: inherit
  +afs(18px, 16px, 14px)
  cursor: pointer

.title
  padding-bottom: 1rem
  text-align: center

.resolve
  color: $Green

.reject
  color: $Red
</style>
