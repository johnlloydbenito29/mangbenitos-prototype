import React, { useEffect, useState } from 'react';
import cn from 'classnames';

import { Row, Col, Card, Button } from 'react-bootstrap';

import PagesBody from '../../PagesUI/PagesBody';
import PageTitleCard from '../../PagesUI/PageTitleCard';
import ProductInventoryStyle from '../../PagesModuleCss/ProductInventory.module.css';
import SetInitialInventory from './SetInitialInventory';
import { useAuth } from '../../../Contex/AuthenticationContext';

import { getProductData, getUpdatedProductData } from '../../../Redux/Actions/productInventoryAction';

import { useSelector, useDispatch } from 'react-redux';
import { addDoc, collection } from 'firebase/firestore';
import { db } from '../../../Firebase/Firebase';
import SaveInitialProductInventory from './SaveInitialProductInventory';

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
   }, [reduxProductInventory]);

   if (!products) return null;

   // Updating the Product Data
   const updatingProductData = (quant, item, price) => {
      const updatedProductData = { Quantity: quant, Item: item, Price: price };
      dispatch(getUpdatedProductData(updatedProductData));
   };


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
                              <SetInitialInventory item={product.item.Item} quantity={product.item.Quantity} price={product.item.Price} key={product.key} updatingProductData={updatingProductData} />
                           ))}
                           <SaveInitialProductInventory/>
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
