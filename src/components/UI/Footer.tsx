import React from 'react';
import Layout from './Layout';
import classes from './Footer.module.css';

const Footer=()=>{
    return(
        <div className={classes['footer']}>
            <Layout/>
        </div>
    );
}

export default Footer;