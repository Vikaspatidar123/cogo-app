import { Modal, Button } from '@cogoport/components';

import styles from './styles.module.css';

import useUnarchive from '@/ui/page-components/ocean-tracking/hooks/useUnarchive';

function UnarchiveModal({
	show, setShow, refetch, tracker,
}) {
	const saasSubscriptionId = tracker?.id;

	const { disableTracker } = useUnarchive({ saasSubscriptionId });
	const deleteData = async () => {
		await disableTracker();
		setShow(!show);
		refetch();
	};

	return (
		<Modal size="md" show={show} onClose={() => setShow(!show)} placement="center">
			<Modal.Header title="Are you sure that you want to Unarchive this tracker?" />

			<div className={styles.footer}>
				<Button onClick={() => setShow(!show)}>Cancel</Button>
				<Button onClick={() => deleteData()}>OK</Button>
			</div>
		</Modal>
	);
}
export default UnarchiveModal;
