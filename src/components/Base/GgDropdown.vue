<template lang="pug">
div.drop-wrap(:class="containerClass")
  .confirm(
    v-if="show" 
    ref="modal"
    :style="{ top, left }" 
    :class="{ arrow }"
  )
    slot(name="content")

  .content-button(@click.stop="showModal")
    slot
</template>

<script>
export default {
  data() {
    return {
      containerClass: "dropdown-wrapper",
      show: false,
      top: 0,
      left: 0
    };
  },

  props: {
    appendBody: {
      type: Boolean,
      default: false
    },
    arrow: {
      type: Boolean,
      default: false
    },
    direction: {
      type: String,
      default: "bottom",
      validator(dir) {
        return [
          "bottom"
          // "top" и т.д., пока только снизу
        ].includes(dir);
      }
    }
  },

  mounted() {
    this.handleClose();
  },

  methods: {
    handleClose(event) {
      if (!this.show) {
        setTimeout(() => {
          document.body.addEventListener("click", this.handleClose);
        }, 0);
      } else {
        const check = event.path.filter(element => element == this.$refs.modal);

        if (!check.length) {
          document.body.removeEventListener("click", this.handleClose);
          this.closeModal();
        }
      }
    },

    showModal(event) {
      if (this.show) {
        return (this.show = false);
      }

      this.handleClose();
      this.show = true;

      this.$nextTick(() => {
        const modal = this.$refs.modal;

        // ширина и высота модалки
        const width = modal.clientWidth;
        const height = modal.clientHeight;

        // контейнер,  около которого надо вывести модалку
        const container = event.path.find(el => {
          return el.classList.contains(this.containerClass);
        });
        const box = container.getBoundingClientRect();

        console.log(modal, box);
        // проверка на то что элемент не вызывался и у него не выставлены координаты
        // потому что на второй раз width и height почему то равны 0
        if (!this.top && !this.left) {
          if (this.appendBody) {
            this.top = box.top + box.height + 10; // 10 просто на глаз, отступ
            this.left = box.left + 5 - width * 2 - box.width / 2; // 5 тоже вроде на глаз
            document.body.appendChild(modal);
          } else {
            this.top = box.y;
            // очень сложные математические расчеты
            this.left = 0 - width / 2 + box.width / 2;
          }

          if (!this.arrow) {
            this.top -= height / 2 - box.height;
            this.left -= width / 2;
          }

          this.top += "px";
          this.left += "px";
        }
      });
    },
    closeModal() {
      this.show = false;
    }
  }
};
</script>

<style lang="sass" scoped>
.drop-wrap
  position: relative

.confirm-wrapper
  position: relative
  z-index: 998

.confirm
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.24), 0px 4px 8px rgba(0, 0, 0, 0.16)
  border-radius: 3px
  padding: 1rem
  position: absolute
  z-index: 999
  background-color: $White

  &.top
    top: 150%

    &::after
      bottom: calc(100% - 15px)
      box-shadow: -3px -3px 4px rgba(0, 0, 0, 0.24)

.confirm.arrow::after
  box-shadow: -4px -4px 4px rgba(0, 0, 0, 0.05)
  content: ""
  width: 30px
  height: 30px
  position: absolute
  background-color: $White
  top: -15px
  left: calc(50% - 15px)
  transform: rotate(45deg)
  z-index: -1

.button-group, .title
  display: flex
  justify-content: space-between

.button
  margin: 0 1rem
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
