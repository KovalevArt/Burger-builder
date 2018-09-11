import React, { Component } from 'react';

import Button from '../../../components/UI/Button/Button';
import classes from './ContactData.css';
import axios from '../../../axios-orders';
import Spinner from '../../../components/UI/Spinner/Spinner';

class ContactData extends Component {
	state ={
		name: '',
		address: {
			country: '',
			zipCode:'',
			street: ''
		},
		email: '',
		delivoryMethod: 'fastest'
	}

	orderHandler = (e) => {
		e.preventDefault();
		this.setState({
			loading: true
		});
		const order = {
			ingredients:this.props.ingredients,
			price: this.props.price,
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
			.then(response => { 
				this.setState({
					loading: false,
					purchasing: false
					});
				this.props.history.push('/');
				}
			)
			.catch(error => this.setState({
				loading: false,
				purchasing: false
			}));
	}
	
	render() {
		let form =(
			<form action="" className={classes.Form}>
				<input className={classes.Input} type="text" name="name" placeholder="Ваше имя"/>
				<input className={classes.Input} type="email" name="email" placeholder="Ваша почта"/>
				<input className={classes.Input} type="text" name="street" placeholder="Ваша улица"/>
				<input className={classes.Input} type="text" name="postal" placeholder="Ваш код"/>
				<Button btnType='Success'
					clicked = {this.orderHandler}>Заказать</Button>
			</form>
		);

		if (this.state.loading) {
			form = <Spinner/>;
		}

		return(
			<div className={classes.ContactData}>
				<h4>ВВедите свои контактные данные</h4>
				{form}
			</div>
		);
	}
}
export default ContactData;