import { Button, Popover } from '@cogoport/components';
import { IcMFilter } from '@cogoport/icons-react';
import { useState, useEffect } from 'react';

import FilterContent from './FilterContent';

function FilterSection({ isMobile = false, filters = {}, setFilters = () => {} }) {
	const [showFilters, setshowFilters] = useState(false);

	useEffect(() => {
		setFilters((prev) => ({
			...prev,
		}));
	}, []);

	return (
		<Popover
			maxWidth={320}
			theme="light"
			interactive={showFilters}
			visible={showFilters}
			onClickOutside={() => setshowFilters(false)}
			content={
				<FilterContent filters={filters} setFilters={setFilters} isMobile={isMobile} />
				}
		>
			<Button onClick={() => setshowFilters(!showFilters)}>
				{!isMobile && (
					<div>
						Filter By
						<IcMFilter />
					</div>
				)}
				{isMobile && <IcMFilter height={16} width={16} />}
			</Button>
		</Popover>
	);
}

export default FilterSection;
