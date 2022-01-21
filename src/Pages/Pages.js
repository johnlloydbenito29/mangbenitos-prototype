import React from 'react';
import {Route, Switch } from 'react-router-dom';

import ProductInventory from './InventoryComponents/ProductInventory/ProductInventory';
import SetPruductToSell from './InventoryComponents/SetPruductToSell';
import CustomersOrder from './OrderSystemComponent/CustomersOrder';
import TakeOut from './OrderSystemComponent/TakeOut';
import Delivery from './OrderSystemComponent/Delivery';
import Canceled from './OrderSystemComponent/Canceled';
import SalesLIst from './InventoryComponents/SalesLIst';
import Profile from './Profile/Profile';

function Pages() {
   return (
      <Route>
         <Switch>
            <Route path="/Dashboard/ProductInventory" ><ProductInventory/></Route>
            <Route path="/Dashboard/SetPruductToSell" ><SetPruductToSell/></Route>
            <Route path="/Dashboard/CustomersOrder" ><CustomersOrder/></Route>
            <Route path="/Dashboard/TakeOut" ><TakeOut/></Route>
            <Route path="/Dashboard/Delivery" ><Delivery/></Route>
            <Route path="/Dashboard/Canceled" ><Canceled/></Route>
            <Route path="/Dashboard/SalesLIst" ><SalesLIst/></Route>
            <Route path='/Dashboard/Profile'><Profile/></Route>
         </Switch>
      </Route>
   );
}

export default Pages;
