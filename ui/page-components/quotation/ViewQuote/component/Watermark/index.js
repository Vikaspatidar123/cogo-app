import styles from './styles.module.css';

import { Image } from '@/packages/next';
import GLOBAL_CONSTANTS from '@/ui/commons/constants/globals';

function Watermark() {
	return (
		<div className={styles.container}>
			<Image src={GLOBAL_CONSTANTS.image_url.cogoport_logo} alt="logo" width={150} height={80} />
		</div>
	);
}

export default Watermark;
