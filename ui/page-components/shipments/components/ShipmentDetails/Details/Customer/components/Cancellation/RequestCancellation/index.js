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
					className="primary md"
					show={showCancel}
					onClose={() => setShowCancel(false)}
				>
					<Modal.Header title="Request for Cancellation" />

					<Modal.Body>Are you sure you want to request for Cancellation?</Modal.Body>

					<Modal.Footer>
						<Button disabled={loading} onClick={onRequest}>
							Request
						</Button>
					</Modal.Footer>
				</Modal>
			) : null}
		</div>
	);
}

export default RequestCancellation;
