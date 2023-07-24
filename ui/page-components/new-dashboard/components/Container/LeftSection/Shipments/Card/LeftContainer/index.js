import { Button } from '@cogoport/components';
import { useTranslation } from 'next-i18next';

import styles from './styles.module.css';

import { useRouter } from '@/packages/next';
import getText from '@/ui/page-components/new-dashboard/common/getText';

function RenderStatus({ ogShipmentData, service }) {
	const { t } = useTranslation(['dashboard']);
	const textObj = getText({ shipment_data: ogShipmentData, services: service, t });

	return (
		<text className={styles.text} style={{ backgroundColor: textObj.color }}>
			{textObj.text}
		</text>
	);
}

function LeftContainer({ item }) {
	const { documents = '', state = '', service_type = '', shipment_type = '', services = '' } = item || {};

	const { push } = useRouter();
	const { t } = useTranslation(['dashboard']);

	const data = {
		documents,
		state,
		service_type,
		shipment_type,
	};

	return (
		<div className={styles.container}>
			<div className={styles.details}>
				<RenderStatus ogShipmentData={data} service={services} />
				<div className={styles.button}>
					<Button
						size="sm"
						themeType="accent"
						onClick={() => push(
							'/shipments/[id]',
							`/shipments/${item?.id}`,
						)}
						className={styles.button}
					>
						{t('dashboard:onGoingShipments_card_text_5')}
					</Button>
				</div>
				{item?.pending_tasks_count ? (
					<div className={styles.dot}>
						<div className={styles.dot2} />

						<p className={styles.tasks}>
							{item?.pending_tasks_count}
							<span
								className={styles.pending}
							>
								{t('dashboard:onGoingShipments_card_text_4')}
							</span>
						</p>

					</div>
				) : null}
			</div>
		</div>
	);
}
export default LeftContainer;
