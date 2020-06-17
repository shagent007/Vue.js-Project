<template lang="pug">
.gg_notification
	//- кнопка которое сварачивает и разварачивает
	.slot_wrap(@click="show")
		slot

	//- список
	.notification(:class="{'active': isShow}")
		.not_title 
			b Уведомления
		.item_group
			router-link.item(:to="item.link" v-for="(item,index) in data" :key="index") 
				//- Эмблема
				img.emblema(:src="require('../../assets/img/'+item.emblema)")
				
				//- Текст
				.text
					span.message {{item.title}} (  
						i.blue нажмите на видео, чтобы посмотреть
					| )
				
				//- Картинка
				.news
					//- Если видео
					img.videoButton(v-if="isVideo" src="@/assets/VideoUI/play_button.svg")
					img.newsImg(:src="require('../../assets/img/'+item.img)")
</template>

<script>
export default {
  name: "gg-notification",
  props: {
    data: Array
    /*
			data:[{
				emblema: string (path to image),
				title: string
				link: strint 
				isVideo: Boolean
				img: string (path to image),
			}]	
		*/
  },
  data: () => {
    return {
      isShow: false,
      isVideo: true
    };
  },
  methods: {
    show() {
      this.isShow = !this.isShow;
    }
  }
};
</script>

<style lang="sass" scoped>
.gg_notification
	position: relative

.notification
	position: absolute
	top: 100%
	right: 0px
	transition: height ease 1s
	overflow-x: auto
	height: 0px
	z-index: 140
	background-color: $White
	box-shadow: 0px 6px 12px rgba(8, 35, 48, 0.14), 0px 16px 24px rgba(8, 35, 48, 0.08)
	width: 740px
	@media screen and (max-width: 800px)
		width: 568px
	@media screen and (max-width: $PhoneWidth)
		width: 350px
	@media screen and (max-width: 350px)
		width: 280px
	&.active
		height: 350px
.not_title
	padding: 1rem
	border-bottom: 1px solid #E0E0E0
.item_group
	padding: 0rem 1rem

.item
	display: flex
	align-items: center
	border-bottom: 1px solid #E0E0E0
	padding: 2rem 0rem
// Эмблема
.emblema
	width: 2rem
	margin-right: 1rem
	display: flex
	align-items: center
// Текс
.text
	margin-right: 1rem
	+afs(14px, 14px, 12px)
.message
	color: $Black
.blue
	color: $Blue

.news
	position: relative
	display: flex
	align-items: center
	@media screen and ( max-width: $PhoneWidth )
		display: none !important
.videoButton
	position: absolute
	top: 50%
	left: 50%
	width: 1rem
	transform: translate(-50%, -50%)

// Картинка
.newsImg
	width: 100px
</style>
