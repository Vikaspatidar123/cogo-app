import { Modal, Button } from '@cogoport/components';
import { useState } from 'react';

import useBookShipment from '../../../hooks/useBookShipment';

import CogoPoint from './CogoPoint';
import EmailConfirmation from './EmailConfirmation';
import NewCogoPoint from './NewCogoPoint';
import PromoCodes from './PromoCodes';
import styles from './styles.module.css';
import SucessScreen from './SuccessScreen';
import Total from './Total';

function RateSummaryFooter({
	detail,
	info,
	isApp,
	rate,
	summary,
	cogopoint_data,
	refetch,
	getCheckoutLoading,
}) {
	const [show, setShow] = useState({
		show : false,
		id   : null,
	});
	const [confirmation, setConfirmation] = useState(false);
	const { bookShipment, loading } = useBookShipment(rate);

	const { credit_details, credit_terms_amd_condition } = detail || {};
	const { is_any_invoice_on_credit = false } = credit_details || {};
	const { is_tnc_accepted = true } = credit_terms_amd_condition || {};

	const isLoadingTrueForConfirmBookingButton =		is_any_invoice_on_credit
		&& !is_tnc_accepted
		&& credit_details?.credit_source === 'pre_approved_clean_credit';

	const onSubmit = async () => {
		setShow(true);
		const id = await bookShipment();

		setShow({
			show: !!id,
			id,
		});
	};
	const handleClick = () => (detail?.primary_service === 'fcl_freight'
		? setConfirmation(true)
		: onSubmit());
	const isKycPending =		detail.importer_exporter.kyc_status !== 'verified'
		&& !detail.importer_exporter.skippable_checks?.includes('kyc');

	return (
		<>
			<div className={styles.container}>
				<PromoCodes
					promotions={rate.promotions?.promocodes || []}
					refetch={refetch}
				/>
				<CogoPoint cogopoint_data={cogopoint_data} refetch={refetch} />
				<div className={styles.main}>
					<Total rate={rate} />
					<Button
						type="button"
						onClick={handleClick}
						size="md"
						themeType="accent"
						className={styles.submit}
						disabled={
							loading
							|| isKycPending
							|| isLoadingTrueForConfirmBookingButton
							|| getCheckoutLoading
						}
					>
						{loading ? 'Confirming...' : 'Confirm Booking'}
						<NewCogoPoint cogopoint_data={cogopoint_data} />
					</Button>
				</div>
			</div>
			{confirmation ? (
				<EmailConfirmation
					info={info}
					isApp={isApp}
					handleSendEmail={onSubmit}
					confirmation={confirmation}
					setConfirmation={setConfirmation}
					rate={rate}
				/>
			) : null}
			<Modal
				className="primary lg"
				closable={false}
				show={show.show}
				onClose={() => setShow(false)}
			>
				<SucessScreen rate={rate} summary={summary} shipmentId={show.id} />
			</Modal>
		</>
	);
}

export default RateSummaryFooter;
