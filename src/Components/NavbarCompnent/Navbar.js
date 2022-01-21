import React from 'react';
import { useAuth } from '../../Contex/AuthenticationContext';

// Css
import cn from 'classnames';
import MainNavStyle from './Navbar.module.css';

// Logo Image
import logo from '../../img/logo.jpg';

function Navbar() {
   const { currentUser } = useAuth();
   return (
      <>
         <header className={MainNavStyle['page-header']}>
            <div className={cn('container-fluid','py-2')}>
               <div className={MainNavStyle['page-header__holder']}>
                  <div className={MainNavStyle['brand-logo__holder']}>
                     <img className={cn(MainNavStyle['brand-logo'],'img-fluid')} src={logo} alt="logo" />
                  </div>
                  <div className={ cn(MainNavStyle['username__holder'],'text-decoration-underline')}>
                     <p>{currentUser.email}</p>
                  </div>
               </div>
            </div>
         </header>
      </>
   );
}

export default Navbar;
