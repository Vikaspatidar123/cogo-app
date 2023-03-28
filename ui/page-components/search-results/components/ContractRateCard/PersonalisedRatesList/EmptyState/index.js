import { IcMArrowBack } from '@cogoport/icons-react';
import React from 'react';

import styles from './styles.module.css';

import { useRouter } from '@/packages/next';

function EmptyState(showBackICon = false) {
	const { push } = useRouter();
	return (
		<div className={styles.div}>
			{showBackICon && (
				<div
					className={styles.back_icon}
					role="presentation"
				>
					<IcMArrowBack onClick={() => push('/contract-rates', '/contract-rates')} />
				</div>
			)}
			<div className={styles.container}>
				<div className={styles.wrapper}>
					<img
						src="https://cdn.cogoport.io/cms-prod/cogo_admin/vault/original/empty-state.svg"
						alt="non-funded"
						height="100%"
						width="100%"
					/>
					<div className={styles.conent}>Rates are currently not available.</div>
				</div>
			</div>
		</div>
	);
}

export default EmptyState;
