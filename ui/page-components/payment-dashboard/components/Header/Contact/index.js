import React from 'react';

import styles from './styles.module.css';

import { useSelector } from '@/packages/store';

function Contact() {
    const { user_name } = useSelector(({ profile }) => ({
        user_name: profile.name || 'User',
    }));

    return (
        <div className={styles.container}>
            <span>
                Hi
                <span className={styles.user_name}>
                    {user_name}
                    ,
                </span>
            </span>
            <span>In case of any issue with invoices.</span>
            <span>
                Please get in touch on
                <a href="mailto:finance@cogoport.com">finance@cogoport.com</a>
            </span>
        </div>
    );
}

export default Contact;
