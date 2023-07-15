import { Input } from '@cogoport/components';
import { IcMSearchlight } from '@cogoport/icons-react';
import { useTranslation } from 'next-i18next';

import FilterSection from './Filter';
import styles from './styles.module.css';

function AllFilters({ filters, setFilters }) {
	const { t } = useTranslation(['transactionHistory']);

	return (
		<div className={styles.container}>
			<div className={styles.button_div}>
				<FilterSection filters={filters} setFilters={setFilters} />
				<div className={styles.search_wrapper}>
					<Input
						className="search"
						onChange={(e) => setFilters((prev) => ({
							...prev,
							searchTerm : e,
							page       : 1,
						}))}
						placeholder={t('transactionHistory:filter_search_placeholder')}
						suffix={<IcMSearchlight height={15} width={20} />}
					/>
				</div>
			</div>
		</div>
	);
}

export default AllFilters;
