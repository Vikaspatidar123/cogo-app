import { Button } from '@cogoport/components';

import styles from './styles.module.css';

import { useRouter } from '@/packages/next';

function EmptyState({ viewAs = '' }) {
	const { push } = useRouter();
	const handleCreate = () => {
		if (viewAs === 'importer_exporter') {
			push('/book');
		} else {
			push(
				'/rate-management/[service]/[module]',
				'/rate-management/fcl-freight/freight',
			);
		}
	};

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
					onClick={handleCreate}
					className={styles.button}
				>
					{viewAs === 'importer_exporter'
						? 'Create your first booking'
						: 'Add More Rates to get booking'}
				</Button>
			</div>
			<div className={styles.icon_container}>
				<img
					src="https://cdn.cogoport.io/cms-prod/cogo_app/vault/original/ic-empty-non-funded"
					alt=""
					width={100}
					height={100}
					style={{ marginLeft: 20 }}
				/>
			</div>
		</div>
	);
}

export default EmptyState;
