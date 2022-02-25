import React, { useEffect, useState } from 'react';
import cn from 'classnames';
import { useSelector } from 'react-redux';
import { addDoc, collection, deleteDoc, limit, onSnapshot, orderBy, query, Timestamp } from 'firebase/firestore';
import { Row, Col, Card, Button } from 'react-bootstrap';
import { writeBatch, doc } from 'firebase/firestore';

import ProductInventoryStyle from '../../PagesModuleCss/ProductInventory.module.css';
import SetInitialInventoryStyle from '../../PagesModuleCss/SetInitialInventory.module.css';

import PagesBody from '../../PagesUI/PagesBody';
import PageTitleCard from '../../PagesUI/PageTitleCard';
import { useAuth } from '../../../Contex/AuthenticationContext';
import { db } from '../../../Firebase/Firebase';
import AddProduct from './AddProduct';
import InventoryList from './InventoryList';

function ProductInventory() {
   const { currentUser } = useAuth();

   // Modal
   const [showModal, setShowModal] = useState(false);

   // Redux State
   const reduxProductInventory = useSelector((state) => state.productInventory.initialProductArray);

   const [products, setProducts] = useState([]);

   const total = products.length ? products.reduce((prevProduct, product) => (prevProduct = prevProduct + product.item.total_price), 0) : 0;

   useEffect(() => {
      onSnapshot(query(collection(db, 'Products'), orderBy('created_at', 'desc'), limit()), (snapshot) => {
         setProducts(snapshot.docs.map((doc) => ({ key: doc.id, item: doc.data() })));
      });
   }, []);

   useEffect(() => {
      setProducts(reduxProductInventory);
      console.log('culprit...');
   }, [reduxProductInventory]);

   const incrementQuantity = (key, toMinus = false) => {
      const index = products.findIndex((item) => item.key === key);

      if (index === -1) {
         return;
      }

      const currentProduct = products[index];

      // Uses referenced value
      const { quantity, unit_price: unitPrice } = currentProduct.item;
  
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
   };

   const setProductUnitPrice = (key, e) => {
      const index = products.findIndex((item) => item.key === key);

      if (index === -1) {
         return;
      }

      const value = e.target.value;

      const currentProduct = products[index];

      // Uses referenced value
      const { quantity } = currentProduct.item;

      products[index].item.unit_price = value;
      products[index].item.total_price = quantity * value;
      setProducts([...products]);
   };

   // Adding Updated Product Data to Firebase
   const save = async () => {
      try {
         const batch = writeBatch(db);

         // Loop through products to update each

         products.forEach((product) => {
            console.log('product.key', product.key);

            const sfRef = doc(db, 'Products', product.key);
            batch.update(sfRef, { ...product.item });
         });

         await batch.commit();
      } catch (err) {
         console.log(err);
         return;
      }
      try {
         // Adding Data to Firebase
         const collectionRef = collection(db, 'InventoryList');
         const payload = { items: products, total, Editor: currentUser.email, createdAt: Timestamp.now() };

         await addDoc(collectionRef, payload);
      } catch (err) {
         console.log(err);
      }
   };

   const deleteHandler = async (id) => {
      const docRef = doc(db, 'Products', id);
      await deleteDoc(docRef);
   };

   if (!products) return null;

   console.log('state before render...', products);

   return (
      <>
         <PagesBody>
            <PageTitleCard>
               <div className={ProductInventoryStyle['page-title']}>
                  <h2 className="text-white">Product Inventory</h2>
               </div>
               <div className="mt-3">
                  <Row>
                     <Col xs={5}>
                        <Card>
                           <Card.Header as="h5" className={cn(ProductInventoryStyle['card-header'], 'text-white', 'text-center')}>
                              Products
                           </Card.Header>
                           <Card.Body  className={cn(ProductInventoryStyle['card-body-holder'],'px-2','py-2')}>
                              <div className={ProductInventoryStyle['product-nav-holder']}> 
                                 <Row>
                                    <Col xs={4}>
                                       <p className='text-center'>
                                          Product Name
                                       </p>
                                    </Col>
                                    <Col xs={2}>
                                       <p className='text-center'>
                                          Quantity
                                       </p>
                                    </Col>
                                    <Col xs={3}>
                                       <p className='text-center'>
                                         Unit Price
                                       </p>
                                    </Col>
                                    <Col>
                                       <p className='text-center'>
                                        Total Price
                                       </p>
                                    </Col>
                                 </Row>
                              </div>
                              {products.map((product) => (
                                 <Card className="mb-3" key={product.key}>
                                    <Card.Body className="px-2 py-2">
                                       <div className={SetInitialInventoryStyle['product-holder']}>
                                          <Row>
                                             <Col xs={4}>
                                                <input className="form-control" type="text" value={product.item.name} onChange={(e) => setProductName(product.key, e)} />
                                             </Col>
                                             <Col xs={2}>
                                                <div className="d-flex">
                                                   <button className="btn btn-success" onClick={() => incrementQuantity(product.key)}>
                                                      +
                                                   </button>
                                                   <p>{product.item.quantity}</p>
                                                   <button className="btn btn-danger" disabled={product.item.quantity === 0} onClick={() => incrementQuantity(product.key, true)}>
                                                      -
                                                   </button>
                                                </div>
                                             </Col>
                                             <Col xs={3}>
                                                <input className="form-control" type="number" value={product.item.unit_price} onChange={(e) => setProductUnitPrice(product.key, e)} />
                                             </Col>
                                             <Col>
                                                <p className='my-0'>{product.item.total_price}</p>
                                             </Col>
                                             <Col>
                                                <Button onClick={() => deleteHandler(product.key)} variant="danger">
                                                   x
                                                </Button>
                                             </Col>
                                          </Row>
                                       </div>
                                    </Card.Body>
                                 </Card>
                              ))}
                              <div className='d-flex justify-content-around align-items-center'>
                                 <Button variant="primary" onClick={save}>
                                    Save Inventory
                                 </Button>
                                 <Button variant="primary" onClick={() => setShowModal(!showModal)}>
                                    Add Product
                                 </Button>
                                 <h5>TOTAL: {total}</h5>
                              </div>
                           </Card.Body>
                        </Card>
                     </Col>
                     <Col xs={7}>
                        <InventoryList />
                     </Col>
                  </Row>
               </div>
            </PageTitleCard>
         </PagesBody>
         {showModal && <AddProduct modalToggle={() => setShowModal(!showModal)} />}
      </>
   );
}

export default ProductInventory;
