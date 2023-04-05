import { Modal, Button } from '@cogoport/components';
import { useState } from 'react';

import useBookShipment from '../../../hooks/useBookShipment';

import CogoPoint from './CogoPoint';
import NewCogoPoint from './NewCogoPoint';
import PromoCodes from './PromoCodes';
import styles from './styles.module.css';
import SucessScreen from './SuccessScreen';
import Total from './Total';

function RateSummaryFooter({
	detail,
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
						onClick={onSubmit}
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
