import { Button, Popover } from '@cogoport/components';
import { IcMFilter } from '@cogoport/icons-react';
import { useState } from 'react';

import FilterContent from './FilterContent';
import styles from './styles.module.css';

function FilterSection({ filters = {}, setFilters = () => {} }) {
	const [showFilters, setshowFilters] = useState(false);

	return (
		<Popover
			maxWidth={320}
			theme="light"
			interactive={showFilters}
			visible={showFilters}
			onClickOutside={() => setshowFilters(false)}
			content={
				<FilterContent filters={filters} setFilters={setFilters} />
				}
		>
			<Button themeType="accent" onClick={() => setshowFilters(!showFilters)}>

				<div className={styles.web_view}>
					Filter By
					<IcMFilter />
				</div>

				<div className={styles.mobile_view}>
					<IcMFilter height={16} width={16} />
				</div>
			</Button>
		</Popover>
	);
}

export default FilterSection;
