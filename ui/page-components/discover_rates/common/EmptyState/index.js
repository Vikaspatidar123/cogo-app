import { Modal, Button } from '@cogoport/components';
import React, { useState } from 'react';
import { useSelector } from 'react-redux';

import { KycCampaign as KYC } from '../KYC';

import ICNonFunded from './ic-person-with-paper.svg';
import styles from './styles.module.css';

function EmptyState({ type, title, content }) {
	const isMobile = useSelector(({ general }) => general?.isMobile);
	const [show, setShow] = useState(false);
	return (
		<div className={styles.container}>
			<div className={styles.wrapper}>
				<h4 className={styles.heading}>{title}</h4>
				{content && <p className={styles.content}>{content}</p>}

				{type === 'kyc' && (
					<Button
						style={{ marginTop: 20 }}
						onClick={() => setShow(true)}
						className="uppercase"
					>
						Complete Your Kyc
					</Button>
				)}
				{show ? (
					<Modal
						show={show}
						onClose={() => {
							setShow(false);
						}}
						closable
						width={750}
						fullscreen={isMobile}
					>
						<KYC onFinalSubmit={() => setShow(false)} />
					</Modal>
				) : null}
			</div>
			<div className={styles.ic_container}>
				<ICNonFunded height="100%" width="100%" style={{ marginLeft: 20 }} />
			</div>
		</div>
	);
}

export default EmptyState;
