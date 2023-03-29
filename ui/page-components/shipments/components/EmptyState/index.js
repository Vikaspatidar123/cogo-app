// import React from 'react';
// import { Btn } from '@cogo/deprecated_legacy/ui';
// import { useRouter } from '@cogo/next';
import { Button } from '@cogoport/components';

import styles from './styles.module.css';

import { useRouter } from '@/packages/next';

function EmptyState({ viewAs = '' }) {
	const { push } = useRouter();

	return (
		<div className={styles.container}>
			<div className={styles.wrapper}>
				<h4>No bookings found</h4>
				<p>
					Looks like you haven’t yet made your first booking. That’s alright,
					let’s get you started.
				</p>

				<Button
					style={{ marginTop: 20 }}
					// onClick={handleCreate}
					className="uppercase"
				>
					{viewAs === 'importer_exporter'
						? 'Create your first booking'
						: 'Add More Rates to get booking'}
				</Button>
			</div>
			<div className={styles.icon_container}>
				<ICNonFunded height="100%" width="100%" style={{ marginLeft: 20 }} />
			</div>
		</div>
	);
}

export default EmptyState;
