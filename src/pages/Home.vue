<script  setup>
    import AppLayout from '@/components/AppLayout.vue';
    import CoctailsThum from '../components/CoctailsThumb.vue'
    import { useRootStore } from '@/stores/root';
    import { storeToRefs } from 'pinia';


    const rootStore = useRootStore();
    rootStore.getIngredients();
    const { ingredients, coctails, ingredient } = storeToRefs(rootStore);  

    const changeIngredient =()=>{
        rootStore.getCoctails(rootStore.ingredient);
    }
    const resetIndredient =()=>{
        rootStore.setIngredient(null);
    }
</script>

<template>
    <AppLayout :imgUrl="`https://www.thecocktaildb.com/images/media/drink/vysuyq1441206297.jpg`" :backFunc="resetIndredient" :is-back-button-visible="!!ingredient">
        <div v-if="!ingredient || !coctails" class="info">
            <h1 class="title --line">Choose your drink</h1>
            <div class="info__drobdown">
                <el-select
                    v-model="rootStore.ingredient"
                    placeholder="Choose main ingredient"
                    size="large"
                    style="width: 300px"
                    filterable
                    allow-create
                    @change="changeIngredient"
                    >
                    <el-option
                        v-for="item in ingredients"
                        :key="item.strIngredient1"
                        :label="item.strIngredient1"
                        :value="item.strIngredient1"
                    />
                </el-select>
            </div>
            <div class="info__desc">
                <p>Try our delicious cocktail recipes for every occasion. Find delicious cocktail recipes by ingredient through our cocktail generator.</p>
            </div>
            <div class="info__image">
                <img class=' lazy' width='345' height='120' src='../assets/img/more_glass.png' alt='' title=''>
            </div>
        </div>

        <div v-else class="info">
            <h1 class="title --line">COCKTAILS WITH {{ ingredient }}</h1>
            <div class="info__coctails">
                <CoctailsThum 
                    v-for="coctail in coctails" 
                    :key="coctail.idDrink"
                    :coctail="coctail"
                />
            </div>
        </div>
    </AppLayout>
</template>

<style lang="scss" scoped>
    @import '../assets/styles/main';

</style>