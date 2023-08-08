import { Input, Select } from '@cogoport/components';
import { IcMCross, IcMFilter, IcMSearchlight } from '@cogoport/icons-react';
import { useTranslation } from 'next-i18next';

import { getOptions } from '../../constants/documentTypeOptions';

import styles from './styles.module.css';

function Filters({ setFilters = () => {}, filters = {} }) {
	const { documentTypeFilter = '' } = filters || {};

	const { t } = useTranslation(['documents']);

	const OPTIONS = getOptions({ t });

	const clearFilters = () => {
		setFilters((prev) => ({
			...prev,
			documentTypeFilter: null,
		}));
	};

	return (
		<div className={styles.filters_wrapper}>
			<div className={styles.table_title}>
				{t('documents:documents_title')}
			</div>

			<div className={styles.search}>
				<div className={styles.select_container}>
					<Select
						options={OPTIONS}
						size="sm"
						onChange={(e) => {
							setFilters((prev) => ({
								...prev,
								documentTypeFilter: e,
							}));
						}}
						value={documentTypeFilter}
						placeholder={t('documents:filter_placeholder_2')}
						prefix={<IcMFilter />}
						suffix={documentTypeFilter ? <IcMCross onClick={clearFilters} /> : ''}
					/>
				</div>
				<div className={styles.input}>
					<Input
						placeholder={t('documents:filter_placeholder_1')}
						size="sm"
						prefix={<IcMSearchlight />}
						onChange={(e) => setFilters((prev) => ({ ...prev, query: e }))}
					/>
				</div>
			</div>
		</div>
	);
}

export default Filters;
