<template lang="pug">
.wrapper-tooltip
  .tooltip(
    v-if="show" 
    ref="modal"
    :class="arrowDirection"
    :style="{ top, left }" 
  )
    span.arrow(:style="{ borderBottomWidth, borderTopWidth }")
    span.tooltip-text {{ tooltipText }}
  div(
    :class="containerClass"
    @mouseover="showTooltip" 
    @mouseleave="closeTooltip"
  )
    slot
</template>

<script>
export default {
  props: {
    tooltipText: {
      type: String,
      required: true
    },

    direction: {
      type: String,
      default: "right",
      validator(dir) {
        return ["top", "right", "bottom", "left"].includes(dir);
      }
    }
  },

  data() {
    return {
      top: 0,
      left: 0,
      show: false,
      rotateImage: false,
      shownEarlier: false,
      borderBottomWidth: 0,
      borderTopWidth: 0,
      arrowDirection: "right",
      containerClass: "tooltip-content"
    };
  },

  methods: {
    showTooltip(event) {
      if (this.show) return;

      this.show = true;

      this.$nextTick(async () => {
        const modal = this.$refs.modal;

        const width = modal.offsetWidth;
        const height = modal.offsetHeight;

        console.log(modal, modal.getBoundingClientRect(), height, width);

        // await this.$nextTick(( ) => {
        //   console.log(modal.offset, modal.getBoundingClientRect())
        //   width = modal.offsetWidth;
        //   height = modal.offsetHeight;
        // });

        // проверка на то что элемент не вызывался, потому при
        // втором вызове width и height модалки почему то равны 0
        if (!this.shownEarlier) {
          // ширина и высота модалки
          const width = modal.offsetWidth;
          const height = modal.offsetHeight;
          console.log(height, modal.getBoundingClientRect());

          // контейнер, около которого надо вывести модалку
          const container = event.path.find(el => {
            return el.classList.contains(this.containerClass);
          });

          // параметры контейнера
          const box = container.firstChild.getBoundingClientRect();

          // размещение тултипа -->

          // сверху
          if (this.direction === "top") {
            this.top = this.getTop(box.top, height);
          }

          // снизу
          else if (this.direction === "bottom") {
            this.top = this.getBottom(box.top, height);
          }

          // справа
          else if (this.direction === "right") {
            this.top = this.getCenter(box.top);
            this.setArrowRightLeft(height);

            // можно ли разместить тултип справа, если можно то размещаем
            if (this.haveFreeSpaceRight(box, width)) {
              this.left = this.getLeft(box);
              this.arrowDirection = "right";
            }
            // если нет, размещаем в противоположном
            else {
              this.arrowDirection = "left";
              this.rotateImage = true;
              this.left = this.getRight(box, width);
            }
          }

          // слева
          else if (this.direction === "left") {
            this.top = this.getCenter(box.top);
            this.setArrowRightLeft(height);

            // можно ли разместить тултип слева, если можно то размещаем
            if (this.haveFreeSpaceLeft(box, width)) {
              this.arrowDirection = "left";
              this.rotateImage = true;
              this.left = this.getLeft(box);
            }
            // если нет, размещаем в противоположном
            else {
              this.arrowDirection = "right";
              this.left = this.getRight(box, width);
            }
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

    setArrowRightLeft(height) {
      this.borderBottomWidth = 17 + "px"; // height / 2 + "px";
      this.borderTopWidth = 17 + "px"; // height / 2 + "px";
    },

    getTop(containerHeight, elementHeight) {
      return containerHeight - elementHeight + pageYOffset;
    },

    getCenter(containerHeight) {
      return containerHeight + pageYOffset + 5; // 5 для выравнивания
    },

    getBottom(containerHeight, elementHeight) {
      return containerHeight + elementHeight + pageYOffset;
    },

    getLeft(container) {
      return container.left + pageXOffset + container.width * 2; // 20 просто на глаз, можно поменять
    },

    getRight(container, elementWidth) {
      return (
        container.left + pageXOffset - container.width / 2 - elementWidth - 20
      );
    },

    haveFreeSpaceRight(container, elementWidth) {
      return window.innerWidth - container.x > elementWidth + 100;
    },

    haveFreeSpaceLeft(container, elementWidth) {
      return container.x < elementWidth + 100;
    }
  }
};
</script>

<style lang="sass" scoped>
.wrapper-tooltip

.tooltip
  padding: .5rem 1rem
  background-color: $WhiteGrey
  position: absolute
  z-index: 999
  box-shadow: 0px 1px 2px rgba(8, 35, 48, 0.24), 0px 2px 6px rgba(8, 35, 48, 0.16)

  .arrow
    position: absolute
    top: 0

    border-top: 1rem solid transparent
    border-bottom: 1rem solid transparent

  &.left .arrow
    right: -2rem
    border-left: 2rem solid $WhiteGrey

  &.right .arrow
    left: -2rem
    border-right: 2rem solid $WhiteGrey

  &-text
    display: flex
    flex-flow: row nowrap

    .pic
      position: absolute
      z-index: -1
      width: 100%
      height: 100%
      box-sizing: border-box
      top: .2rem
      left: -.5rem

      &.rotate
        left: .5rem
        transform: rotateY(180deg)
</style>
