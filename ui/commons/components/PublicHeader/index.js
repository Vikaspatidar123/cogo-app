import styles from './styles.module.css';

import { Image } from '@/packages/next';
import GLOBAL_CONSTANTS from '@/ui/commons/constants/globals';

function PublicHeader({ renderFunction }) {
	return (
		<div className={styles.container}>
			<Image src={GLOBAL_CONSTANTS.image_url.logo_icon} alt="" width={120} height={30} />
			{renderFunction}
		</div>
	);
}
export default PublicHeader;
