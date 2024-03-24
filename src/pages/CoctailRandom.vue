<script  setup>
import axios from 'axios';
import { computed, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router'
import AppLayout from '@/components/AppLayout.vue';
import { COCTAIL_RANDOM_URL, INGRIDIENT_COCTAIL_RANDOM_URL } from '@/constants/api'
import { Swiper, SwiperSlide } from 'swiper/vue';
import { Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
modules:[Pagination]
const coctail = ref('');
const route = useRoute();
const router = useRouter();

const ingredients = computed(()=>{
    const ingredients = Array.from({ length: 15 }, (_, i) => {        
        if (!coctail.value[`strIngredient${i + 1}`]) return null;
        const ingredient = coctail.value[`strIngredient${i + 1}`];
        return ingredient;
    }).filter(ingredient => ingredient !== null);

    return ingredients;
})

async function getCoctail() {
    try {
        const { data } = await axios.get(`${COCTAIL_RANDOM_URL}`)       
        coctail.value = data.drinks[0]                                 
    } catch(err){
        console.log('err:',err);
    }
}
getCoctail();

const goBack =()=>{router.go(-1)}

</script>

<template>
    <div v-show="coctail">
        <AppLayout :imgUrl="coctail.strDrinkThumb" :backFunc="goBack" :is-back-button-visible="true">
            <div class="info">
                <h1 class="title --line">{{ coctail.strDrink }}</h1>
                <div class="slider">
                    <swiper
                        class="slider__swiper"
                        :slides-per-view="2"
                        :space-between="50"
                        :pagination="{ clickable: true }"
                    >
                        <swiper-slide
                            v-for="ingredient in ingredients"
                            :key="ingredient"
                        >
                            <div class="slider__slide">
                                <img class=' lazy' width='100' height='100' :src='`${INGRIDIENT_COCTAIL_RANDOM_URL}${ingredient}-Small.png`' :alt='`${ingredient}`' :title='`${ingredient}`'>
                                <h4 class="slider__title">{{ ingredient }}</h4>
                            </div>
                        </swiper-slide>                       
                    </swiper>
                </div>
                <div class="info__insturction">
                    <p>{{ coctail.strInstructions }}</p>
                </div>
            </div>
        </AppLayout>   
    </div>
</template>

<style lang="scss" scoped>
@import '../assets/styles/main';

.info__list {
    width: 50%;
    li {
        background-image: url('./../assets/img/heart.svg');
        background-repeat: no-repeat;
        background-position: 0px 0px; /* x y*/
        background-size: auto; /* w h*/
        padding-left: 35px;
        font-size: 18px;
        &:not(:last-child) {
            margin-bottom: 20px;
        }
    }
}
.slider__swiper {
    max-width: 500px;
    @media(max-width: 480px){
        max-width: 280px;
    }
}
.slider__slide {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 20px;
}

.slider__title {
    text-align: center;
    font-size: 18px;
    color: $text;
}
</style>