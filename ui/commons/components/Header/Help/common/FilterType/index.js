import { Input } from '@cogoport/components';
import { IcMSearchlight } from '@cogoport/icons-react';
import { useTranslation } from 'next-i18next';

import styles from './styles.module.css';

const translationKey = 'common:components_header_tickets_list';

function FilterType({ searchValue = '', setSearchValue = () => {} }) {
	const { t } = useTranslation(['common']);

	return (
		<div className={styles.search_box}>
			<Input
				size="sm"
				prefix={(
					<IcMSearchlight
						width={16}
						height={16}
						className={styles.search_icon}
					/>
				)}
				placeholder={t(`${translationKey}_search_placeholder`)}
				value={searchValue}
				onChange={(val) => setSearchValue(val)}
			/>
		</div>
	);
}

export default FilterType;
