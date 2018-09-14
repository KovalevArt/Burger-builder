import * as actionTypes from './actions';

const initialState = {
	ingredients: {
		salad: 0,
		bacon: 0,
		meat: 0,
		cheese: 0
	},
	totalPrice: 100,
};

const INGREDIENT_PRICE = {
	salad: 15,
	cheese: 25,
	meat: 50,
	bacon: 40,
}

//не нужен break, т.к. мы все возвращаем в любом случае.
const reducer = ( state = initialState, action) => {
	switch (action.type) {
		case actionTypes.ADD_INGREDIENT: 
			return {
				...state,
				ingredients: {
					...state.ingredients,
					[action.ingredientName]: state.ingredients[action.ingredientName] + 1
				},
				totalPrice: state.totalPrice + INGREDIENT_PRICE[action.ingredientName]
			};
		case actionTypes.REMOVE_INGREDIENT:
			return {
				...state,
				ingredients: {
					...state.ingredients,
					[action.ingredientName]: state.ingredients[action.ingredientName] - 1
				},
				totalPrice: state.totalPrice - INGREDIENT_PRICE[action.ingredientName]
			};
		default:
			return state;
	}
};

export default reducer;