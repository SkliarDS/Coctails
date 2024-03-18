<script setup>
import { computed } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { ROUTES_PATHS } from '../constants/router'

const props = defineProps({
    imgUrl: {
        type: String,
        required: true,
    },
    backFunc: {
        type: Function,
        requered: true
    },
    isBackButtonVisible: {
        type: Boolean,
        difault: true
    } 
})
const route = useRoute()
const router = useRouter()
const routeName = computed(()=> route.name )

const goToRandomCoctail=()=>{
    router.push(ROUTES_PATHS.COCTAIL_RANDOM)
    if(routeName.value === ROUTES_PATHS.COCTAIL_RANDOM){
        router.go();
    }
}

</script>

<template>
    <main class="main">
        <section class="main__bg" :style="`background-image: url(${imgUrl})`"></section>
        <section class="main__content content">
            <div class="content__header">             
                <button class="content__array" @click="backFunc" v-show="isBackButtonVisible"><img class=' lazy' width='40' height='40' src='../assets/img/arrow.svg' alt='' title=''></button>               
                <el-button @click="goToRandomCoctail" class="btn">Get random cocktail</el-button>                
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
    margin-left: auto;
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