<template>
  <main-layout>
    <div class="contact">
      <div class="container">
        <div class="main-title">наши контакты</div>

        <div class="img-text">
          <img src="@/assets/ui/Smartphone 1 (1).svg" alt />
          <div class="text">
            Контактный телефон:
            <a class="blue" href="tel:+ 79160068882">+ 7 (916) 006-88-82</a>
          </div>
        </div>

        <div class="img-text">
          <img src="@/assets/ui/mail (1) 1.svg" alt />
          <div class="text">
            Наш e-mail:
            <a class="blue" href="mailto:Iideryupravlenia@yandex.ru"
              >Iideryupravlenia@yandex.ru</a
            >
          </div>
        </div>

        <div class="img-text">
          <img src="@/assets/ui/gps 1.svg" alt />
          <div class="text">
            Наш адрес:
            <span class="blue">г. Москва, ул. Большая Филевская, д. 29</span>
          </div>
        </div>

        <div class="bottom-block">
          <div class="title">
            <div class="inner">
              <div class="text">Руководитель Проекта ЛУ:</div>
              <div class="blue">Стрекаловская Мирослава Владимировна</div>
            </div>
          </div>
          <div class="mira">
            <img src="@/assets/img/Photo.png" alt srcset />
          </div>
        </div>
      </div>
      <iframe
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2245.82595269811!2d37.48507931548839!3d55.74415300012707!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x46b5494e1b9911eb%3A0x86a18b4ee443ac2!2z0YPQuy4g0JHQvtC70YzRiNCw0Y8g0KTQuNC70LXQstGB0LrQsNGPLCAyOSwg0JzQvtGB0LrQstCwLCAxMjEzMDk!5e0!3m2!1sru!2sru!4v1590964248311!5m2!1sru!2sru"
        width="100%"
        height="450"
        frameborder="0"
        style="border:0;"
        allowfullscreen=""
        aria-hidden="false"
        tabindex="0"
      ></iframe>
    </div>
  </main-layout>
</template>

<script>
export default {
  name: "contact"
};
</script>

<style lang="sass" scoped>
.main-title
	text-transform: uppercase
	font-weight: 600
	margin: 2rem 0rem
	+afs(36px, 32px, 26px)

.img-text
	display: flex
	margin-bottom: 2rem
	align-items: center
	font-weight: 500
	+afs(24px, 20px, 18px)
	img
		width: 70px
		border-radius: 50%
		margin-right: 2rem

.blue
	color: $Blue

.bottom-block
	display: flex
	align-items: center
	+afs(24px, 22px, 20px)
	.title
		flex: 1
		display: flex
		justify-content: center
	.mira
		max-width: 260px
		img
			width: 100%
	@media screen and ( max-width: $TableWidth )
		flex-direction: row-reverse
	@media screen and ( max-width: $PhoneWidth )
		flex-direction: column-reverse
		text-align: center

.map
	width: 100%
	margin-top: 2rem

// .map
// 	background-image: url('../../assets/img/Map.jpg')
// 	background-size: cover
// 	background-repeat: no-repeat
// 	background-position: center
// 	height: 800px
// 	width: 100%
</style>
