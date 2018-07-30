import React, { Component } from 'react';

import Aux from '../../../hoc/AuxReact';
import Button from '../../UI/Button/Button';

class OrderSummary extends Component {
	componentWillUpdate() {
		//console.log(obj);
	}

	render() {

		const ingredientSummary = Object.keys(this.props.ingredients)
		.map( igKey => {
			let nameOfFood ='';
			switch (igKey) {
				case ('salad'):
					nameOfFood = 'Салат';
					break;
				case ('cheese'):
					nameOfFood = 'Сыр';
					break;
				case ('meat'):
					nameOfFood = 'Котлета';
					break;
				case ('bacon'):
					nameOfFood = 'Бекон';
					break;
				}

			return (
				<li key = {igKey}>
					<span style={{textTransform: 'capitalize'}} >{nameOfFood}</span>: {this.props.ingredients[igKey]}
				</li> );
		});

		return (
			<Aux>
				<h3>Ваш Заказ</h3>
				<p>Наивкуснейшний бургер со следующими ингридиентами:</p>
				<ul>
					{ingredientSummary}
				</ul>
				<p>С вас: {this.props.price} р.</p>
				<p>Продолжить счет?</p>
				<Button btnType = {'Danger'} clicked = {this.props.purchaseCanceled}>ЗАКРЫТЬ</Button>
				<Button btnType = {'Success'} clicked = {this.props.purchaseContinue}>ПРОДОЛЖИТЬ</Button>
			</Aux>
		);
	}
}

export default OrderSummary;