<template lang="pug">
.wrapper
  .account-item-header
    .wallet
      .title {{ACCOUNT_FINANCE.title}}
      .bottom
        .balance
          span.titleb {{ACCOUNT_FINANCE.balance}}
          span.contentb {{ balance }}
        .balls
          span.titleb {{ACCOUNT_FINANCE.balls}}
          span.contentb 15
    .button-group
      .wrap
        gg-button(color="red" :reverse="true") {{ACCOUNT_FINANCE.btnGroup[0]}}
        gg-button(color="blue" :reverse="true") {{ACCOUNT_FINANCE.btnGroup[1]}}
      .wrap
        gg-button(color="black" :reverse="true") {{ACCOUNT_FINANCE.btnGroup[2]}}
        gg-button(color="deepRed") {{ACCOUNT_FINANCE.btnGroup[3]}}
  .content
    .title {{ACCOUNT_FINANCE.tableTitle}}
    gg-table(:headers="headers", :data="rows")

</template>

<script>
import GgButton from "@/components/Base/GgButton";
import GgTable from "@/components/Base/GgTable";

import { mapGetters } from "vuex";
export default {
  name: "finance",
  data() {
    return {
      headers: [
        {
          name: "Номер операции",
          value: "numer",
          minWidth: 200
        },
        {
          name: "Сумма",
          value: "sum",
          minWidth: 200
        },
        {
          name: "Вид операции",
          value: "type",
          minWidth: 200
        },
        {
          name: "Дата",
          value: "date",
          minWidth: 200
        }
      ],

      rows: new Array(12).fill({
        numer: "#00001",
        sum: "1002",
        date: "01.01.2017 г.",
        type: "Оплата"
      })
    };
  },
  computed: {
    balance() {
      const intl = new Intl.NumberFormat("ru", {
        style: "currency",
        currency: "RUB",
        minimumFractionDigits: 0
      });
      return intl.format(123);
    },
    ...mapGetters("staticData", ["ACCOUNT_FINANCE"])
  },
  components: {
    GgTable,
    GgButton
  }
};
</script>

<style lang="sass" scoped>
.wrapper
  display: flex
  width: 100%
  flex-flow: column wrap

.account-item-header
  display: flex
  flex-flow: column nowrap
  width: 100%
  box-sizing: border-box

  @media screen and (max-width: $TableWidth)
    justify-content: space-between

.button-group, .wrap, .wallet
  display: flex
  justify-content: space-between

.button-group, .wallet
  padding: 30px
  height: 50%
  flex-flow: column nowrap
  flex: 1
  @media screen and (max-width: $TableWidth)
    margin: 0 40px
    padding: 0
  @media screen and (max-width: $DesktopWidth)
    padding: 0
    margin: auto

.button-group

  button
    width: 370px

    @media screen and (max-width: $PhoneWidth)
      margin: 15px auto
      width: 100%

    @media screen and (max-width: $TableWidth)
      width: 100%
      margin-top: 15px
      padding-left: 10px
      padding-right: 10px

    @media screen and (max-width: $DesktopWidth)
      margin-top: 15px
.wrap
  flex-flow: row nowrap
  @media screen and (max-width: $TableWidth)
    flex-flow: column nowrap
  @media screen and (max-width: $DesktopWidth)
    margin: auto

.button-group, .wrap
  @media screen and (max-width: $TableWidth)
    padding: 0 20px
    width: 100%
    box-sizing: border-box
  @media screen and (max-width: $DesktopWidth)
    flex-flow: column nowrap

.wallet
  .bottom
    display: flex
    flex-flow: column nowrap

    @media screen and (min-width: $DesktopWidth)
      flex-flow: row nowrap

  .title, .balance, .balls
    @media screen and (max-width: $TableWidth)
      padding-bottom: 10px

  .title
    +afs(24px, 20px, 20px)
    font-weight: 500
    text-transform: uppercase


  .balance, .balls
    width: 100%
    +afs(24px, 20px, 18px)
    display: flex
    justify-content: center

    @media screen and (max-width: $PhoneWidth)
      width: 50%

    @media screen and (max-width: $DesktopWidth)
      display: flex
      justify-content: space-between

    .titleb
      color: $Grey
      font-weight: 400
    .contentb
      font-weight: 500
      padding-left: 3rem

.content
  display: flex
  flex-flow: column nowrap
  width: 100%

  .title
    +afs(24px, 24px, 20px)
    font-weight: 500
    padding: 40px 40px 0
    text-transform: uppercase

/deep/ table.table
  padding: 50px
  @media screen and (max-width: $PhoneWidth)
    padding: 6px
  @media screen and (max-width: $TableWidth)
    padding: 30px
</style>
