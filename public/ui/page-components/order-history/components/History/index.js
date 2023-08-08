import { Input } from '@cogoport/components';
import { IcMSearchlight } from '@cogoport/icons-react';
import { useTranslation } from 'next-i18next';
import { useState } from 'react';

import getConfig from '../../configurations/controls';
import useList from '../../hooks/useList';

import List from './List';
import FilterSection from './List/Filter';
import styles from './styles.module.css';

function OrderHistory() {
	const { t } = useTranslation(['orderHistory']);
	const [sort, setSort] = useState({});

	const config = getConfig({ t });

	const {
		setGlobalFilters = () => { },
		filters = {},
		apiData = {},
		apiLoading = false,
	} = useList({
		sort,
	});
	return (
		<div className={styles.container}>
			<div className={styles.head}>
				<div className={styles.title_section}>
					<h1 className={styles.title}>{t('orderHistory:main_title')}</h1>
					<div className={styles.line_wrapper}>
						<div className={styles.line} />
					</div>
				</div>

				<div className={styles.flex_div}>

					<div className={styles.input}>
						<Input
							placeholder={t('orderHistory:search_placeholder')}
							onChange={(e) => {
								setGlobalFilters((prev) => ({
									...prev,
									searchTerm : e,
									page       : 1,
								}));
							}}
							suffix={<IcMSearchlight height={30} style={{ marginRight: '10px' }} />}
						/>
					</div>
					<FilterSection
						filters={filters}
						setFilters={setGlobalFilters}
					/>
				</div>
			</div>

			<List
				config={config}
				data={apiData || {}}
				loading={apiLoading}
				setGlobalFilters={setGlobalFilters}
				filters={filters}
				sort={sort}
				setSort={setSort}
			/>
		</div>
	);
}
export default OrderHistory;
