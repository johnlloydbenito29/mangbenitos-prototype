import { db } from '../../Firebase/Firebase';
import { collection, getDocs, onSnapshot } from 'firebase/firestore';

export const getProductData = () => {
   return async function (dispatch) {
      const productArray = [];
      try {
         const productQuerySnapshot = await getDocs(collection(db, 'Pruducts'));
         productQuerySnapshot.forEach((doc) => {
            productArray.push({
               key: doc.id,
               item: doc.data(),
            });
         });
      } catch (error) {
         console.log(error);
      }
      dispatch({
         type: 'GET_PRODUCTLIST_DATA',
         payload: productArray,
      });
   };
};

export const getUpdatedProductData = (updatedProductData) => {
   return (dispatch) => {
      dispatch({
         type: 'GET_UPDATED_PRODUCT_DATA',
         updatedProductDataPayload: updatedProductData,
      });
   };
};
