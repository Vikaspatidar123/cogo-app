// import Image from 'next/image';

// import GLOBAL_CONSTANTS from '../../../../../../packages/globalization/constants/globals';

// import { Container } from './styles';
import styles from './styles.module.css';

import { Image } from '@/packages/next';
import GLOBAL_CONSTANTS from '@/ui/commons/constants/globals';

function FooterImage({ unsubscribe = false }) {
	return (
		<div className={styles.container}>
			<div className={unsubscribe ? styles.image_movement1 : ''}>
				<Image
					alt=""
					src={GLOBAL_CONSTANTS.image_url.unsubscription_cargo}
					width={100}
					height={100}
				/>
			</div>
			<div className={unsubscribe ? styles.image_movement1 : ''}>
				<Image
					alt=""
					src={GLOBAL_CONSTANTS.image_url.unsubscription_bottle}
					width={100}
					height={100}
				/>
			</div>
			<div className={unsubscribe ? styles.image_movement : ''}>
				<Image
					alt=""
					src={GLOBAL_CONSTANTS.image_url.unsubscription_bottle}
					width={100}
					height={100}
				/>
			</div>
			<div className={unsubscribe ? styles.image_movement : ''}>
				<Image
					alt=""
					src={GLOBAL_CONSTANTS.image_url.unsubscription_cargo}
					width={100}
					height={100}
				/>
			</div>
		</div>
	);
}
export default FooterImage;
