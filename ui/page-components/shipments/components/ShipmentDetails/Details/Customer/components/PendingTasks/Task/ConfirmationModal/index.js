import { Button } from '@cogoport/components';

import styles from './styles.module.css';

function ConfirmationModal({
	label = ' ',
	triggerFunction = () => {},
	setShowModal = () => {},
	confirmation = {},
	isLoading,
}) {
	return (
		<div>
			<p>
				Confirm Submission of
				{label}
			</p>

			<div className={styles.description}>{confirmation?.message}</div>

			<div className={styles.button_container}>
				<Button
					className="secondary sm"
					onClick={() => setShowModal(false)}
					disabled={isLoading}
				>
					Cancel
				</Button>
				<Button
					className="primary sm"
					onClick={triggerFunction}
					disabled={isLoading}
				>
					Yes
				</Button>
			</div>
		</div>
	);
}
export default ConfirmationModal;
