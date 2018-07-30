import React, { Component } from 'react';

import Aux from '../../hoc/AuxReact';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';

const INGREDIENT_PRICE = {
	salad: 15,
	cheese: 25,
	meat: 50,
	bacon: 40,
}

class BurgerBuilder extends Component {
//	constructor(props) {
//		super(props);
//		this.state = {...}
//	} или как ниже
	state = {
		ingredients: {
			salad:0,
			bacon:0,
			cheese:0,
			meat:0
		},
		totalPrice: 100,
		purchaseable: false,
		purchasing: false,

	}

	updatePurchaseState (ingredients) {

		const sum = Object.keys(ingredients)
			.map(igKey => {
				return ingredients[igKey];
			})
			.reduce((sum, el) =>{
				return sum + el;
			}, 0);
		this.setState({
			purchaseable: sum > 0
		});
	}

	addIngredientHandler = (type) => {
		const oldCount = this.state.ingredients[type];
		const updatedCount = oldCount + 1;
		const updatedIngredients = {
			...this.state.ingredients
		};
		updatedIngredients[type] = updatedCount;
		const priceAdditin = INGREDIENT_PRICE[type];
		const oldPrice = this.state.totalPrice;
		const newPrice = oldPrice + priceAdditin;
		this.setState({
			totalPrice: newPrice,
			ingredients: updatedIngredients,
		});
		this.updatePurchaseState(updatedIngredients);
	}

	purchaseHandler = () => {
		this.setState({
			purchasing:true,
		});
	}

	removeIngredientHandler = (type) => {
		const oldCount = this.state.ingredients[type];
		if (oldCount <= 0) {
			return;
		}
		const updatedCount = oldCount - 1;
		const updatedIngredients = {
			...this.state.ingredients
		};
		updatedIngredients[type] = updatedCount;
		const priceDeduction = INGREDIENT_PRICE[type];
		const oldPrice = this.state.totalPrice;
		const newPrice = oldPrice - priceDeduction;
		this.setState({
			totalPrice: newPrice,
			ingredients: updatedIngredients,
		});
		this.updatePurchaseState(updatedIngredients);
	}

	purchaseCancelHandler = () => {
		this.setState({
			purchasing: false
		});
	}

	purchaseContinueHandler = () => {
		alert('Продолжаем!');
	}

	render() {
		const disabledInfo = {
			...this.state.ingredients
		};
		for ( let key in disabledInfo) {
			disabledInfo[key] = disabledInfo[key] <= 0 
		}
		return (
			<Aux>
				<Modal 
					show = {this.state.purchasing}
					modalClosed = {this.purchaseCancelHandler} >
					<OrderSummary 
						ingredients = {this.state.ingredients}
						purchaseCanceled = {this.purchaseCancelHandler}
						purchaseContinue = {this.purchaseContinueHandler}
						price = {this.state.totalPrice} />
				</Modal>
				<Burger 
					ingredients = {this.state.ingredients} />
				<BuildControls
					ingredientAdded = {this.addIngredientHandler} 
					ingredientRemoved={this.removeIngredientHandler}
					disabled = {disabledInfo}
					purchaseable = {this.state.purchaseable}
					ordered = {this.purchaseHandler}
					price = {this.state.totalPrice} />
			</Aux>
		);
	}
}

export default BurgerBuilder;