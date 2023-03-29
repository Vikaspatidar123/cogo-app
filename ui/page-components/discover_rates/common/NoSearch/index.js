// import { KycCampaign as KYC } from '@cogo/business-modules/components/kyc';
// import { Flex, Text, Button } from '@cogo/commons/components';

import { Modal, Button } from '@cogoport/components';
import { useState } from 'react';

import styles from './styles.module.css';

import { useRouter } from '@/packages/next';
import { useSelector } from '@/packages/store';

function KYCDialog() {
	const { push } = useRouter();
	const { isMobile } = useSelector(({ general, profile }) => ({
		isMobile   : general?.isMobile,
		kyc_status : profile?.organization?.kyc_status,
	}));
	const [show, setShow] = useState(false);
	const text = 'You have exhausted your balance of available searches. Buy more searches and discover rates across FCL, LCL, Air and Haulage in one place.';
	return (
		<div className={styles.flex}>
			<Modal
				show={show}
				onClose={() => {
        	setShow(false);
				}}
				closable
				width={750}
			>
				{/* <KYC onFinalSubmit={() => setShow(false)} /> */}
			</Modal>
			<div
				bgColor="#2C3E50"
				borderRadius={8}
				padding={24}
				direction={!isMobile ? 'row' : 'column-reverse'}
			>
				<div width={!isMobile ? 480 : '100%'} display="block">
					<text>{text}</text>

					<div justifyContent={!isMobile ? 'flex-start' : 'center'}>
						<Button
							style={{
              	backgroundColor : '#FFF',
              	color           : '#333',
              	borderColor     : '#FFF',
							}}
							size="lg"
              // onClick={() => push('/saas/subscriptions', '/saas/subscriptions')}
							onClick={() => push(
              		'/saas/cogo-subscriptions/manage-subscription',
              		'/saas/cogo-subscriptions/manage-subscription',
							)}
						>
							BUY MORE SEARCHES
						</Button>
					</div>
				</div>

				<div justifyContent={!isMobile ? 'flex-end' : 'center'} flex={1}>
					<img
						src="https://cdn.cogoport.io/cms-prod/cogo_app/vault/original/nogstIcon.svg"
						alt="loading"
						style={{ marginRight: !isMobile ? 48 : 0 }}
						height={160}
						width={160}
					/>
				</div>
			</div>
		</div>
	);
}

export default KYCDialog;
