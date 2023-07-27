import { Button } from '@cogoport/components';
import { IcMSearchlight, IcMArrowNext } from '@cogoport/icons-react';
import { useTranslation } from 'next-i18next';

import styles from './styles.module.css';

import { useRouter } from '@/packages/next';

function Search() {
	const { push } = useRouter();

	const { t } = useTranslation(['dashboard']);

	return (
		<div className={styles.container}>
			<div className={styles.heading}>{t('dashboard:search_text')}</div>

			<div className={styles.box}>
				<div className={styles.icon_box}>
					<div className={styles.search}>
						<IcMSearchlight />
					</div>

					<div className={styles.text}>
						<div>
							{t('dashboard:yourDeals_text_2')}
						</div>
						<div>{t('dashboard:yourDeals_text_3')}</div>
					</div>
				</div>

				<Button
					onClick={() => push('/book')}
					size="md"
					themeType="linkUi"
					type="button"
				>
					<span>{t('dashboard:yourDeals_text_4')}</span>
					<IcMArrowNext />
				</Button>
			</div>
		</div>
	);
}
export default Search;
