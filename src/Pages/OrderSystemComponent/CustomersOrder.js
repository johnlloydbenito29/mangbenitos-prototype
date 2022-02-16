import React, { useEffect, useState } from 'react';

// import { useDispatch, useSelector } from 'react-redux';
// import { addQuantity } from '../../Redux/Actions/customersOrderAction';

import { collection, limit, onSnapshot, orderBy, query } from 'firebase/firestore';
import { db } from '../../Firebase/Firebase';

import CustomersOrderCss from '../PagesModuleCss/CustomersOrder.module.css';

import PagesBody from '../PagesUI/PagesBody';
import PageTitleCard from '../PagesUI/PageTitleCard';

import { Button, Card, Col, Row } from 'react-bootstrap';
import Form from 'react-bootstrap/Form';
import cn from 'classnames';

function CustomersOrder() {
   const [productLists, setproductLists] = useState([]);
   const merchandises = [];


   //Customers Info
   const [customersName, setCustomersName] = useState('');
   const [customersAddress, setCustomersAdress] = useState('');
   const [customersPhoneNum, setCustomersPhoneNum] = useState('');
   const [customersRecievingMethod, setCustomersRecievingMethod] = useState('');

   console.log(customersName, customersAddress, customersPhoneNum, customersRecievingMethod);

   productLists.forEach((productList) => {
      merchandises.push({ merchQuant: 0, productList });
   });

   const addMerchQuantHandler = (key) => {
      const index = merchandises.findIndex((item) => item.productList.key === key);

      if (index === -1) {
         return;
      }

      const currentProduct = merchandises[index];
      console.log(currentProduct.merchQuant);


      // Uses referenced value
      const { merchQuant } = currentProduct ;

      merchandises[index].merchQuant  = merchQuant + 1;

   };

   // merchandises.forEach(function (merchQuant) {

   // });

   // List of inventory Data
   useEffect(() => {
      onSnapshot(query(collection(db, 'Products'), orderBy('created_at', 'desc'), limit()), (snapshot) => {
         setproductLists(snapshot.docs.map((doc) => ({ key: doc.id, item: doc.data() })));
      });
   }, []);

   return (
      <PagesBody>
         <PageTitleCard>
            <div className={CustomersOrderCss['page-title']}>
               <h2 className="text-white">What is your order?</h2>
            </div>

            <div className={CustomersOrderCss['order-card']}>
               <div className={cn(CustomersOrderCss['order-card-title'], 'mt-5')}>
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
                                 <select className="form-select" value={customersRecievingMethod} onChange={(e) => setCustomersRecievingMethod(e.target.value)} aria-label=" March Quantity" required>
                                    <option selected hidden>
                                       Receiving Method
                                    </option>
                                    <option>Deliver</option>
                                    <option>Willing To Wait</option>
                                 </select>
                                 {/* <Select options={options} placeholder="Receiving Method" /> */}
                                 {/* <Form.Control value={customersRecievingMethod} onChange={(e) => setCustomersRecievingMethod(e.target.value)} as="select" placeholder="Recieving Method">
                                    <option>Deliver</option>
                                    <option>Willing To Wait</option>
                                 </Form.Control> */}
                              </Col>
                           </Row>
                        </Form.Group>
                     </Form>
                     <div className={CustomersOrderCss['product-container']}>
                        <Row>
                           {merchandises.map((merchItem) => (
                              <Col sm={4} key={merchItem.productList.key}>
                                 <Card className="mb-3">
                                    <Card.Body className="text-center">
                                       <p>{merchItem.productList.item.name}</p>
                                       <p>{merchItem.productList.item.unit_price} P</p>
                                       <div className="d-flex justify-content-around">
                                          <Button variant="success" onClick={() => addMerchQuantHandler(merchItem.productList.key)}>
                                             +
                                          </Button>
                                          <span>{merchItem.merchQuant}</span>
                                          <Button variant="danger">-</Button>
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
