<template>
  <main-layout>
    <div class="container">
      <div class="order-banner">
        <img src="@/assets/img/how_to_order.png" />
      </div>
      <div class="oreder-title">Как сделать заказ</div>
      <div class="subtitle-blue">
        Для того, чтобы оформить заказ, Вам необходимо совершить несколько
        простых действий:
      </div>
      <div class="ol">
        <div class="li">
          1. Выбираем услуги
          <div class="ld">
            <div class="text">
              Последовательно выберите интересующую Вас группу товаров (
              например, Электроинструмент – Дрели – Дрели безударные ). Для Вас
              откроется страница, где представлены товары с указанием цены, а
              также небольшой фотографией и несколькими наиболее важными
              характеристиками. Нажав на ссылку где указана модель товара, Вы
              сможете ознакомиться с самым подробным списком интересующих Вас
              характеристик.
            </div>
            <div class="text">
              Сложно выбрать из нескольких понравившихся моделей? Рядом с
              интересующим Вас товаром нажмите на кнопку "Сравнить"и выберите
              товар для сравнения. Перед вами появится список параметров товара
              в удобном для сравнения виде.
            </div>
          </div>
        </div>
        <div class="li">
          2. Оформляем заказ
          <div class="ld">
            Для завершения оформления заказа Вам необходимо нажать на кнопку
            «Оформить заказ», ввести свои контактные данные. После нажатия
            кнопки "Отправить заказ", он будет передан для оформления нашему
            менеджеру, после чего он сам Вам перезвонит и уточнит все детали
            заказа.
          </div>
        </div>
        <div class="li">
          3. Получаем ответ
          <div class="ld">
            При поступлении Вашего заказа, наш менеджер свяжется с Вами для
            уточнения места, даты и времени доставки.
          </div>
        </div>
        <div class="li bmargin">
          Вы также можете самостоятельно связаться с оператором для оформления
          заказа по телефону:
          <div class="ld">
            <div class="text">Для физических лиц: 8 (800) 555-83-28</div>
            <div class="text">Для юридических лиц: 8 (800) 555-83-28</div>
          </div>
        </div>
        <div class="li">Приятных Вам покупок!</div>
      </div>
    </div>
  </main-layout>
</template>

<script>
export default {
  name: "how-to-order"
};
</script>

<style lang="sass" scoped>
.order-banner
  max-width: 620px
  margin: 2rem auto
  text-align: center
  img
    width: 100%

.oreder-title
  +afs(36px, 30px, 26px)
  font-weight: 600
  margin-bottom: 2rem

.subtitle-blue
  color: $Blue
  +afs(24px, 22px, 20px)
  font-weight: 500
  margin-bottom: 2rem

.li
  +afs(24px, 20px, 16px)
  font-weight: 500
  margin-bottom: 1rem

.ld
  +afs(18px, 16px, 14px)
  padding-left: 1rem
  margin: 1rem 0rem
  font-weight: normal

.text
  margin-bottom: .5rem

.bmargin
  margin-top: 3rem
</style>
