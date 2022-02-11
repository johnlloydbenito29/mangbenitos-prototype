import React, { useEffect, useState } from 'react';

import { collection, limit, onSnapshot, orderBy, query } from 'firebase/firestore';
import { db } from '../../Firebase/Firebase';

import PagesBody from '../PagesUI/PagesBody';

function CustomersOrder() {
   const [inventoryList, setInventoryList] = useState([]);
   console.log('inventoryList...', inventoryList);

// List of inventory Data
useEffect(() => {
   onSnapshot(query(collection(db, 'InventoryList'), orderBy('createdAt', 'desc'), limit()), (snapshot) => {
      setInventoryList(snapshot.docs.map((doc) => ({ key: doc.id, item: doc.data() })));
   });
}, []);

// Reduce to Get The lates Inventory
const latestInvArr = inventoryList.reduce((prevInvarr,latestInvArr)=>(prevInvarr = prevInvarr > latestInvArr.item.createdAt ? prevInvarr: latestInvArr),0)
console.log(`latesInv...`, latestInvArr);

   return (
      <PagesBody>
      </PagesBody>
   );
}

export default CustomersOrder;
