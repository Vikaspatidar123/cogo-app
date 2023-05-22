import { Modal, Button } from '@cogoport/components';

import styles from './styles.module.css';

import useDeleteTracker from '@/ui/page-components/ocean-tracking/hooks/useDeleteTracker';

function DeleteModal({
	show, setShow, refetch, tracker, setTrackers, type,
}) {
	const saasSubscriptionId = tracker?.id;

	const { disableTracker, loading } = useDeleteTracker({ saasSubscriptionId, type, setTrackers });
	const deleteData = async () => {
		await disableTracker();
		setShow(!show);
		refetch();
	};
	const text = () => {
		if (type === 'delete') {
			return 'Are you sure that you want to delete this tracker?';
		}
		return 'Are you sure that you want to Archive this tracker?';
	};

	return (
		<Modal size="md" show={show} onClose={() => setShow(!show)} placement="center">
			<div className={styles.text}>{text()}</div>
			<div className={styles.footer}>
				<Button loading={loading} size="md" themeType="secondary" onClick={() => setShow(!show)}>Cancel</Button>
				<Button loading={loading} size="md" themeType="primary" onClick={() => deleteData()}>OK</Button>
			</div>
		</Modal>
	);
}
export default DeleteModal;
