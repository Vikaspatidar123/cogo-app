import styles from './styles.module.css';

import { useSelector } from '@/packages/store';

function CheckoutFooterHowItWorks() {
	const {
		profile: { email },
	} = useSelector((state) => state);

	return (
		<div className={styles.container}>
			<div className={styles.title}>When your order is placed:</div>
			<div className={styles.list}>
				<li>
					We will send you email confirmation to your registered email ID:
					<span className="light-color">{email}</span>
				</li>
				<li>
					{'You will receive call from our '}
					<span className="bold-color">Key Account Manager (KAM)</span>
					, to
					confirm your booking & get more details
				</li>
				<li>
					After confirmation, our team will work on procuring booking note
				</li>
			</div>
		</div>
	);
}

export default CheckoutFooterHowItWorks;
