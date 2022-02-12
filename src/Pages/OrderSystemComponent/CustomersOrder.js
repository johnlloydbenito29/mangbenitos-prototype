import React, { useEffect, useState } from 'react';

import { collection, limit, onSnapshot, orderBy, query } from 'firebase/firestore';
import { db } from '../../Firebase/Firebase';

import CustomersOrderCss from '../PagesModuleCss/CustomersOrder.module.css';

import PagesBody from '../PagesUI/PagesBody';
import PageTitleCard from '../PagesUI/PageTitleCard';

import { Button, Card, Col, Row } from 'react-bootstrap';
import Form from 'react-bootstrap/Form';
import Select from 'react-select';
import cn from 'classnames';

function CustomersOrder() {
   const [productList, setProductList] = useState([]);

   const options = [
      { value: 'deliver', label: 'Deliver' },
      { value: 'willingToWait', label: 'Willing To Wait' },
   ];

   console.log('ProductList...', productList);

   // List of inventory Data
   useEffect(() => {
      onSnapshot(query(collection(db, 'Products'), orderBy('created_at', 'desc'), limit()), (snapshot) => {
         setProductList(snapshot.docs.map((doc) => ({ key: doc.id, item: doc.data() })));
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
                           <Form.Control type="text" placeholder="Name" />
                        </Form.Group>
                        <Form.Group className="mb-3">
                           <Form.Control type="text" placeholder="Address" />
                        </Form.Group>
                        <Form.Group className="mb-3">
                           <Row>
                              <Col>
                                 <Form.Control type="text" placeholder="Phone Number" />
                              </Col>
                              <Col>
                                 <Select options={options} placeholder="Receivin Method" />
                              </Col>
                           </Row>
                        </Form.Group>
                     </Form>
                     <div className={CustomersOrderCss['product-container']}>
                        <Row>
                           <Col sm={4}>
                              <Card>
                                 <Card.Body className="text-center">
                                    <p>Product Name</p>
                                    <p>Price</p>
                                    <p>Quantity</p>
                                    <div className='d-flex justify-content-around'>
                                       <Button variant="success">+</Button>
                                       <span>0</span>
                                       <Button variant="danger">-</Button>
                                    </div>
                                 </Card.Body>
                              </Card>
                           </Col>
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
