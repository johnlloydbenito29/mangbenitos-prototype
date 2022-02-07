import React, { useEffect, useState } from 'react';

import cn from 'classnames';
import { Card, Row, Table, Col } from 'react-bootstrap';

import { collection, limit, onSnapshot, orderBy, query } from 'firebase/firestore';
import { db } from '../../../Firebase/Firebase';
import InventoryListCss from './InventoryList.module.css';

function InventoryList() {
   const [inventoryList, setInventoryList] = useState([]);
   console.log('inventoryList...', inventoryList);

   useEffect(() => {
      onSnapshot(query(collection(db, 'InventoryList'), orderBy('createdAt', 'desc'), limit()), (snapshot) => {
         setInventoryList(snapshot.docs.map((doc) => ({ key: doc.id, item: doc.data() })));
      });
   }, []);

   return (
      <Card>
         <Card.Header as="h5" className={cn(InventoryListCss['card-header'], 'text-white', 'text-center')}>
            Inventory List
         </Card.Header>
         <Card.Body className={InventoryListCss['list-body']}>
            <div className={cn(InventoryListCss['list-titles-holder'], 'row', 'gx-0')}>
               <Col>
                  <p className="fw-bold text-center">Item</p>
               </Col>
               <Col>
                  <p className="fw-bold text-center">Quantity</p>
               </Col>
               <Col>
                  <p className="fw-bold text-center">Price</p>
               </Col>
               <Col>
                  <p className="fw-bold text-center">Total</p>
               </Col>
               <Col>
                  <p className="fw-bold text-center">Date</p>
               </Col>
               <Col>
                  <p className="fw-bold text-center">Edited By</p>
               </Col>
            </div>
            <div>
               {inventoryList.map((inventoryData) => (
                  <div>
                     {inventoryData.item.items.map((item) => (
                        <Row>
                           <Col>
                              <p>{item.item.name}</p>
                           </Col>
                           <Col>
                              <p>{item.item.quantity}</p>
                           </Col>
                           <Col>
                              <p>{item.item.unit_price}</p>
                           </Col>
                           <Col>
                              <p>{inventoryData.item.total}</p>
                           </Col>
                           <Col>
                              <p>{inventoryData.item.total}</p>
                           </Col>
                           <Col>
                              <p>{inventoryData.item.Editor}</p>
                           </Col>
                        </Row>
                     ))}
                  </div>
               ))}
            </div>
         </Card.Body>
      </Card>
   );
}

export default InventoryList;
