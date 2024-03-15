<script setup>

const props = defineProps({
    imgUrl: {
        type: String,
        required: true,
    },
    coctail: {
        type: Object,
        requered: true
    } 
})
</script>

<template>
    <main class="main">
        <section class="main__bg" :style="`background-image: url(${imgUrl})`"></section>
        <section class="main__content content">
            <div class="content__header">
                <!-- <RouterLink to="/">
                    <div class="content__array" v-show="$route.path !== '/home' || coctail.idDrink"><img class=' lazy' width='40' height='40' src='../assets/img/arrow.svg' alt='' title=''></div>
                </RouterLink> -->
                <el-button class="btn">Get random cocktail</el-button>                
            </div>
            <div class="content__body">
                <slot></slot>
            </div>
        </section>
    </main>
</template>

<style lang="scss" scoped>
@import '../assets/styles/main';
.main {
    display: grid;
    grid-template-columns: 1fr 1fr;
    background-color: $bg;
    height: 100vh;
}
.main__bg {
    height: 100%;
    background-repeat: no-repeat;
    background-position: center; 
    background-size: cover; 
}
.main__content {
    height: 100%;
    padding: 32px 40px;
    background-color: $bg;
}
.content__header {
    display: flex;
    justify-content: space-between;;
}
.content__array {

}
.btn {
    background-color: $color;
    color: $text;
    padding: 0 20px;
    @media (hover: hover){
        &:hover, &:active {
            background-color: darken($color, 10%);
        }
    }
    
}
.content__body {
    padding-top: 100px;
}
</style>