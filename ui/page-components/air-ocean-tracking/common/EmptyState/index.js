import Image from 'next/image';

import styles from './styles.module.css';

import GLOBAL_CONSTANTS from '@/ui/commons/constants/globals';

function EmptyState() {
	return (
		<div className={styles.container}>
			<Image
				src={GLOBAL_CONSTANTS.image_url.loading_banner}
				width={300}
				height={200}
				alt="loading"
			/>
			<Image
				src={GLOBAL_CONSTANTS.image_url.loading}
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
