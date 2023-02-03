import React from 'react';

import Logo from './cogoport-logo.svg';
import styles from './styles.module.css';

function LeftPanel() {
	return (
		<div className={styles.left_container}>
			<div className={styles.cogo_icon_container}>
				<Logo width="150px" height="100px" />
			</div>
			<div className={styles.left_text_container}>
				<span className={styles.span}>Login to the</span>
				Cogoport App Platform!
				<div className={styles.left_text_subheader}>Deliver value to your customers</div>
			</div>
			<div className={styles.left_link_footer}>
				Need any help?
				<a href="mailto:support@cogoport.com" className={styles.link_mail_text}>support@cogoport.com</a>
			</div>
		</div>
	);
}

export default LeftPanel;
