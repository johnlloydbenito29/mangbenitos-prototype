import React, {useEffect, useState} from 'react';
import cn from 'classnames';
import {useSelector, useDispatch} from 'react-redux';
import {addDoc, collection, Timestamp} from 'firebase/firestore';
import {Row, Col, Card, Button} from 'react-bootstrap';
import {writeBatch, doc} from "firebase/firestore";

import ProductInventoryStyle from '../../PagesModuleCss/ProductInventory.module.css';
import SetInitialInventoryStyle from '../../PagesModuleCss/SetInitialInventory.module.css';

import PagesBody from '../../PagesUI/PagesBody';
import PageTitleCard from '../../PagesUI/PageTitleCard';
import {useAuth} from '../../../Contex/AuthenticationContext';
import {getProductData} from '../../../Redux/Actions/productInventoryAction';
import {db} from '../../../Firebase/Firebase';

function ProductInventory() {
	const {currentUser} = useAuth();

	// Redux State
	const reduxProductInventory = useSelector((state) => state.productInventory.initialProductArray);

	const [products, setProducts] = useState([]);

	//Updated Datas from SetInitialInventory
	const [updatedQuantity, setupdatedQuantity] = useState(null);
	const [item, setItem] = useState(null);
	const [updatedPrice, setupdatedPrice] = useState(null);

	//Dispatch Redux
	const dispatch = useDispatch();

	// Get Data From Firebase
	useEffect(() => {
		dispatch(getProductData());
	}, [dispatch]);

	useEffect(() => {
		setProducts(reduxProductInventory);
		console.log('culprit...')
	}, [reduxProductInventory]);

	let [quantityCounter, setQuantityCounter] = useState(0);
	let [priceTotal, setPriceTotal] = useState(0);


	// useEffect(() => {
	//    setQuantityCounter(quantity);
	// }, [quantity]);

	// useEffect(() => {
	//    setPriceTotal(price);
	// }, [price]);

	const incrementQuantity = (key, toMinus = false) => {
		const index = products.findIndex((item) => item.key === key);

		if (index === -1) {
			return;
		}

		const currentProduct = products[index];

		// Uses referenced value
		const {quantity, unit_price: unitPrice} = currentProduct.item;

		if (toMinus) {
			products[index].item.quantity = quantity - 1;
			products[index].item.total_price = (quantity - 1) * unitPrice;
		} else {
			products[index].item.quantity = quantity + 1;
			products[index].item.total_price = (quantity + 1) * unitPrice;
		}

		setProducts([...products]);
	};

	const setProductName = (key, e) => {
		const index = products.findIndex((item) => item.key === key);

		if (index === -1) {
			return;
		}

		const value = e.target.value;

		products[index].item.name = value;

		setProducts([...products]);
	}

	const setProductUnitPrice = (key, e) => {
		const index = products.findIndex((item) => item.key === key);

		if (index === -1) {
			return;
		}

		const value = e.target.value;

		const currentProduct = products[index];

		// Uses referenced value
		const {quantity} = currentProduct.item;

		products[index].item.unit_price = value;
		products[index].item.total_price = quantity * value;
		setProducts([...products]);
	}


	// Adding Updated Product Data to Firebase
	const save = async () => {
		try {
			const batch = writeBatch(db);

			// Loop through products to update each

			products.forEach((product) => {
				console.log('product.key', product.key);

				const sfRef = doc(db, 'Products', product.key);
				batch.update(sfRef, {...product.item});
			})

			await batch.commit();
		} catch (err) {
			console.log(err);
			return;
		}
	};

	if (!products) return null;

	console.log('state before render...', products)

	return (
		<PagesBody>
			<PageTitleCard>
				<div className={ProductInventoryStyle['page-title']}>
					<h2 className="text-white">Product Inventory</h2>
				</div>
				<div className="mt-3">
					<Row>
						<Col xs={6}>
							<Card>
								<Card.Header as="h5" className={cn(ProductInventoryStyle['card-header'], 'text-white', 'text-center')}>
									Product List
								</Card.Header>
								<Card.Body>
									{products.map((product) => (
										<>
											<Card className="mb-3" key={product.key}
												updatingProductD>
												<div className={SetInitialInventoryStyle['product-holder']}>
													<Row>
														<Col>
															<input className="d-block" type="text" value={product.item.name} onChange={(e) => setProductName(product.key, e)} />
														</Col>
														<Col>
															<div className="d-flex">
																<button onClick={() => incrementQuantity(product.key)}>+</button>
																<p>{product.item.quantity}</p>
																<button disabled={product.item.quantity === 0} onClick={() => incrementQuantity(product.key, true)}>
																	-
																</button>
															</div>
														</Col>
														<Col>
															<input className="d-block" type="number" value={product.item.unit_price} onChange={(e) => setProductUnitPrice(product.key, e)} />
														</Col>
														<Col>
															<p>{product.item.total_price}</p>
														</Col>
													</Row>
												</div>
											</Card>
										</>
									))}
									<div>
										<Button variant="primary" onClick={save}>
											Save Inventory
										</Button>
										<h5>TOTAL: {products.length ? products.reduce((prevProduct, product) => product.item.total_price + prevProduct.item.total_price) : 0}</h5>
									</div>
								</Card.Body>
							</Card>
						</Col>
					</Row>
				</div>
			</PageTitleCard>
		</PagesBody>
	);
}

export default ProductInventory;
