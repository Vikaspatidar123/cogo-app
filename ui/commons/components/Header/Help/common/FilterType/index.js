import { Input } from '@cogoport/components';
import { IcMSearchlight } from '@cogoport/icons-react';

import styles from './styles.module.css';

function FilterType({ searchValue = '', setSearchValue = () => {} }) {
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
				placeholder="Search here..."
				value={searchValue}
				onChange={(val) => setSearchValue(val)}
			/>
		</div>
	);
}

export default FilterType;
