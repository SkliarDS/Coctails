import axios from 'axios'
import { defineStore } from 'pinia'
import { INGRIDIENTS_URL, COCTAIL_INGREDIENTS_URL, COCTAIL } from '@/constants/api'

export const useRootStore = defineStore('root', {
	state: ()=>({
		ingredients: [],
		coctails: [],
		ingredient: null,
		coctail: []
	}),
	actions: {
		async getIngredients() {
			try {
				const { data } = await axios.get(`${INGRIDIENTS_URL}`)
				this.ingredients = data.drinks
			} catch(err){
				console.log('err:',err);
			}
		},
		async getCoctails(ingredient) {
			try {
				const { data } = await axios.get(`${COCTAIL_INGREDIENTS_URL}${ingredient}`)
				this.coctails = data.drinks			
			} catch(err){
				console.log('err:',err);
			}
		},
		setIngredient(val){
			this.ingredient = val;
		},
		
	}
})
