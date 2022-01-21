import React from 'react';
import PageUIStyle from '../PagesModuleCss/PageUIModule/PageBody.module.css'

function PagesUI(props) {
   return (
      <div className={PageUIStyle['page-body']}>
         <div className={'offset-2'}>
            <div className={'container-fluid'}>{props.children}</div>
         </div>
      </div>
   );
}

export default PagesUI;
