import React, { useEffect, useState } from 'react';

import { collection, limit, onSnapshot, orderBy, query } from 'firebase/firestore';
import { db } from '../../Firebase/Firebase';

import CustomersOrderCss from '../PagesModuleCss/CustomersOrder.module.css';

import PagesBody from '../PagesUI/PagesBody';
import PageTitleCard from '../PagesUI/PageTitleCard';

import { Button, Card, Col, Row } from 'react-bootstrap';
import Form from 'react-bootstrap/Form';
import cn from 'classnames';

function CustomersOrder() {
   const [merchandises, setMerchandise] = useState([]);

   //Customers Info
   const [customersName, setCustomersName] = useState('');
   const [customersAddress, setCustomersAdress] = useState('');
   const [customersPhoneNum, setCustomersPhoneNum] = useState('');
   const [customersRecievingMethod, setCustomersRecievingMethod] = useState('');

   console.log(customersName, customersAddress, customersPhoneNum, customersRecievingMethod);

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
         merchandises[index].item.quantity = merchandises[index].item.quantity -  1;

      } else {
         const { merchQuant } = currentProduct;
         merchandises[index].merchQuant = merchQuant - 1;

         // To update the Quantity Stocks
         merchandises[index].item.quantity = merchandises[index].item.quantity + 1;
      }
      setMerchandise([...merchandises]);
   };




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

            <div className={cn(CustomersOrderCss['order-card'],'py-5')}>
               <div className={CustomersOrderCss['order-card-title']}>
                  <h4 className="text-white text-center">Order Now!</h4>
               </div>
               <Card>
                  <Card.Body>
                     <Form>
                        <Form.Group className="mb-3">
                           <Form.Control type="text" value={customersName} onChange={(e) => setCustomersName(e.target.value)} placeholder="Name" required />
                        </Form.Group>
                        <Form.Group className="mb-3">
                           <Form.Control type="text" value={customersAddress} onChange={(e) => setCustomersAdress(e.target.value)} placeholder="Address" required />
                        </Form.Group>
                        <Form.Group className="mb-3">
                           <Row>
                              <Col>
                                 <Form.Control type="tel" value={customersPhoneNum} onChange={(e) => setCustomersPhoneNum(e.target.value)} placeholder="Phone Number" required />
                              </Col>
                              <Col>
                                 <select
                                    className="form-select"
                                    defaultValue={'Method'}
                                    value={customersRecievingMethod}
                                    onChange={(e) => setCustomersRecievingMethod(e.target.value)}
                                    aria-label=" March Quantity"
                                    required
                                 >
                                    <option value={'Method'} selected hidden>
                                       Receiving Method
                                    </option>
                                    <option value="Deliver">Deliver</option>
                                    <option value="Willing To Wait">Willing To Wait</option>
                                 </select>
                              </Col>
                           </Row>
                        </Form.Group>
                     </Form>
                     <div className={CustomersOrderCss['product-container']}>
                        <Row>
                           {merchandises.map((merchItem) => (
                              <Col sm={4} key={merchItem.key}>
                                 <Card className="mb-3">
                                    <div  className={cn(merchItem.item.quantity === 0 ? CustomersOrderCss['sold-out-show'] :  CustomersOrderCss['sold-out-hide'],'flex-column')}>
                                       <p className='m-0'>Sold Out</p>
                                       <div className="d-flex w-100 justify-content-around mt-3">
                                          <Button variant="success" disabled={merchItem.item.quantity === 0} onClick={() => addMerchQuantHandler(merchItem.key,false)}>
                                             +
                                          </Button>
                                          <span>{merchItem.merchQuant}</span>
                                          <Button variant="danger "  disabled={merchItem.merchQuant === 0} onClick={() => addMerchQuantHandler(merchItem.key,true)}>-</Button>
                                       </div>
                                    </div>
                                    <Card.Body className="text-center">                                   
                                       <p>{merchItem.item.name}</p>
                                       <p>{merchItem.item.unit_price} P</p>
                                       <div className="d-flex justify-content-around">
                                          <Button variant="success" disabled={merchItem.item.quantity === 0} onClick={() => addMerchQuantHandler(merchItem.key,false)}>
                                             +
                                          </Button>
                                          <span>{merchItem.merchQuant}</span>
                                          <Button variant="danger "  disabled={merchItem.merchQuant === 0} onClick={() => addMerchQuantHandler(merchItem.key,true)}>-</Button>
                                       </div>
                                    </Card.Body>
                                 </Card>
                              </Col>
                           ))}
                        </Row>
                     </div>
                  </Card.Body>
               </Card>
            </div>
         </PageTitleCard>
      </PagesBody>
   );
}

export default CustomersOrder;
