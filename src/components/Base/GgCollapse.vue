<template lang="pug">
.Collapse(
	:class="{ active }"
)

	.Collapse__header(
		@click="active = !active"
	)

		.Collapse__title 
			span.Collapse__title-chevron
				img(
					src="@/assets/ui/chevron-right.svg"
					height="100%"
				)

			span.Collapse__title-text {{ title }}

		.Collapse__icon
			slot(name="icon")

	.Collapse__content(v-if="active")
		hr.Collapse__content-hr

		slot
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      required: true
    },
    activeTab: {
      type: Boolean,
      required: false,
      default: false
    }
  },

  data() {
    return {
      active: this.activeTab
    };
  }
};
</script>

<style lang="sass" scoped>
/* контейнер */
.Collapse
	width: 100%
	box-sizing: border-box

	display: flex
	flex-flow: column nowrap

	background-color: $White
	box-shadow: 0px 4px 8px rgba(8, 35, 48, 0.16), 0px 8px 16px rgba(8, 35, 48, 0.1)

	border-radius: 4px
	border: 1px solid transparent

/* контент раскрыт */
.Collapse.active
	box-shadow: none
	border: 1px solid $LightGrey

.Collapse.active .Collapse__title-text
	color: $Black

.Collapse.active .Collapse__title-chevron
	transform: rotate(90deg)

/* заголовок */
.Collapse__header
	padding: 10px
	display: flex
	justify-content: space-between
	cursor: pointer

/* шеврон с заголовком */
.Collapse__title
	display: flex
	align-items: center

/* шеврон */
.Collapse__title-chevron
	height: 10px
	display: flex
	justify-content: center
	align-items: center

/* текст заголовка */
.Collapse:hover .Collapse__title-text
	color: $Black

.Collapse__title-text
	color: $Grey
	font-size: 20px
	letter-spacing: 0.15px
	padding-left: 10px

/* контент */
.Collapse__content
	padding: 20px

/* разделитель */
.Collapse__content-hr
	margin: 0 0 30px
</style>
