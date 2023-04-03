import { Placeholder, Button } from '@cogoport/components';
import React from 'react';

import styles from './styles.module.css';

import { useRouter } from '@/packages/next';

function ContractAd({ contractDetail, loading, importerExporterId }) {
	const { push } = useRouter();

	const { count = 0 } = contractDetail || {};

	const redirectToContract = () => {
		push(
			'/contract-management?activeTab=active',
			'/contract-management?activeTab=active',
		);
		// } else {
		// 	push(
		// 		`/contract-rates/dashboard/[active_tab]?importerExporterId=${importerExporterId}`,
		// 		`/contract-rates/dashboard/active?importerExporterId=${importerExporterId}`,
		// 	);
		// }
	};

	return (
		<>
			{count <= 0 && (
				<div className={`${styles.container} ${styles.advertise}`}>
					{!loading ? (
						<div className={styles.advertise}>
							<img
								src="https://cdn.cogoport.io/cms-prod/cogo_app/vault/original/lock-price-banner.svg"
								alt="cogoport"
							/>
						</div>
					) : <Placeholder height="100px" width="100%" />}
				</div>
			)}

			{count > 0 && (
				<div className={styles.container}>
					{!loading ? (
						<>
							<div className={styles.contract_tag}>
								<img

									src="https://cdn.cogoport.io/cms-prod/cogo_app/vault/original/contract-ad.svg"
									alt="cogoport"
								/>
							</div>
							<div className={styles.content}>
								<div className={styles.label}>
									This organization has already
									{' '}
									{count}
									{' '}
									active contracts in this port pair.
								</div>
								<Button onClick={redirectToContract}>
									View Contracts
								</Button>
							</div>
						</>
					) : (
						<Placeholder height="100px" width="100%" />
					)}
				</div>
			)}
		</>
	);
}

export default ContractAd;
