import styles from './styles.module.css';

import { Image } from '@/packages/next';
import GLOBAL_CONSTANTS from '@/ui/commons/constants/globals';

function NoData() {
	return (
		<div className={styles.container}>
			<Image
				src={GLOBAL_CONSTANTS.image_url.insurance_empty_image}
				alt=""
				height={200}
				width={200}
			/>
			<div className={styles.heading}>Try Securing Your Cargo Now</div>
		</div>
	);
}

export default NoData;
