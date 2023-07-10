import { Button } from '@cogoport/components';
import Image from 'next/image';

import styles from './styles.module.css';

import { useRouter } from '@/packages/next';

function CustomDuty() {
	const { push } = useRouter();
	return (
		<div className={styles.container}>
			<div className={styles.text}>Custom Duty Calculator</div>
			<div className={styles.seaction}>
				<div>
					<div className={styles.des}>
						Lorem ipsum dolor sit amet, consectetur adipiscing elit,

					</div>
					<div className={styles.text_des}>
						Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
						incididunt ut labore et dolore magna aliqua.
					</div>
					<Button
						themeType="accent"
						className={styles.button}
						type="button"
						onClick={() => push('/saas/premium-services/duties-taxes-calculator')}
					>
						Try Now!

					</Button>

				</div>

				<div className={styles.img_container}>
					<Image
						width={200}
						height={200}
						src="https://cdn.cogoport.io/cms-prod/cogo_app/vault/original/Saly-13.png"
						alt=""
					/>
				</div>
			</div>
		</div>
	);
}
export default CustomDuty;
