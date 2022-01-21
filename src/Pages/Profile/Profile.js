import React, { useState } from 'react';
import { Alert } from 'react-bootstrap';
import PagesUI from '../PagesUI/PagesBody';
import PageTitleCard from '../PagesUI/PageTitleCard';
import ProfileStyle from './Profile.module.css';
import { useAuth } from '../../Contex/AuthenticationContext';
import { useHistory } from 'react-router-dom';
import { getAuth, signOut } from 'firebase/auth';

function Profile() {
   const [errors, setErrors] = useState('');
   const { currentUser } = useAuth();
   const history = useHistory();

   async function handleLagout() {
      setErrors('');
      const auth = getAuth();
      signOut(auth)
         .then(() => {
            history.push('/LogIn');
         })
         .catch((err) => {
            setErrors('Field to Logout');
         });
   }

   return (
      <PagesUI>
         <PageTitleCard>
            <div className={ProfileStyle['title-holder']}>
               <h2 className="text-white">Profile</h2>
            </div>
            <div>
               {errors && <Alert variant="danger">{errors}</Alert>}
               <strong>Email:</strong>
               {currentUser.email}
               <button onClick={handleLagout}>logout</button>
            </div>
         </PageTitleCard>
      </PagesUI>
   );
}

export default Profile;
