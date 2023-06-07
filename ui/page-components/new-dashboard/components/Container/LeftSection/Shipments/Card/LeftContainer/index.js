import { Button } from '@cogoport/components';

import styles from './styles.module.css';

import { useRouter } from '@/packages/next';
import getText from '@/ui/page-components/new-dashboard/common/getText';

const renderStatus = (ogShipmentData, service) => {
	const textObj = getText(ogShipmentData, service);

	return (
		<text className={styles.text} style={{ backgroundColor: textObj.color }}>
			{textObj.text}
		</text>
	);
};

function LeftContainer({ item }) {
	const { push } = useRouter();
	const { documents = '', state = '', service_type = '', shipment_type = '', services = '' } = item || {};
	const data = {
		documents,
		state,
		service_type,
		shipment_type,
	};

	return (
		<div className={styles.container}>
			<div className={styles.details}>

				{renderStatus(data, services)}

				<Button
					size="sm"
					themeType="accent"
					onClick={() => push(
						'/shipments/[id]',
						`/shipments/${item?.id}`,
					)}
					className={styles.button}
				>
					VIEW DETAILS
				</Button>
				{item?.pending_tasks_count	? (
					<div className={styles.dot}>
						<div className={styles.dot2} />
						<p className={styles.tasks}>
							{item?.pending_tasks_count}
							<span
								className={styles.pending}
							>
								pending tasks
							</span>
						</p>
					</div>
				) : null}
			</div>
		</div>
	);
}
export default LeftContainer;
