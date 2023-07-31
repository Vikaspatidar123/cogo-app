import { IcCStar } from '@cogoport/icons-react';

import styles from './styles.module.css';

import { Image } from '@/packages/next';
import GLOBAL_CONSTANTS from '@/ui/commons/constants/globals';

function Title() {
	return (
		<div className={styles.container}>
			<div>
				<div className={styles.title}>
					<IcCStar width={20} height={20} />
					<div className={styles.title_text}>Share your feedback</div>
				</div>
				<div className={styles.text_1}>Share your Overall</div>
				<div className={styles.text_2}>
					Experience with
					{' '}
					<span className={styles.text_3}>Cogoport</span>
				</div>
			</div>
			<div>
				<Image src={GLOBAL_CONSTANTS.image_url.cogoport_water_mark} width="100" height="130" />
			</div>
		</div>
	);
}

export default Title;
