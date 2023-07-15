import { IcMCrossInCircle, IcMArrowNext } from '@cogoport/icons-react';
import { useTranslation } from 'next-i18next';
import { useState } from 'react';

import DeleteModal from '../../common/DeleteModal';
import useDeleteTrendSubscription from '../../hooks/useDeleteTrends';
import Stepper from '../Stepper';

import styles from './styles.module.css';

import { useRouter } from '@/packages/next';

function TrendCard({ trend = {}, fetchLocations = () => {} }) {
	const { origin_port = {}, destination_port = {} } = trend || {};
	const { t } = useTranslation(['frt']);
	const { push } = useRouter();

	const [showDeleteModal, setShowDeleteModal] = useState(false);
	const [trendId, setTrendId] = useState();

	const routeList = {
		origin      : origin_port?.name?.split(' - ')[0] || 'Origin',
		destination : destination_port?.name?.split(' - ')[0] || 'Destination',
	};

	const { loading, deleteTrend } = useDeleteTrendSubscription({ fetchLocations });

	return (
		<>
			<div className={styles.card}>
				<div className={styles.flex}>
					<div className={styles.flex_content}>
						{Object.keys(routeList).map((route) => (
							<div className={styles.text} key={route}>
								{routeList?.[route]}
							</div>
						))}
						<div
							className={styles.cross_div}
							role="presentation"
							onClick={() => {
								setShowDeleteModal(true);
								setTrendId(trend.id);
							}}
						>
							<IcMCrossInCircle />
						</div>
					</div>

					<Stepper originPort={origin_port} destinationPort={destination_port} />
					<div
						role="presentation"
						className={styles.footer}
						onClick={() => push(
							'/saas/freight-rate-trend/[trend_id]',
							`/saas/freight-rate-trend/${trend.id}`,
						)}
					>
						<div className={styles.text} size="12px" color="#4f4f4f">
							{t('frt:search_card_view_detail')}
						</div>
						<IcMArrowNext style={{ height: 14, width: 14, marginLeft: 8 }} />
					</div>
				</div>
			</div>

			{showDeleteModal && (
				<DeleteModal
					trendId={trendId}
					showDeleteModal={showDeleteModal}
					setShowDeleteModal={setShowDeleteModal}
					deleteTrend={deleteTrend}
					deleteLoading={loading}
				/>
			)}

		</>
	);
}

function EmptyTrendCard() {
	const { t } = useTranslation(['frt']);
	return (
		<div className={styles.container}>
			<div>
				<div className={styles.title}>{t('frt:empty_state_main_title')}</div>
				<h4>{t('frt:empty_state_label_1')}</h4>
				<p>{t('frt:empty_state_value_1')}</p>

				<h4>{t('frt:empty_state_label_2')}</h4>
				<p>{t('frt:empty_state_value_2')}</p>

				<h4>{t('frt:empty_state_label_3')}</h4>
				<ul>
					<li>{t('frt:empty_state_value_3')}</li>
					<li>{t('frt:empty_state_value_4')}</li>
				</ul>
				<p>{t('frt:empty_state_value_5')}</p>
			</div>
		</div>
	);
}

export { EmptyTrendCard };

export default TrendCard;
