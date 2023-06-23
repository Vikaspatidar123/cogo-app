import styles from './styles.module.css';

import { Image } from '@/packages/next';
import GLOBAL_CONSTANTS from '@/ui/commons/constants/globals';

const img_urls = [
	GLOBAL_CONSTANTS.image_url.unsubscription_cargo, GLOBAL_CONSTANTS.image_url.unsubscription_bottle,
];
const reversed_img_urls = [...img_urls].reverse();
function FooterImage({ unsubscribe = false }) {
	return (
		<div className={styles.container}>
			{img_urls.map((image_url) => (
				<div key={image_url} className={unsubscribe ? styles.image_movement1 : ''}>
					<Image
						alt=""
						src={image_url}
						width={100}
						height={100}
					/>
				</div>
			))}
			{reversed_img_urls.map((image_url) => (
				<div key={image_url} className={unsubscribe ? styles.image_movement : ''}>
					<Image
						alt=""
						src={image_url}
						width={100}
						height={100}
					/>
				</div>
			))}
		</div>
	);
}
export default FooterImage;
