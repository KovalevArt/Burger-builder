import React  from 'react';

import classes from './Order.css';

const order = (props) => {
	const ingredients = [];
	//console.log(props);
	

	for (let ingredientName in props.ingredients) {
		ingredients.push({
			name: ingredientName,
			amount: props.ingredients[ingredientName]}
		);
	}
	//console.log(ingredients);

	const ingredientOutput =ingredients.map(i => <span 
		key={i.name}
		style={{textTransform: 'capitalize',
		display: 'inline-block',
		margin: '0 8px',
		padding: '5px',
		border: '2px solid #eeee'}}>{i.name} ({i.amount})</span>);

	console.log(ingredientOutput);


	/*let transformedIngredients = Object.keys(props.ingredients) 
		.map(igKey=>{
			return [...Array(props.ingredients[igKey])]
				.map((_,i)=> {
					return <BurgerIngredient key ={igKey+i} type = {igKey} />;
				})
		})
		.reduce((arr,el)=>{
			return arr.concat(el)
		} ,[]);*/

	return (
		<div className={classes.Order}>
			<p>Ингридиенты:{ingredientOutput}</p>
			<p>Цена: <strong> {props.price}р</strong>.</p>
		</div>
	);
	
};

export default order;