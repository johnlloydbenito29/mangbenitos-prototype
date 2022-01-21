import React from 'react';
import { NavLink } from 'react-router-dom';

// CSS
import SidebarStyle from './Sidebar.module.css';
import cn from 'classnames';

function Sidebar() {
   return (
      <>
         <section className={cn(SidebarStyle['side-bar'], 'col-2', 'container-fluid')}>
            <div className={SidebarStyle['side-nav-item__holder']}>
               <div className={SidebarStyle['side-nav-item']}>
                  <h3 className={cn(SidebarStyle['side-nav__title'], 'text-uppercase')}>menu</h3>
                  <ul className={SidebarStyle['side-nav-link__holder']}>
                     <li>
                        <NavLink className={SidebarStyle['side-nav-link']} activeClassName={SidebarStyle['side-nav-link__active']} exact to="/Dashboard/ProductInventory">
                           Product Inventory
                        </NavLink>
                     </li>
                     <li>
                        <NavLink className={SidebarStyle['side-nav-link']} activeClassName={SidebarStyle['side-nav-link__active']} exact to="/Dashboard/SetPruductToSell">
                           Set Product to Sell
                        </NavLink>
                     </li>
                     <li>
                        <NavLink className={SidebarStyle['side-nav-link']} activeClassName={SidebarStyle['side-nav-link__active']} exact to="/Dashboard/CustomersOrder">
                           Customer's Order
                        </NavLink>
                     </li>
                  </ul>
               </div>
               <div className={SidebarStyle['side-nav-item']}>
                  <h3 className={cn(SidebarStyle['side-nav__title'], 'text-uppercase')}>Receiving Methods</h3>
                  <ul className={SidebarStyle['side-nav-link__holder']}>
                     <li>
                        <NavLink className={SidebarStyle['side-nav-link']} activeClassName={SidebarStyle['side-nav-link__active']} exact to="/Dashboard/TakeOut">
                           Take Out
                        </NavLink>
                     </li>
                     <li>
                        <NavLink className={SidebarStyle['side-nav-link']} activeClassName={SidebarStyle['side-nav-link__active']} exact to="/Dashboard/Delivery">
                           Delivery
                        </NavLink>
                     </li>
                     <li>
                        <NavLink className={SidebarStyle['side-nav-link']} activeClassName={SidebarStyle['side-nav-link__active']} exact to="/Dashboard/Canceled">
                           Canceled
                        </NavLink>
                     </li>
                  </ul>
               </div>
               <div className={SidebarStyle['side-nav-item']}>
                  <h3 className={cn(SidebarStyle['side-nav__title'], 'text-uppercase')}>Saved reports</h3>
                  <ul className={SidebarStyle['side-nav-link__holder']}>
                     <li>
                        <NavLink className={SidebarStyle['side-nav-link']} activeClassName={SidebarStyle['side-nav-link__active']} exact to="/Dashboard/SalesLIst">
                           {' '}
                           Sales List{' '}
                        </NavLink>
                     </li>
                  </ul>
               </div>
               <div className={SidebarStyle['side-nav-item']}>
                  <h3 className={cn(SidebarStyle['side-nav__title'], 'text-uppercase')}>Profile</h3>
                  <ul className={SidebarStyle['side-nav-link__holder']}>
                     <li>
                        <NavLink className={SidebarStyle['side-nav-link']} activeClassName={SidebarStyle['side-nav-link__active']} exact to="/Dashboard/Profile">
                           Profile
                        </NavLink>
                     </li>
                  </ul>
               </div>
            </div>
         </section>
      </>
   );
}

export default Sidebar;
