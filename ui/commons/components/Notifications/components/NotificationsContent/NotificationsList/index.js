import { Avatar } from '@cogoport/components';
import { IcCDoubleTick, IcCFcrossInCircle, IcCTick } from '@cogoport/icons-react';
import { differenceInDays, isEmpty, toDate } from '@cogoport/utils';
import { useTranslation } from 'next-i18next';

import EmptyList from '../../../common/EmptyList';
import Loader from '../../../common/Loader';
import useUpdateCommunication from '../../../hooks/useUpdateCommunication';
import { getTimeAgo } from '../../../utils';

import styles from './styles.module.css';

import { useRouter } from '@/packages/next';
import GLOBAL_CONSTANTS from '@/ui/commons/constants/globals';
import formatDate from '@/ui/commons/utils/formatDate';

const getStatus = ({ item, t }) => {
	if (item?.is_clicked) {
		return (
			<div className={styles.status}>
				<IcCDoubleTick />
				{' '}
				{t('common:read')}
			</div>
		);
	}
	if (item?.is_seen) {
		return (
			<div className={styles.status}>
				<IcCTick />
				{' '}
				{t('common:seen')}
			</div>
		);
	}
	return null;
	// (
	// 	<div className={styles.status}>
	// 		<IcCFcrossInCircle />
	// 		{' '}
	// 		{t('common:un_read')}
	// 	</div>
	// )
};

function NotificationsList({ list = [], loading = false, getListCommunications = () => {} }) {
	const { t } = useTranslation('common');

	const { push } = useRouter();

	const { updateCommunication } = useUpdateCommunication({ getListCommunications });

	const onSubmit = (item, link) => {
		// if (item?.is_seen)
		updateCommunication(item);
		if (item?.is_clicked) push(link);
	};

	if (loading) {
		return <Loader />;
	}

	return isEmpty(list) ? (
		<EmptyList />
	) : (
		(list || []).map((item) => {
			const { content = {}, is_seen = '', service } = item || {};
			const { body = '', created_at = '', link = '', subject = '' } = content || {};
			const days_difference = differenceInDays(
				toDate(Date.now()),
				new Date(created_at),
			);
			return (
				<div
					role="presentation"
					className={is_seen ? styles.seen_wrapper : styles.wrapper}
					key={item?.id}
					onClick={() => onSubmit(item, link)}
				>
					<div>
						<Avatar personName={service} size="45px" />
					</div>
					<div className={styles.text_box}>
						<div className={styles.service}>{subject}</div>
						<div className={is_seen ? styles.body : styles.unseen_body}>
							{body?.replace(/[_-]/g, ' ')}
						</div>
						<div className={styles.days_ago}>
							<div className={styles.days}>
								{getTimeAgo({ days_difference, created_at, t })}
							</div>
							<div>{getStatus({ item, t })}</div>
						</div>
					</div>
					{/* <div
						role="presentation"
						onClick={() => push(link)}
						className={styles.arrow}
					>
						<IcCPin />
					</div> */}
				</div>
			);
		})
	);
}

export default NotificationsList;
