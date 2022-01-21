import React, { useState, useEffect } from 'react';

import { Card, Row, Col, Button } from 'react-bootstrap';
import SetInitialInventoryStyle from '../../PagesModuleCss/SetInitialInventory.module.css';

import { useDispatch,useSelector } from 'react-redux';

function SetInitialInventory({ quantity, item, price, updatingProductData }) {
   const dispatch = useDispatch();


   let [quantityCounter, setQuantityCounter] = useState(0);
   let [priceTotal, setPriceTotal] = useState(0);


   useEffect(() => {
      setQuantityCounter(quantity);
   }, [quantity]);

   useEffect(() => {
      setPriceTotal(price);
   }, [price]);

   const increaseQuantity = () => {
      setQuantityCounter(quantityCounter + 1);
      setPriceTotal((quantityCounter + 1) * price);
   };

   const decreaseQuantity = () => {
      setQuantityCounter(quantityCounter - 1);
      setPriceTotal((quantityCounter - 1) * price);
   };

   useEffect(() => {
      updatingProductData(quantityCounter, item, priceTotal);
   }, [quantityCounter, item, priceTotal]);

   return (
      <Card className="mb-3">
         <div className={SetInitialInventoryStyle['product-holder']}>
            <Row>
               <Col>
                  <p>{item}</p>
               </Col>
               <Col>
                  <div className="d-flex">
                     <button onClick={increaseQuantity}>+</button>
                     <p>{quantityCounter}</p>
                     <button disabled={quantityCounter === 0} onClick={decreaseQuantity}>
                        -
                     </button>
                  </div>
               </Col>
               <Col>
                  <p>{quantityCounter === 0 ? price : priceTotal}</p>
               </Col>
            </Row>
         </div>
      </Card>
   );
}

export default SetInitialInventory;
