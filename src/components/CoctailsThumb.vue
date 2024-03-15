<script setup>
const prop = defineProps({
    coctail: {
        type: Object,
        requered: true
    }    
})
</script>

<template>
    <RouterLink :to="`/coctails/${coctail.idDrink}`">
        <div class="coctail-thumb">
            <div class="coctaile-thumb__image">
                <img class=' lazy' width='120' height='120' :src='coctail.strDrinkThumb' :alt='coctail.strDrink' :title='coctail.strDrink'>
            </div>
            <h4 class="coctaile-thumb__name">{{ coctail.strDrink }}</h4>
        </div>
    </RouterLink>
</template>

<style lang="scss" scoped>
@import '../assets/styles/main';
.coctail-thumb {
    display: flex;
    align-items: center;
    justify-content: space-between;
    flex-direction:column;
    gap: 20px;
    height: 100%;
    width: 100%;
    cursor: pointer;
}
.coctaile-thumb__image {
    width: 120px;
    height: 120px;
    img {
        width: 100%;
        height: 100%;
        object-fit: cover;
    }

}
.coctaile-thumb__name {
    text-align: center;
    line-height: 19px;
    color: $textAccent;
}
</style>