import { Button } from '@cogoport/components';
import { IcMArrowNext } from '@cogoport/icons-react';

import styles from './styles.module.css';

import { Image } from '@/packages/next';

function CheckKyc() {
	return (
		<div className={styles.container}>
			<div className={styles.box}>
				<Image
					src="https://cdn.cogoport.io/cms-prod/cogo_app/vault/original/Data_security_14-removebg-preview.svg"
					alt="Kyc"
					width={60}
					height={60}
				/>
				<div>
					<div className={styles.heading}>KYC Verification is pending!</div>
					<div className={styles.des}>Kindly upload the required documents to proceed further.</div>
					<div className={styles.button}>
						<Button size="sm" themeType="linkUi" type="button">
							Complete KYC
							<IcMArrowNext />
						</Button>
					</div>
				</div>
			</div>

		</div>
	);
}
export default CheckKyc;
