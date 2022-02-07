import React from 'react';

import { useState } from 'react';

import { Form, Button, Card, Container } from 'react-bootstrap';
import addProductCss from './addProduct.module.css';

import { Timestamp, addDoc, collection } from 'firebase/firestore';
import { db } from '../../../Firebase/Firebase';

function AddProduct({ modalToggle }) {
   const [name, setName] = useState('');
   const [quantity, setQuantity] = useState(0);
   const [price, setPrice] = useState(0);

   // Add a new document in collection "cities"
   const addProductHandler = async (e) => {
      e.preventDefault();
      modalToggle();
      try {
         const collectionRef = collection(db, 'Products');
         const payload = { name: name, quantity: Number(quantity), unit_price: Number(price), total_price: Number(price), updated_at: Timestamp.now(), created_at: Timestamp.now() };

         console.log(`Name...`, name);
         console.log(`quantity...`, quantity);
         console.log(`price...`, price);

         await addDoc(collectionRef, payload);

         setName('');
         console.log('Document written with ID: ', collectionRef.id);
      } catch (err) {
         console.log(err);
      }
   };

   return (
      <div className={addProductCss['add-product-holder']}>
         <Container className="d-flex align-items-center justify-content-center">
            <div className="w-100 position-relative" style={{ maxWidth: '450px' }}>
               <Card className={[addProductCss['add-card']]}>
                  <Card.Body className="w-400">
                     <h2 className="text-center mb-4">Add Product</h2>
                     <Form>
                        <Form.Group>
                           <Form.Label>Name</Form.Label>
                           <Form.Control type="text" onChange={(event) => setName(event.target.value)} />
                        </Form.Group>
                        <Form.Group>
                           <Form.Label>Quantity</Form.Label>
                           <input className="form-control d-block" type="number" onChange={(event) => setQuantity(event.target.value)} />
                        </Form.Group>
                        <Form.Group>
                           <Form.Label>Price</Form.Label>
                           <input className="form-control d-block" type="number" onChange={(event) => setPrice(event.target.value)} />
                        </Form.Group>
                        <Button disabled={name === ''} className="w-100 my-4" type="submit" onClick={addProductHandler}>
                           Add Product
                        </Button>
                     </Form>
                  </Card.Body>
                  <Button className={addProductCss['exit-toggle']} variant="danger" onClick={modalToggle}>
                     x
                  </Button>
               </Card>
            </div>
         </Container>
      </div>
   );
}

export default AddProduct;
