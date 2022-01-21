import { addDoc, collection } from 'firebase/firestore';
import React from 'react';
import { Button } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { db } from '../../../Firebase/Firebase';


function SaveInitialProductInventory() {
   const reduxUpdatedProductData = useSelector((state) => state.productInventory.updatedProductData);

   // Adding Updated Product Data to Firebase
   const addUpdatedProductDatatoFirebase = async () => {
      // const updatedList = updatedPrice;
      // const Editor = currentUser.email;

      const collectionRef = collection(db, 'InventoryList');
      const payload = { reduxUpdatedProductData };
      await addDoc(collectionRef, payload);
      console.log(reduxUpdatedProductData);
   };

   return (
      <div>
         <Button variant="primary" onClick={addUpdatedProductDatatoFirebase}>
            Save Inventory
         </Button>
         <h5>TOTAL:0 </h5>
      </div>
   );
}

export default SaveInitialProductInventory;
