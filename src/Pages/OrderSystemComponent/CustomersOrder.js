import React, { useEffect, useState } from 'react';

import { addDoc, collection, limit, onSnapshot, orderBy, query, Timestamp } from 'firebase/firestore';
import { db } from '../../Firebase/Firebase';

import CustomersOrderCss from '../PagesModuleCss/CustomersOrder.module.css';

import PagesBody from '../PagesUI/PagesBody';
import PageTitleCard from '../PagesUI/PageTitleCard';

import { Button, Card, Col, Row } from 'react-bootstrap';
import Form from 'react-bootstrap/Form';
import cn from 'classnames';
import Select from 'react-select';

function CustomersOrder() {
   const [merchandises, setMerchandise] = useState([]);

   //Customers Info
   const customersInfo = { customersName: '', customersAddress: '', customersPhoneNum: '', customersReceivingMethod: '' };
   const [formValues, setFormValues] = useState(customersInfo);
   const [formErrors, setFormErrors] = useState({});
   const [isSubmit, setIsSubmit] = useState(false);

   //Forms Event Handlers
   const handleChange = (e) => {
      const { name, value } = e.target;
      console.log(`value`,name,value);
      setFormValues({ ...formValues, [name]: value });
   };

   const handleSubmit = (e) => {
      e.preventDefault();
      saveOrderHandler();
      setFormErrors(validate(formValues));
      setIsSubmit(true);
   };

   //Validation
   const validate = (values) => {
      const errors = {};
      if (!values.customersName) {
         errors.customersName = 'Your name is required';
      }
      if (!values.customersAddress) {
         errors.customersAddress = 'Your address is required';
      }
      if (!values.customersPhoneNum) {
         errors.customersPhoneNum = 'Your phone number is required';
      }
      if (!values.customersReceivingMethod) {
         errors.customersReceivingMethod = 'Choose a Recieving Mehod';
      }
   };

   useEffect(() => {
      if (Object.keys(formErrors).length === 0 && isSubmit === true) {
         console.log(formErrors);
         return
      }

   }, [formErrors, isSubmit]);

   //Select
   const [selectValue, setSelectValue] = useState('');
   console.log(`select`,selectValue);

   const options = [
      { value: 'chocolate', label: 'Chocolate' },
      { value: 'strawberry', label: 'Strawberry' },
      { value: 'vanilla', label: 'Vanilla' },
   ];

   const changeSelectValueHandler = (e,selected) => {
      const {value,label} = e
      const {name} = selected
      setSelectValue(formValues.customersReceivingMethod = label, {[name]:value});
      console.log(`value`,name,value);
   };

   console.log(`Rm...`,formValues.customersReceivingMethod);

   //Add Products
   const addMerchQuantHandler = (key, toMinus = false) => {
      const index = merchandises.findIndex((item) => item.key === key);

      if (index === -1) {
         return;
      }

      const currentProduct = merchandises[index];

      // Uses referenced value
      if (toMinus === false) {
         const { merchQuant } = currentProduct;
         merchandises[index].merchQuant = merchQuant + 1;

         // To update the Quantity Stocks
         merchandises[index].item.quantity = merchandises[index].item.quantity - 1;
      } else {
         const { merchQuant } = currentProduct;
         merchandises[index].merchQuant = merchQuant - 1;

         // To update the Quantity Stocks
         merchandises[index].item.quantity = merchandises[index].item.quantity + 1;
      }
      setMerchandise([...merchandises]);
   };

   const saveOrderHandler = async () => {
      // add order to firebase
      try {
         const collectionRef = collection(db, 'order');
         const payload = { ...formValues, createdAt: Timestamp.now() };

         await addDoc(collectionRef, payload);
      } catch (err) {
         console.log(err);
      }
   };

   console.log(formValues);

   // List of inventory Data
   useEffect(() => {
      onSnapshot(query(collection(db, 'Products'), orderBy('created_at', 'desc'), limit()), (snapshot) => {
         setMerchandise(snapshot.docs.map((doc) => ({ key: doc.id, item: doc.data(), merchQuant: 0 })));
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
                     <Form onSubmit={handleSubmit}>
                        <Form.Group className="mb-3">
                           <Form.Control type="text" value={formValues.customersName} name="customersName" onChange={handleChange} placeholder="Name" required />
                        </Form.Group>
                        <Form.Group className="mb-3">
                           <Form.Control type="text" value={formValues.customersAddress} name="customersAddress" onChange={handleChange} placeholder="Address" required />
                        </Form.Group>
                        <Form.Group className="mb-3">
                           <Row>
                              <Col>
                                 <Form.Control type="tel" value={formValues.customersPhoneNum} name="customersPhoneNum" onChange={handleChange} placeholder="Phone Number" required />
                              </Col>
                              <Col>
                                 <Select options={options} value={formValues.customersReceivingMethod} onChange={changeSelectValueHandler}  name="customersReceivingMethod" placeholder={formValues.customersReceivingMethod=== ''? 'Choose Recieve Method' : formValues.customersReceivingMethod} required />
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
                        <Button variant="outline-success" type="submit">
                           Save Order
                        </Button>
                     </Form>
                  </Card.Body>
               </Card>
            </div>
         </PageTitleCard>
      </PagesBody>
   );
}

export default CustomersOrder;
