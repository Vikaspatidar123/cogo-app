import { Button } from '@cogoport/components';

import styles from './styles.module.css';

function EmptyState({ viewAs = '' }) {
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
		</div>
	);
}

export default EmptyState;
