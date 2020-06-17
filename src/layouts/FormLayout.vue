<template lang="pug">
.dialogue
    form(novalidate :name="nameForm")
        .theme {{dialogue.theme}} 
        slot(name="content") 
        slot(name="bottom")  
</template>

<script>
export default {
  name: "dialogue-layout",
  props: {
    nameForm: String,
    dialogue: Object
  }
};
</script>

<style lang="sass">


.dialogue
    width: 100%
    display: grid
    padding: 2rem 0rem
    align-items: center
    justify-items: center
    background-repeat: no-repeat
    background-size: cover
    background-position: center
    background-attachment: fixed

    @media screen and (max-width: $TableWidth)
        background-image: url('../assets/img/background720.jpg')

    @media screen and (min-width: $TableWidth)
        background-image: url('../assets/img/background1080.jpg')

    form
        width: 600px
        background-color: $White
        display: grid
        grid-gap: 1rem
        padding: 2rem
        height: auto
        box-shadow: 0px 6px 12px rgba(8, 35, 48, 0.14), 0px 16px 24px rgba(8, 35, 48, 0.08)
        .theme
            +afs(36px, 30px, 24px)
            text-shadow: 0px 1px 2px rgba(8, 35, 48, 0.24), 0px 2px 6px rgba(8, 35, 48, 0.16)

        .content
            justify-content: normal
            display: grid
            grid-gap: 1.5rem
            justify-content: inherit
            .label
                font-size: 18px
                color: $Grey
            .text
                display: flex
                justify-content: space-between
                font-size: 20px
                .reg
                    color: $Red
                    text-decoration: none

            .fogotPassword
                margin-top: .5rem
                display: block
                text-decoration: none

            .group-2, .group-3
                display: grid
                grid-gap: 1rem
                height: auto

            .group-2
                grid-template-columns: 1fr 1fr
            .group-3
                grid-template-columns: 1fr 1fr 1fr



        .bottom
            display: grid
            justify-self: center
            text-decoration: none
            text-align: center
            color: $Black

    @media screen and ( max-width: $TableWidth )
        padding: 2rem 1rem !important
        box-sizing: border-box
        form
            box-sizing: border-box
            width: 100%

            .content
                margin: 0px !important
                .text
                    display: block
                    .reg
                        margin-top: 1rem
                        display: block
</style>
