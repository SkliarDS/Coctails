<script  setup>
import axios from 'axios';
import { computed, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router'
import AppLayout from '@/components/AppLayout.vue';
import { COCTAIL } from '@/constants/api'

const coctail = ref('');
const route = useRoute();
const router = useRouter();
const coctailId = computed(()=>route.path.split("/").pop());

const ingredients = computed(()=>{
//     const ingredients = [];
//     for(let i = 1; i <= 15; i++){
//         let ingredient = {};
//         if(!coctail.value[`strIngredient${i}`]) break;
//         ingredient.name = coctail.value[`strIngredient${i}`];
//         ingredient.quantity = coctail.value[`strIngredient${i}`];
        
//         ingredients.push(ingredient);
//     }

    const ingredients = Array.from({ length: 15 }, (_, i) => {
        const ingredient = {};
        if (!coctail.value[`strIngredient${i + 1}`]) return null;
        ingredient.name = coctail.value[`strIngredient${i + 1}`];
        ingredient.quantity = coctail.value[`strMeasure${i + 1}`];
        return ingredient;
    }).filter(ingredient => ingredient !== null);

    return ingredients;
})
async function getCoctail() {
    try {
        const { data } = await axios.get(`${COCTAIL}${coctailId.value}`)       
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
                <ul v-show="ingredients" class="info__list">
                    <li v-for="ingredient in ingredients" :key="ingredient">
                        <span>{{ ingredient.name }}</span><span v-if="ingredient.quantity">&nbsp; | &nbsp;{{ ingredient.quantity }}</span>                        
                    </li>
                </ul>
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
    max-width: 500px;
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

</style>