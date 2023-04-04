import { Button } from '@cogoport/components';
import { IcMInfo } from '@cogoport/icons-react';
import { useState } from 'react';

import FeedBackModal from '../NoResultFound/FeedbackModal';

import styles from './styles.module.css';

function RequestRate({ headerData }) {
	const [showFeedbackModal, setShowFeedBackModal] = useState(false);
	const addedAdditionalService = [];
	Object.keys(headerData?.service_details || {}).forEach((service) => {
		if (
			!['fcl_freight', 'air_freight'].includes(
				headerData?.service_details?.[service]?.service_type,
			)
		) {
			addedAdditionalService.push(
				`${headerData?.service_details?.[service]?.trade_type}_${headerData?.service_details?.[service]?.service_type}`,
			);
		}
	});
	let proceeedWithFeedback = !(
		['fcl_freight', 'air_freight'].includes(headerData?.service_type)
		&& headerData?.inco_term === 'exw'
	);
	if (['fcl_freight', 'air_freight'].includes(headerData?.service_type)) {
		if (
			(addedAdditionalService.includes('export_ftl_freight')
				|| addedAdditionalService.includes('export_ltl_freight')
				|| addedAdditionalService.includes('export_haulage_freight')
				|| addedAdditionalService.includes('export_trailer_freight'))
			&& (addedAdditionalService.includes('export_fcl_customs')
				|| addedAdditionalService.includes('export_air_customs'))
		) {
			proceeedWithFeedback = true;
		}
	}

	return (
		<>
			<div className={styles.container}>
				<div className={styles.detai_iCon}>
					<img
						src="https://cdn.cogoport.io/cms-prod/cogo_admin/vault/original/request-rate.svg"
						alt="request rates"
						width={56}
						height={56}
					/>

					<div className={styles.content}>
						<div className={styles.detail_text}>
							Rates are currently not available. Do you want to send feedback to
							market intelligence ?
						</div>
						<div className={styles.info_text}>
							<IcMInfo color="#B53E4E" />
							Please Note : Submitting feedback will result in Cogoport team to
							improve their rates.
						</div>
					</div>
				</div>
				<div className={styles.detail_icon}>
					<Button
						onClick={() => setShowFeedBackModal(true)}
						themeType="secondary"
					>
						SEND FEEDBACK
					</Button>
				</div>
			</div>

			{showFeedbackModal ? (
				<FeedBackModal
					onClose={() => {
						setShowFeedBackModal(false);
					}}
					show={showFeedbackModal}
					details={headerData}
					proceeedWithFeedback={proceeedWithFeedback}
				/>
			) : null}
		</>
	);
}

export default RequestRate;
