import React, {useEffect, useState, useRef} from 'react';

import {addDoc, collection, limit, onSnapshot, orderBy, query, Timestamp} from 'firebase/firestore';
import {db} from '../../Firebase/Firebase';

import CustomersOrderCss from '../PagesModuleCss/CustomersOrder.module.css';

import PagesBody from '../PagesUI/PagesBody';
import PageTitleCard from '../PagesUI/PageTitleCard';

import {Button, Card, Col, Row} from 'react-bootstrap';
import Form from 'react-bootstrap/Form';
import cn from 'classnames';
import Select from 'react-select';
const customersInfo = {customersName: '', customersAddress: '', customersPhoneNum: '', customersReceivingMethod: ''};

const options = [
	{value: '', label: 'Select delivery method'},
	{value: 'pickup', label: 'Pickup'},
	{value: 'deliver', label: 'deliver'}
];


function CustomersOrder() {
	const formRef = useRef();

	const [merchandises, setMerchandise] = useState([]);
	const [formValues, setFormValues] = useState({...customersInfo});
	const [submitting, setSubmitting] = useState(false);
	const [formValidated, setFormValidated] = useState(false);
	const [formSelectErrors, setFormSelectErrors] = useState(null);

	//Forms Event Handlers
	const handleChange = (e) => {
		const {name, value} = e.target;
		console.log(`value`, name, value);
		setFormValues({...formValues, [name]: value});
	};


	//Validation
	const validate = () => {
		let isValid = true;

		if (formRef.current) {
			isValid = formRef.current.checkValidity();
		}

		// Validating select is different because we use react-select and not native bootstrap select
		if (formValues.customersReceivingMethod === '') {
			const newFormSelectErrors = {
				customersReceivingMethod: true
			};

			setFormSelectErrors(newFormSelectErrors);
		}

		console.log('isValid', isValid)

		setFormValidated(true);

		return isValid;
	};


	const handleSubmit = (e) => {
		e.preventDefault();
		e.stopPropagation()
		console.log('ahh');
		// @FB (FEEDBACK): Set submitting to true first to prevent listening to double clicking action
		setSubmitting(true);

		// @FB: Validate before you submit or process the data
		// @FB: Define variables first before using
		// @FB: Set return value for validator to prevent form submission incase validation fails
		if (!validate()) {
			setSubmitting(false);
			return;
		}

		saveOrderHandler();
		// Reset validated flag
		setFormValidated(false);
	};

	const changeSelectValueHandler = (e, selected) => {
		const {value, label} = e
		const {name} = selected

		const newFormValues = {...formValues};
		newFormValues.customersReceivingMethod = value;


		console.log(`value`, value);
		console.log(`label`, label);
		console.log(`name`, name);

		setFormValues(newFormValues);

		// Reset form error
		if (value !== '') {
			const newFormSelectErrors = {...formSelectErrors};

			newFormSelectErrors[name] = false;
			setFormSelectErrors(newFormSelectErrors);
		}
	};

	console.log(`Rm...`, formValues.customersReceivingMethod);

	//Add Products
	const addMerchQuantHandler = (key, toMinus = false) => {
		// @FB: Clone first before you modify
		const newMerchandises = [...merchandises]
		const index = newMerchandises.findIndex((item) => item.key === key);

		if (index === -1) {
			return;
		}

		const currentProduct = newMerchandises[index];

		// Uses referenced value
		if (toMinus === false) {
			const {merchQuant} = currentProduct;
			newMerchandises[index].merchQuant = merchQuant + 1;

			// To update the Quantity Stocks
			newMerchandises[index].item.quantity = newMerchandises[index].item.quantity - 1;
		} else {
			const {merchQuant} = currentProduct;
			newMerchandises[index].merchQuant = merchQuant - 1;

			// To update the Quantity Stocks
			newMerchandises[index].item.quantity = newMerchandises[index].item.quantity + 1;
		}

		setMerchandise(newMerchandises);
	};

	const saveOrderHandler = async () => {
		// add order to firebase
		try {
			console.log('formValues to save...', formValues);
			console.log('merchandises to save...', merchandises);
			const collectionRef = collection(db, 'order');
			const payload = {...formValues, createdAt: Timestamp.now()};

			await addDoc(collectionRef, payload);
			// @FB: Set submitting back to false
			setSubmitting(false);
			// @FB: Reset form
			setFormValues({...customersInfo})
		} catch (err) {
			console.log(err);
			// @FB: Set submitting back to false
			setSubmitting(false);
		}
	};

	console.log('formValues', formValues);
	console.log('formSelectErrors', formSelectErrors);

	// List of inventory Data
	useEffect(() => {
		onSnapshot(query(collection(db, 'Products'), orderBy('created_at', 'desc'), limit()), (snapshot) => {
			setMerchandise(snapshot.docs.map((doc) => ({key: doc.id, item: doc.data(), merchQuant: 0})));
		});
	}, []);

	return (
		<PagesBody>
			<PageTitleCard>
				<div className={CustomersOrderCss['page-title']}>
					<h2 className="text-white">What is your order?</h2>
				</div>

				<div className={cn(CustomersOrderCss['order-card'], 'py-5')}>
					<div className={CustomersOrderCss['order-card-title']}>
						<h4 className="text-white text-center">Order Now!</h4>
					</div>
					<Card>
						<Card.Body>
							<form className={formValidated ? 'was-validated' : ''} noValidate onSubmit={handleSubmit} ref={formRef}>
								<Form.Group className="mb-3 has-validation">
									<Form.Control type="text" value={formValues.customersName} name="customersName" onChange={handleChange} placeholder="Name" required />
									<div class="invalid-feedback">
										Your name is required
									</div>
								</Form.Group>
								<Form.Group className="mb-3 has-validation">
									<Form.Control type="text" value={formValues.customersAddress} name="customersAddress" onChange={handleChange} placeholder="Address" required />
									<div class="invalid-feedback">
										Your address is required
									</div>
								</Form.Group>
								<Form.Group className="mb-3 has-validation">
									<Row>
										<Col>
											<Form.Control type="tel" value={formValues.customersPhoneNum} name="customersPhoneNum" onChange={handleChange} placeholder="Phone Number" required />
											<div class="invalid-feedback">
												Your phone is required
											</div>
										</Col>
										<Col>
											<Select className={`react-select ${formSelectErrors && formSelectErrors.customersReceivingMethod ? 'invalid' : ''}`} innerProps={{className: 'react-select-inner'}} options={options} value={formValues.customersReceivingMethod} onChange={changeSelectValueHandler} name="customersReceivingMethod" placeholder={formValues.customersReceivingMethod === '' ? 'Choose Recieve Method' : formValues.customersReceivingMethod} required isSearchable={false} />
											{(formSelectErrors && formSelectErrors.customersReceivingMethod) && (
												<div class="select-invalid-feedback">
													Receive method is required
												</div>
											)}
										</Col>
									</Row>
								</Form.Group>
								<div className={CustomersOrderCss['product-container']}>
									<Row>
										{merchandises.map((merchItem) => (
											<Col sm={4} key={merchItem.key}>
												<Card className="mb-3">
													<div className={cn(merchItem.item.quantity === 0 ? CustomersOrderCss['sold-out-show'] : CustomersOrderCss['sold-out-hide'], 'flex-column')}>
														<p className="m-0">Sold Out</p>
														<div className="d-flex w-100 justify-content-around mt-3">
															<Button variant="success" disabled={merchItem.item.quantity === 0} onClick={() => addMerchQuantHandler(merchItem.key, false)}>
																+
															</Button>
															<span>{merchItem.merchQuant}</span>
															<Button variant="danger " disabled={merchItem.merchQuant === 0} onClick={() => addMerchQuantHandler(merchItem.key, true)}>
																-
															</Button>
														</div>
													</div>
													<Card.Body className="text-center">
														<p>{merchItem.item.name}</p>
														<p>{merchItem.item.unit_price} P</p>
														<div className="d-flex justify-content-around">
															<Button variant="success" disabled={merchItem.item.quantity === 0} onClick={() => addMerchQuantHandler(merchItem.key, false)}>
																+
															</Button>
															<span>{merchItem.merchQuant}</span>
															<Button variant="danger " disabled={merchItem.merchQuant === 0} onClick={() => addMerchQuantHandler(merchItem.key, true)}>
																-
															</Button>
														</div>
													</Card.Body>
												</Card>
											</Col>
										))}
									</Row>
								</div>
								<Button variant="outline-success" type="submit" disabled={submitting}>
									Save Order
								</Button>
							</form>
						</Card.Body>
					</Card>
				</div>
			</PageTitleCard>
		</PagesBody>
	);
}

export default CustomersOrder;
