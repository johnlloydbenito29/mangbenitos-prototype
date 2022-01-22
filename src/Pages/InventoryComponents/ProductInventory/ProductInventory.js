import React, { useEffect, useState } from 'react';
import cn from 'classnames';
import { useSelector, useDispatch } from 'react-redux';
import { addDoc, collection } from 'firebase/firestore';
import { Row, Col, Card, Button } from 'react-bootstrap';

import ProductInventoryStyle from '../../PagesModuleCss/ProductInventory.module.css';
import SetInitialInventoryStyle from '../../PagesModuleCss/SetInitialInventory.module.css';

import PagesBody from '../../PagesUI/PagesBody';
import PageTitleCard from '../../PagesUI/PageTitleCard';
import SetInitialInventory from './SetInitialInventory';
import { useAuth } from '../../../Contex/AuthenticationContext';
import { getProductData, getUpdatedProductData } from '../../../Redux/Actions/productInventoryAction';
import { db } from '../../../Firebase/Firebase';

function ProductInventory() {
   const { currentUser } = useAuth();

   // Redux State
   const reduxProductInventory = useSelector((state) => state.productInventory.initialProductArray);

   const [products, setProducts] = useState(null);

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

   const increaseQuantity = (key) => {
      console.log('increaseQuantity...');
      const index = products.findIndex((item) => item.key === key);
      console.log('products...', products);
      console.log('index...', index);
      console.log('key...', key);
      
      if (index === -1) {
         return;
      }

      const currentProduct = products[index];

      console.log('currentProduct...', currentProduct);
      console.log('currentProduct.item.Quantity...', currentProduct.item.Quantity);

      products[index].item.Quantity = currentProduct.item.Quantity + 1;

      console.log('products...', products);

      setProducts(products);
      // setQuantityCounter(quantityCounter + 1);
      // setPriceTotal((quantityCounter + 1) * price);
   };

   const decreaseQuantity = () => {
      // setQuantityCounter(quantityCounter - 1);
      // setPriceTotal((quantityCounter - 1) * price);
   };


   // Updating the Product Data
   const updatingProductData = (quant, item, price) => {
      const updatedProductData = [{ Quantity: quant, Item: item, Price: price }];
      dispatch(getUpdatedProductData(updatedProductData));
   };

   // Adding Updated Product Data to Firebase
   const addUpdatedProductDatatoFirebase = async () => {
      // const collectionRef = collection(db, 'InventoryList');
      // const payload = { ...reduxUpdatedProductData, created: Timestamp.fromDate(new Date()) };
      // await addDoc(collectionRef, payload);
      // console.log(reduxUpdatedProductData);
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
                                             <p>{product.item.Item}</p>
                                          </Col>
                                          <Col>
                                             <div className="d-flex">
                                                <button onClick={() => increaseQuantity(product.key)}>+</button>
                                                <p>{product.item.Quantity}</p>
                                                <button disabled={quantityCounter === 0} onClick={decreaseQuantity}>
                                                   -
                                                </button>
                                             </div>
                                          </Col>
                                          <Col>
                                             <p>{quantityCounter === 0 ? product.item.Price : priceTotal}</p>
                                          </Col>
                                       </Row>
                                    </div>
                                 </Card>
                              </>
                           ))}
                           <div>
                              <Button variant="primary" onClick={addUpdatedProductDatatoFirebase}>
                                 Save Inventory
                              </Button>
                              <h5>TOTAL:0 </h5>
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
