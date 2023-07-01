import { Button } from '@cogoport/components';
import { IcMEmail, IcMEyeopen } from '@cogoport/icons-react';
import React, { useState } from 'react';

import styles from './styles.module.css';

function OfferLetterDetails({ active = {}, getCreditRequestResponse = {}, refetch = () => {} }) {
	const [showRequestView, setShowRequestView] = useState(false);
	const [showAmmedmentView, setShowAmmedmentView] = useState(false);
	
	return (
		<div className={styles.container}>
			<div className={styles.header_div}>
				<img
					src="https://cdn.cogoport.io/cms-prod/cogo_fintech/vault/original/email_offer"
					alt="email-offerLetter"
				/>
				<div className={styles.congrats_div}>
					<span>Congratulations 🎉</span>
					<span>
						Your offer letter is ready! Lock your offer letter
						proceed
					</span>
				</div>
			</div>
			<div className={styles.view_content}>
				<div className={styles.view_header}>
					<span>Offer letter Summary</span>
					<span>You can view and request changes to offer letter</span>
				</div>
				<div className={styles.offer_detail_view}>
					<div className={styles.offer_card}>
						<span>
							Export Finance Limit
						</span>

						<div className={styles.limit_text}>
							$500000
						</div>
					</div>
					<div className={styles.wrapper_div}>

						<div className={styles.limit_details_card}>
							<span>
								Finance Fees
							</span>
							<span>
								1% per month (calculated on pro
								rated basis on the advance amount)
							</span>
						</div>
						<div className={styles.limit_details_card}>
							<span>
								Finance Fees
							</span>
							<span>
								1% per month (calculated on pro
								rated basis on the advance amount)
							</span>
						</div>

					</div>
					<div className={styles.wrapper_div}>
						<div className={styles.limit_details_card}>
							<span>
								Finance Fees
							</span>
							<span>
								1% per month (calculated on pro
								rated basis on the advance amount)
							</span>
						</div>
						<div className={styles.limit_details_card}>
							<span>
								Finance Fees
							</span>
							<span>
								1% per month (calculated on pro
								rated basis on the advance amount)
							</span>
						</div>

					</div>
				</div>
				<div className={styles.offer_pdf_view}>
					<div className={styles.email_text_wrapper}>
						<IcMEmail />
						Offer Letter
					</div>
					<IcMEyeopen />
				</div>

			</div>
			<div className={styles.amedement_div}>
				<div className={styles.amedement_status_div}>
					Your amendment request has been reverted

				</div>
				<div className={styles.amedement_button_wrapper}>
					<Button themeType="secondary">
						View Request
					</Button>
					<Button themeType="secondary">
						Request Ammendment
					</Button>
				</div>
			</div>
		</div>
	);
}

export default OfferLetterDetails;
