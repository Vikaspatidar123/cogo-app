import { Button } from '@cogoport/components';
import { IcMEmail, IcMEyeopen, IcMInfo } from '@cogoport/icons-react';
import React, { useState } from 'react';

import useSubmitOfferLetter from '../../hooks/useSubmitOfferLetter';
import { OfferLetterWaiting } from '../WaitingScreens';

import AmmedmentHistory from './AmmedmentHistory';
import RequestAmmedment from './RequestAmmedment';
import styles from './styles.module.css';

import { Image } from '@/packages/next';
import GLOBAL_CONSTANTS from '@/ui/commons/constants/globals';

function OfferLetterDetails({ getCreditRequestResponse = {}, refetch = () => {} }) {
	const { onSubmit, loading } = useSubmitOfferLetter();
	const {
		offer_letter_status = '', approved_credit_details = {},
		documents = {}, comments = {},
		credit_id = '',
	} = getCreditRequestResponse;
	const {
		amount = 0,
		currency,
		grace_period,
		advance_rate,
		processing_fee,
		interest,
		overdue_charges,
	} = approved_credit_details || {};
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
				<Image
					src={GLOBAL_CONSTANTS.image_url.ef_offer_letter_email_image}
					alt="email-offer-Letter"
					width={100}
					height={90}
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
								{interest}
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
								<Button
									themeType="secondary"
									type="button"
									onClick={() => setShowAmmedmentView((prev) => !prev)}
								>
									View Request
								</Button>

					)}
					<Button themeType="secondary" type="button" onClick={() => setShowRequestView((prev) => !prev)}>
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
					themeType="primary"
					size="lg"
					disabled={
							!documents?.offer_letter?.active
							&& !documents?.signed_offer_letter?.active
						}
					type="button"
					loading={loading}
					onClick={handleSubmitOfferLetter}
					className={styles.proceed_btn}
				>
					{offer_letter_status === 'signed' ? 'Proceed' : 'Lock Offer Letter'}
				</Button>
			</div>
		</div>
	);
}

export default OfferLetterDetails;
