import React from 'react';

import styles from './styles.module.css';

function LeftPanel() {
	return (
		<div className={styles.left_container}>
			<div className={styles.cogo_icon_container}>
				<img
					src="https://cdn.cogoport.io/cms-prod/cogo_public/vault/original/cogoport-admin.svg"
					alt="Logo Cogoport"
					className={styles.cogo_icon}
				/>
			</div>
			<div className={styles.left_text_container}>
				<span className={styles.span}>Login to the</span>
				Cogoport Partner Platform!
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
