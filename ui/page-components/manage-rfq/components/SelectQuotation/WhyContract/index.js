import { Button } from '@cogoport/components';

import { ContractInfo } from '../../../constant';
import iconUrl from '../../../utils/iconUrl.json';

import styles from './styles.module.css';

function WhyContract({
	setShowWhyContract = () => {},
	onContractGuideClose = () => {},
}) {
	return (
		<div>
			<div className={styles.header}>Why Contract ?</div>
			<div className={styles.body}>
				<div className={styles.left_container}>
					<div>
						<div className={styles.title}>Create Contract</div>
						<div className={styles.sub_title}>to take advantage of</div>
						{ContractInfo.map(({ icon, text1 = '', text2 = '' }) => (
							<div className={styles.details}>
								<div className={styles.icon}>{icon}</div>
								<div className={styles.text}>
									<div>{text1}</div>
									{text2 && <div>{text2}</div>}
								</div>
							</div>
						))}
					</div>
				</div>
				<img src={iconUrl.contractVisual} className={styles.right_container} alt="contractVisual" />
			</div>
			<div className={styles.footer}>
				<div className={styles.btn_container}>
					<Button
						onClick={() => {
							onContractGuideClose();
							setShowWhyContract('');
						}}
					>
						Okay
					</Button>
				</div>
			</div>
		</div>
	);
}

export default WhyContract;
