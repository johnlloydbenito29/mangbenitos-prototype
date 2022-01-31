import React from 'react';

import { useState } from 'react';

import { Form, Button, Card, Container } from 'react-bootstrap';
import addProduct from './addProduct.module.css';

import { Timestamp, addDoc, collection } from 'firebase/firestore';
import { db } from '../../../Firebase/Firebase';

function AddProduct({ modalToggle }) {
   const [name, setName] = useState('');
   const [quantity, setQuantity] = useState(0);
   const [price, setPrice] = useState(0);

   // Add a new document in collection "cities"
   const addProductHandler = async (e) => {
      e.preventDefault();
      try {
         const collectionRef = collection(db, 'Products');
         const payload = { name: name, quantity: quantity, unit_price: price, total_price: price, updated_at: Timestamp.now(), createdAt: Timestamp.now() };

         console.log(`Name...`, name);
         console.log(`quantity...`, quantity);
         console.log(`price...`, price);

         await addDoc(collectionRef, payload);

         console.log('Document written with ID: ', collectionRef.id);
      } catch (err) {
         console.log(err);
      }
   };

   return (
      <Container className="d-flex align-items-center justify-content-center">
         <div className="w-100 position-relative" style={{ maxWidth: '500px' }}>
            <Card>
               <Card.Body className="w-400">
                  <h2 className="text-center mb-4">Add Product</h2>
                  <Form>
                     <Form.Group>
                        <Form.Label>Name</Form.Label>
                        <Form.Control type="text" onChange={(event) => setName(event.target.value)} />
                     </Form.Group>
                     <Form.Group>
                        <Form.Label>Quantity</Form.Label>
                        <input className="d-block" className="form-control" type="number" onChange={(event) => setQuantity(event.target.value)} />
                     </Form.Group>
                     <Form.Group>
                        <Form.Label>Price</Form.Label>
                        <input className="d-block" className="form-control" type="number" onChange={(event) => setPrice(event.target.value)} />
                     </Form.Group>
                     <Button className="w-100 my-4" type="submit" onClick={addProductHandler}>
                        Add Product
                     </Button>
                  </Form>
               </Card.Body>
                  <Button className={addProduct['exit-toggle']} variant="danger" onClick={modalToggle}>
                     x
                  </Button>
            </Card>
         </div>
      </Container>
   );
}

export default AddProduct;
