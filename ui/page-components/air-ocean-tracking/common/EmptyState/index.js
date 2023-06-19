import Image from 'next/image';

import styles from './styles.module.css';

function EmptyState() {
	return (
		<div className={styles.container}>
			<Image
				src="https://cdn.cogoport.io/cms-prod/cogo_app/vault/original/loading-banner.svg"
				width={300}
				height={200}
				alt="loading"
			/>
			<Image
				src="https://cdn.cogoport.io/cms-prod/cogo_app/vault/original/loading.svg"
				width={40}
				height={40}
				alt="loading"
			/>

			<div>
				<h3>Retrieving Tracking Data</h3>
				<p>
					Fetching data on this container / shipment is taking longer than usual.
					We will inform you as soon as it&apos;s available.
				</p>
			</div>

		</div>
	);
}

export default EmptyState;
