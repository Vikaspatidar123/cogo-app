import { Modal, Button } from '@cogoport/components';
import React, { useState } from 'react';

import { KycCampaign as KYC } from '../../common/KYC';

import Benefits from './Benefits';
import styles from './styles.module.css';

import { useSelector } from '@/packages/store';

function KycBenefits() {
	const [show, setShow] = useState(false);
	const isMobile = useSelector(({ general }) => general?.isMobile);
	return (
		<div>
			<div className={styles.benefits}>
				<p className={styles.heading}>
					Completing your KYC takes just a few minutes, and unlocks a host of
					other benefits too:
				</p>

				<Benefits />

				<Button
					size="md"
					themeType="primary"
					style={{ borderRadius: 12, margin: '24px 0px' }}
					onClick={() => setShow(true)}
				>
					COMPLETE KYC NOW
				</Button>
			</div>
			<Modal
				show={show}
				onClose={() => {
					setShow(false);
				}}
				closable
				width={750}
				// scroll={false}
			>
				<KYC onFinalSubmit={() => setShow(false)} />
			</Modal>
		</div>
	);
}
export default KycBenefits;
