import React from 'react';

import styles from './styles.module.css';

import LeftPanel from '@/ui/commons/components/LeftPanel';

function ForgotPassowrd() {
	return (
		<div className={styles.container}>
			<div className={styles.left_container}>
				<LeftPanel />
			</div>
			<div className={styles.right_container}>
				<div className={styles.header}>
					<span className={styles.header_span}>Forgot Passowrd?</span>
					Let's help you out
				</div>
				Right Container
			</div>
		</div>
	);
}

export default ForgotPassowrd;
