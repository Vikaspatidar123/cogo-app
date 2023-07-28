import styles from './styles.module.css';

import { Image } from '@/packages/next';
import GLOBAL_CONSTANTS from '@/ui/commons/constants/globals';

function PopoverLoader() {
	return (
		<div className={styles.container}>
			<Image
				src={GLOBAL_CONSTANTS.image_url.payment_loading}
				alt="spinner"
				height={28}
				width={28}
			/>
		</div>
	);
}

export default PopoverLoader;
