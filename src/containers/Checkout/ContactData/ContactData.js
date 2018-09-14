import React, { Component } from 'react';
import { connect } from 'react-redux';

import Button from '../../../components/UI/Button/Button';
import classes from './ContactData.css';
import axios from '../../../axios-orders';
import Spinner from '../../../components/UI/Spinner/Spinner';

import Input from '../../../components/UI/Input/Input';


class ContactData extends Component {
	state ={
		orderForm: {
			name: {
				elementType: 'input',
				elementConfig: {
					type: 'text',
					placeholder: 'Ваше имя'
				},
				value: '',
				validation: {
					required: true
				},
				valid: false,
				touched: false
			},
			country: {
				elementType: 'input',
				elementConfig: {
					type: 'text',
					placeholder: 'Страна'
				},
				value: '',
				validation: {
					required: true
				},
				valid: false,
				touched: false
			},
			zipCode: {
				elementType: 'input',
				elementConfig: {
					type: 'text',
					placeholder: 'Ваше Zip Код'
				},
				value: '',
				validation: {
					required: true,
					minLength: 5,
					maxLength: 5
				},
				valid: false,
				touched: false
			},
			street: {
				elementType: 'input',
				elementConfig: {
					type: 'text',
					placeholder: 'Улица'
				},
				value: '',
				validation: {
					required: true
				},
				valid: false,
				touched: false
			},
			email: {
				elementType: 'input',
				elementConfig: {
					type: 'email',
					placeholder: 'Ваш email'
				},
				value: '',
				validation: {
					required: true
				},
				valid: false,
				touched: false
			},
			delivoryMethod: {
				elementType: 'select',
				elementConfig: {
					options:[{value: 'fast',
					displayValue:'Быстрый'},
					{value: 'cheap',
					displayValue:'Дешевый'}]
				},
				validation:{},
				value: 'fast',
				valid: true,
				
			}
		},
		formIsValid: false,
		loading:false
	}

	orderHandler = (e) => {
		e.preventDefault();
		this.setState({
			loading: true
		});
		const formData = {};
		for (let formElementId in this.state.orderForm) {
			formData[formElementId] = this.state.orderForm[formElementId].value;
		}
		const order = {
			ingredients:this.props.ings,
			price: this.props.price,
			orderData: formData
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

	checkValidity(value, rules) {

		let isValid = true;

		if (rules.required) {
			isValid = value.trim() !== '' && isValid;
		}

		if (rules.minLength) {
			isValid = value.length >= rules.minLength && isValid;
		}

		if (rules.maxLength) {
			isValid = value.length <= rules.maxLength && isValid;
		}
		return isValid;
	}

	inputChangedHandler = (event, inputId) => {
		console.log(event.target.value);
		const updatedOrderForm = {
			...this.state.orderForm
		};
		const updatedFormElement = {...updatedOrderForm[inputId]};
		updatedFormElement.value = event.target.value;
		updatedFormElement.valid = this.checkValidity(updatedFormElement.value, updatedFormElement.validation);
		updatedFormElement.touched = true;
		
		updatedOrderForm[inputId] = updatedFormElement;
		let formIsValid = true;
		
		for (let inputId in updatedOrderForm) {
			formIsValid = updatedOrderForm[inputId].valid && formIsValid
		}
		console.log(formIsValid);
		this.setState({
			orderForm:updatedOrderForm,
			formIsValid
		});
	}
	
	render() {
		const formElementsArray = [];

		for (let key in this.state.orderForm) {
			formElementsArray.push({
				id: key,
				config: this.state.orderForm[key]
			});
		}

		let form =(
			<form onSubmit={this.orderHandler} className={classes.Form}>
				{formElementsArray.map(formElement=> (
					<Input 
						key= {formElement.id}
						elementType={formElement.config.elementType}
						changed={(event) => this.inputChangedHandler(event, formElement.id)}
						invalid={!formElement.config.valid}
						shouldValidate={formElement.config.validation}
						touched={formElement.config.touched}
						elementConfig={formElement.config.elementConfig} 
						value={formElement.config.value} />
				))}
				<Button 
					btnType='Success'
					clicked = {this.orderHandler}
					disabled={!this.state.formIsValid}>Заказать</Button>
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

const mapStateToProps = state => {
	return {
		ings: state.ingredients,
		price: state.totalPrice
	}
}
export default connect(mapStateToProps)(ContactData);