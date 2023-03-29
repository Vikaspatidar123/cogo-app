// import { AuthorizeKyc } from '@cogo/authorization';
import React from 'react';

import styles from './styles.module.css';

import { useSelector } from '@/packages/store';

function GenericCard({
	theme = '',
	title = '',
	description = '',
	cta = '',
	onClick = () => {},
	bg = '',
	kyc = {},
}) {
	const scope = useSelector((state) => (state.general || {}).scope);

	const action = (
		<div className={styles.action} role="presentation" onClick={onClick}>
			{cta}
		</div>
	);

	// const actionWithKyc = (
	// 	<AuthorizeKyc config={kyc?.message}>{action}</AuthorizeKyc>
	// );

	return (
		<div className={styles.container}>
			<div className={styles.title}>{title}</div>

			<div className={styles.description}>{description}</div>

			{/* {kyc?.check && scope === 'app' ? actionWithKyc : action} */}
		</div>
	);
}

export default GenericCard;
