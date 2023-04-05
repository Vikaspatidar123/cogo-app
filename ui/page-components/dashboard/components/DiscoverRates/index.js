import { IcMArrowNext, IcMSearchlight } from '@cogoport/icons-react';

import styles from './styles.module.css';

import { useRouter } from '@/packages/next';

function DiscoverRates() {
	const { push } = useRouter();

	const handelRouting = () => {
		push('/book');
	};

	return (
		<div className={styles.container}>
			<div className={styles.text}>
				Start discovering your rates/track your deals
			</div>

			<div className={styles.display_container}>
				<div className={styles.innerCard}>
					<div className={styles.icon}>
						<IcMSearchlight fill="white" />
					</div>
					<div>
						<div className={styles.text}>
							Discover Rates
						</div>
						<div className={styles.desc}>
							Don’t miss out on the competitive rates across FCL, LCL, Air and
							Haulage in one place.
						</div>
					</div>
				</div>
				<div className={styles.btn} role="presentation" onClick={() => handelRouting()}>
					<p className={styles.viewall}>Go to Rates</p>
					<IcMArrowNext className={styles.arrow} />
				</div>
			</div>
		</div>
	);
}

export default DiscoverRates;
