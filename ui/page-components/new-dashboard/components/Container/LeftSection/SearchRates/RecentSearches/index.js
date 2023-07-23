import { Button } from '@cogoport/components';
import { IcMArrowRight } from '@cogoport/icons-react';
import { isEmpty } from '@cogoport/utils';
import { useTranslation } from 'next-i18next';

import Loading from '../Loading';

import Card from './Card';
import styles from './styles.module.css';

import { useRouter } from '@/packages/next';

function RecentSearches({ data, loading }) {
	const { push } = useRouter();
	const { t } = useTranslation(['dashboard']);
	const list = data.slice(0, 2) || [];

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

				<Button themeType="tertiary" type="button" onClick={() => push('/book')}>
					<span className={styles.view_all}>{t('dashboard:bestRates_text_3')}</span>
					<IcMArrowRight width={16} height={16} />
				</Button>
			</div>

			<div className={styles.card}>
				{(list || []).map((item) => (
					<Card
						key={item.created_at}
						item={item}
					/>
				))}
			</div>

		</div>
	);
}
export default RecentSearches;
