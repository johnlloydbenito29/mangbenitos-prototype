import React from 'react'
import PageTitleStyle from '../PagesModuleCss/PageUIModule/PageTitleCard.module.css';
import {Container} from 'react-bootstrap'

function PageTitleCard(props) {
    return (
        <Container fluid>
            <div className={PageTitleStyle['page-title']}>
                {props.children}
            </div>
        </Container>
    )
}

export default PageTitleCard
