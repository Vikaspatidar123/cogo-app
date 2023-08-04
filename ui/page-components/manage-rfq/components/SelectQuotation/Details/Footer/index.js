import { Button } from '@cogoport/components';

import styles from './styles.module.css';

function Footer({ selectedPairs, setShowContractCreation = () => {} }) {
	return (
		<div className={styles.container}>
			<div className={styles.footer_left}>
				{selectedPairs || 'No'}
				{' '}
				Port Pairs Selected
			</div>

			<div className={styles.footer_right}>
				<Button
					themeType="accent"
					className={styles.btn}
					onClick={() => {
						setShowContractCreation(true);
					}}
					disabled={!selectedPairs}
				>
					Request Contract
				</Button>
			</div>
		</div>
	);
}

export default Footer;
