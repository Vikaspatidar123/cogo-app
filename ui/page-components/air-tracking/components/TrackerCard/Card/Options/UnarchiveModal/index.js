import { Modal, Button } from '@cogoport/components';

import styles from './styles.module.css';

import useUnarchive from '@/ui/page-components/air-tracking/hooks/useUnarchive';

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
			<div>
				<div className={styles.text}>Are you sure that you want to Unarchive this tracker?</div>
				<div className={styles.footer}>
					<Button size="md" themeType="secondary" onClick={() => setShow(!show)}>Cancel</Button>
					<Button size="md" themeType="primary" onClick={() => deleteData()}>OK</Button>
				</div>
			</div>
		</Modal>
	);
}
export default UnarchiveModal;
