import { Button, Modal } from '@cogoport/components';

import useRequestCancellation from './hooks/useRequestCancellation';
import styles from './styles.module.css';

function RequestCancellation({
	showCancel = false,
	setShowCancel = () => {},
	onClose = () => {},
	refetch = () => {},
}) {
	const { loading, onRequest } = useRequestCancellation({
		setShowCancel,
		refetch,
	});

	return (
		<div>
			<div
				role="presentation"
				className={styles.button_text}
				onClick={() => {
					onClose();
					setShowCancel(true);
				}}
			>
				Request Cancellation
			</div>

			{showCancel ? (
				<Modal
					show={showCancel}
					onClose={() => setShowCancel(false)}
				>
					<div className={styles.modal_container}>
						<div className={styles.text}>Request for Cancellation</div>

						<div className={styles.dec}>Are you sure you want to request for Cancellation?</div>
						<div className={styles.button_box}>
							<Button themeType="secondary" onClick={() => setShowCancel(false)}>Cancel</Button>
							<Button disabled={loading} onClick={onRequest}>
								Request
							</Button>
						</div>
					</div>
				</Modal>
			) : null}
		</div>
	);
}

export default RequestCancellation;
