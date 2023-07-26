import { IcMArrowNext } from '@cogoport/icons-react';
import { isEmpty } from '@cogoport/utils';
import { useTranslation } from 'next-i18next';

import Loading from '../Loading';

import Card from './Card';
import styles from './styles.module.css';

import { useRouter } from '@/packages/next';

const START_INDEX = 0;
const END_INDEX = 2;

function RecentSearches({ data, loading }) {
	const { push } = useRouter();

	const { t } = useTranslation(['dashboard']);

	const list = data?.slice(START_INDEX, END_INDEX) || [];

	if (loading) {
		return <Loading />;
	}
	if (isEmpty(list)) {
		return null;
	}
	return (
		<div className={styles.container}>
			<div className={styles.head}>
				<div className={styles.text}>{t('dashboard:bestRates_text_1')}</div>

			</div>

			<div className={styles.card}>
				{(list || []).map((item) => (
					<Card
						key={item.created_at}
						item={item}
					/>
				))}
			</div>
			<div
				role="presentation"
				type="button"
				onClick={() => push('/book')}
				className={styles.view_all}
			>
				<span>{t('dashboard:bestRates_text_3')}</span>
				<IcMArrowNext />
			</div>
		</div>
	);
}
export default RecentSearches;
