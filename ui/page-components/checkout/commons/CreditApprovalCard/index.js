import { Toast, Button } from '@cogoport/components';
import { IcMRefresh } from '@cogoport/icons-react';
import { useSelector } from 'react-redux';

import styles from './styles.module.css';

import { useRequest } from '@/packages/request';

function CreditApprovalCard({ refetchCheckout, getCheckoutLoading }) {
	const {
		general: { asPrefix = '', scope = '', isMobile = false },
		profile: { id: user_id = '', organization = {} },
	} = useSelector((state) => state);

	const { id: organization_id = '' } = organization || {};

	const api = useRequest('post', false, scope)('/create_terms_and_condition');

	const refreshButton = () => {
		refetchCheckout();
	};

	const onClickGoToAgreement = async () => {
		try {
			const payload = {
				status : 'active',
				type   : 'pre_approved_credit',
				organization_id,
				user_id,
			};

			await api.trigger({ data: payload });

			window.open(
				`${asPrefix}/accept-terms-and-conditions?scope=app`,
				'_blank',
			);
		} catch (error) {
			Toast.error(error?.data);
		}
	};

	return (
		<div className={styles.container}>
			<div className={styles.header}>
				<div className={styles.Title}> Credit Approval Pending!</div>
				<div className={styles.container} role="presentation" onClick={refreshButton}>
					<div>Refresh </div>
					<div className={`${styles.refresh_icon} ${getCheckoutLoading ? 'animate' : ''}`}>
						<IcMRefresh
							style={{
								transform: 'scaleX(-1)',
							}}
						/>
					</div>
				</div>
				<div
					style={{
						display       : 'flex',
						flexDirection : isMobile ? 'column' : 'row',
					}}
				>
					<div className={styles.tnc_text}>
						Before you avail deferred payment, you need to accept the terms and
						conditions for credit approval, Click on &lsquo;Go to
						agreement&rsquo; button to continue. Kindly refresh the page after
						accepting the terms and conditions.
					</div>
					<div
						style={{
							display    : 'flex',
							alignItems : 'center',
							marginTop  : isMobile ? 12 : 0,
						}}
					>
						<Button
							onClick={onClickGoToAgreement}
							disabled={api?.loading}
						>
							Go to agreement
						</Button>
					</div>
				</div>
			</div>
		</div>
	);
}

export default CreditApprovalCard;
