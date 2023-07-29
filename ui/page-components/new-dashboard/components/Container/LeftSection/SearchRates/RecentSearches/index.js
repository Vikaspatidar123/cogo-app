import { Button } from '@cogoport/components';
import { IcMArrowNext } from '@cogoport/icons-react';
import { isEmpty } from '@cogoport/utils';
import { useTranslation } from 'next-i18next';

import Loading from '../Loading';

import Card from './Card';
import styles from './styles.module.css';

import { useRouter } from '@/packages/next';

function RecentSearches({ data, loading }) {
	const { push } = useRouter();

	const { t } = useTranslation(['dashboard']);

	if (loading) {
		return <Loading />;
	}
	if (isEmpty(data)) {
		return null;
	}
	return (
		<div className={styles.container}>
			<div className={styles.head}>
				<div className={styles.text}>{t('dashboard:bestRates_text_1')}</div>

			</div>

			<div className={styles.card}>
				{(data || []).map((item) => (
					<Card
						key={item.created_at}
						item={item}
					/>
				))}
			</div>
			<div className={styles.view_all}>
				<Button
					size="md"
					themeType="linkUi"
					type="button"
					onClick={() => push('/book')}
				>
					<span>{t('dashboard:bestRates_text_3')}</span>
					<IcMArrowNext />
				</Button>
			</div>
		</div>
	);
}
export default RecentSearches;
