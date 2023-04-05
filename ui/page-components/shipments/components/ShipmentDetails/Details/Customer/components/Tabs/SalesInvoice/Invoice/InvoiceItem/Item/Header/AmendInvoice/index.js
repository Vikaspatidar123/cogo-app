import { Button, Modal } from '@cogoport/components';

import Layout from '../../../../../../../Layout';

import styles from './styles.module.css';

import useReviewInvoice from '@/ui/page-components/shipments/components/ShipmentDetails/hooks/useAmmendInvoice';

function AmendInvoice({
	showAmend = null,
	setShowAmend = () => {},
	invoice = {},
}) {
	const {
		onReview,
		control,
		controls,
		errors,
		handleSubmit,
		onError,
		loading,
		handleApprove,
	} = useReviewInvoice({
		invoice,
		onClose: () => setShowAmend(null),
	});

	let buttonText = 'Request Amendmend';
	if (showAmend === 'approved') {
		buttonText = 'Approve';
	}
	if (loading) {
		buttonText = 'Requesting';
	}

	const isApprove = showAmend === 'approved';

	return (
		<Modal show={showAmend} onClose={() => setShowAmend(false)} width={600}>
			<div className={styles.container}>
				<div className={styles.heading}>
					{!isApprove ? 'Request Amendemnt' : 'Approve invoice'}
				</div>

				{isApprove ? (
					<p>Are you sure you want to approve?</p>
				) : (
					<Layout control={control} controls={controls} errors={errors} />
				)}

				<div className={styles.button_container}>
					<Button
						className="primary md reviewed"
						onClick={
							isApprove ? handleApprove : handleSubmit(onReview, onError)
						}
						disabled={loading}
					>
						{buttonText}
					</Button>
				</div>
			</div>
		</Modal>
	);
}

export default AmendInvoice;
