import { collection, getDocs} from "firebase/firestore";
import { db } from "../../Firebase/Firebase";


export const getProductData = () => {
   return async function (dispatch) {
      const productArray = [];
      try {
         const productQuerySnapshot = await getDocs(collection(db, 'Products'));
         productQuerySnapshot.forEach((doc) => {
			 console.log('doc', doc.data());
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
