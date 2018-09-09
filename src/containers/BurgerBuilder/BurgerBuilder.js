import React, { Component } from 'react';

import Aux from '../../hoc/AuxReact/AuxReact';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';

import axios from '../../axios-orders';

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
		ingredients: null,
		totalPrice: 100,
		purchaseable: false,
		purchasing: false,
		loading: false,
		error: false

	}

	componentDidMount() {
		axios.get('https://react-burger-1b46e.firebaseio.com/ingredients.json')
			.then(response => {
				this.setState({
					ingredients: response.data
				})
			})
			.catch(error => {
				this.setState({
					error: true
				});
			});
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
		//alert('Продолжаем!');
		this.setState({
			loading: true
		});
		const order = {
			ingredients:this.state.ingredients,
			price: this.state.totalPrice,
			customer: {
				name: 'Kovalev Art',
				address: {
					country: 'Russia',
					zipCode:'12345',
					street: 'testStreet'
				},
				email: 'test@test.com'
			},
			delivoryMethod: 'fastest'

		};
		axios.post('/orders.json', order)
			.then(response => this.setState({
				loading: false,
				purchasing: false
			}))
			.catch(error => this.setState({
				loading: false,
				purchasing: false
			}));
	}

	render() {
		const disabledInfo = {
			...this.state.ingredients
		};
		for ( let key in disabledInfo) {
			disabledInfo[key] = disabledInfo[key] <= 0 
		}

		let orderSummary = null;
		let burger = this.state.error ? <p>Ингридиенты не могут быть загружены</p>: <Spinner/>;
		if (this.state.ingredients) {
			burger = ( 
				<Aux>
					<Burger 
						ingredients = {this.state.ingredients} />
					<BuildControls
						ingredientAdded = {this.addIngredientHandler} 
						ingredientRemoved={this.removeIngredientHandler}
						disabled = {disabledInfo}
						purchaseable = {this.state.purchaseable}
						ordered = {this.purchaseHandler}
						price = {this.state.totalPrice} />

				</Aux> );
			orderSummary = <OrderSummary 
				ingredients = {this.state.ingredients}
				purchaseCanceled = {this.purchaseCancelHandler}
				purchaseContinue = {this.purchaseContinueHandler}
				price = {this.state.totalPrice} />;
		}

		if (this.state.loading) {
			orderSummary = <Spinner/>;
		}

		return (
			<Aux>
				<Modal 
					show = {this.state.purchasing}
					modalClosed = {this.purchaseCancelHandler} >
					{orderSummary}
					
				</Modal>
				{burger}
			</Aux>
		);
	}
}

export default withErrorHandler(BurgerBuilder, axios);