import { Button } from '@cogoport/components';
import { IcMEmail, IcMEyeopen, IcMInfo } from '@cogoport/icons-react';
import React, { useState } from 'react';

import useSubmitOfferLetter from '../../hooks/useSubmitOfferLetter';
import { OfferLetterWaiting } from '../WaitingScreens';

import AmmedmentHistory from './AmmedmentHistory';
import RequestAmmedment from './RequestAmmedment';
import styles from './styles.module.css';

function OfferLetterDetails({ active = {}, getCreditRequestResponse = {}, refetch = () => {} }) {
	const { onSubmit, loading, data } = useSubmitOfferLetter();
	const {
		offer_letter_status = '', approved_credit_details = {},
		documents = {}, comments = {},
		credit_id = '',
	} = getCreditRequestResponse;
	const {
		amount,
		currency,
		grace_period,
		advance_rate,
		processing_fee,
		factoring_fee,
		overdue_charges,
	} = approved_credit_details;
	const { offer_letter = {} } = documents;

	const [showRequestView, setShowRequestView] = useState(false);
	const [showAmmedmentView, setShowAmmedmentView] = useState(false);

	if (offer_letter_status === 'approval_pending') { return <OfferLetterWaiting />; }

	const handleSubmitOfferLetter = async () => {
		const resp = await onSubmit(credit_id);
		if (resp) {
			refetch();
		}
	};

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
							{amount}
							{' '}
							{currency}
						</div>
					</div>
					<div className={styles.wrapper_div}>

						<div className={styles.limit_details_card}>
							<span>
								Advance Rate
							</span>
							<span>
								{advance_rate}
								% of the net invoice value
							</span>
						</div>
						<div className={styles.limit_details_card}>
							<span>
								Finance Fees
							</span>
							<span>
								{factoring_fee}
								% per month (calculated on pro
								rated basis on the advance amount)
							</span>
						</div>

					</div>
					<div className={styles.wrapper_div}>
						<div className={styles.limit_details_card}>
							<span>
								Setup Fees
							</span>
							<span>
								Waived off for
								{' '}
								{processing_fee}
								{' '}
								transaction
							</span>
						</div>
						<div className={styles.limit_details_card}>
							<span>
								Transaction Fees
							</span>
							<span>
								{overdue_charges}
								% per month with
								{' '}
								{grace_period}
								{' '}
								days factoring slab on net invoice value
							</span>
						</div>

					</div>
				</div>
				{offer_letter?.active && (
					<div className={styles.offer_pdf_view}>
						<div className={styles.email_text_wrapper}>
							<IcMEmail />
							Offer Letter
						</div>
						<IcMEyeopen onClick={() => window.open(offer_letter?.active?.document_url)} />
					</div>
				)}

			</div>
			<div className={styles.amedement_div}>
				<div>
					{offer_letter?.rejected_on_review
					&& offer_letter?.active && (
						<div className={styles.amedement_status_div}>
							<IcMInfo width="20px" />
							Your amendment request has been reverted
						</div>
					)}

				</div>
				<div>
					{offer_letter?.rejected_on_review
					&& !offer_letter?.active && (
						<div className={styles.amedement_reject_status_div}>
							<IcMInfo width="20px" />
							Amendment request has been sent, Please wait atleast 4-6 hours for
							the updated offer letter or call back from our team.
						</div>
					)}
				</div>

				<div className={styles.amedement_button_wrapper}>
					{(Object.keys(comments).splice(1).length > 0
							|| documents?.offer_letter?.rejected_on_review?.id) && (
								<Button themeType="secondary" onClick={() => setShowAmmedmentView((prev) => !prev)}>
									View Request
								</Button>

					)}
					<Button themeType="secondary" onClick={() => setShowRequestView((prev) => !prev)}>
						{documents?.offer_letter?.rejected_on_review?.id
							? 'Re-Request Ammendment'
							: 'Request Ammendment'}
					</Button>
				</div>
			</div>
			{showRequestView && (
				<RequestAmmedment
					showRequestView={showRequestView}
					setShowRequestView={setShowRequestView}
					getCreditRequestResponse={getCreditRequestResponse}
					refetch={refetch}
				/>
			)}
			{showAmmedmentView && (
				<AmmedmentHistory
					showAmmedmentView={showAmmedmentView}
					setShowAmmedmentView={setShowAmmedmentView}
					getCreditRequestResponse={getCreditRequestResponse}
					refetch={refetch}
				/>
			)}
			<div className={styles.bottom_container}>
				<Button
					disabled={
							!documents?.offer_letter?.active
							&& !documents?.signed_offer_letter?.active
						}
					onClick={handleSubmitOfferLetter}
				>
					{offer_letter_status === 'signed' ? 'Proceed' : 'Lock Offer Letter'}
				</Button>
			</div>
		</div>
	);
}

export default OfferLetterDetails;
