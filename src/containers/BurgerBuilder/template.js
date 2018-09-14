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


	//ОТПРАВИТЬ ПО АДРЕСНОЙ СТРОКЕ
	purchaseContinueHandler = () => {
		//alert('Продолжаем!');
//		
		const queryParams = [];
		for (let i in this.state.ingredients) {
			queryParams.push(encodeURIComponent(i) + '=' + encodeURIComponent(this.state.ingredients[i]));
		}
		queryParams.push(`price=${this.props.price}`)
		//console.log(queryParams);
		const queryString = queryParams.join('&');

		this.props.history.push({
			pathname: '/checkout',
			search: `?${queryString}`
		});
	}

	//Получить ПО АДРЕСНОЙ СТРОКЕ
	componentWillMount() {
		const query = new URLSearchParams(this.props.location.search);
		const ingredients = {};
		let price = 0;
		for (let param of query.entries()) {
			if (param[0] === 'price') {
				price = +param[1];
			} else {
				ingredients[param[0]] = +param[1];
			}
			
		}
		this.setState({
			ingredients,
			totalPrice: price
		});
	}