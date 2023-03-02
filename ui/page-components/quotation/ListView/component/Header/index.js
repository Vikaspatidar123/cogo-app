import { Button, Popover } from '@cogoport/components';
import { IcMFilter, IcMPlus } from '@cogoport/icons-react';
import { useState } from 'react';

import getSummary from '../../configurations/summary';

import Card from './Card';
import FilterContent from './FilterContent';
import styles from './styles.module.css';

function Header() {
	const [showFilters, setshowFilters] = useState(false);
	const [filters, setFilters] = useState();
	const summaryResp = {
		buyersCount     : 2,
		defaultCurrency : 'INR',
		quotationsCount : 5,
		totalAmount     : 164435.28,
	};
	const summaryControl = getSummary({ summaryResp });
	return (
		<div className={styles.container}>
			<div className={`${styles.summary} ${styles.flex_container}`}>
				{(summaryControl || []).map((summary) => (
					<Card key={summary?.name} summary={summary} />
				))}
			</div>
			<div className={`${styles.filter_section} ${styles.flex_container}`}>
				<Popover
					placement="bottom"
					interactive={showFilters}
					visible={showFilters}
					onClickOutside={() => setshowFilters(false)}
					content={<FilterContent filters={filters} setFilters={setFilters} />}
					className="popa"
					maxWidth={350}
				>
					<Button size="lg" themeType="accent" onClick={() => setshowFilters(!showFilters)}>
						<div className={styles.btn_text}>Filter By</div>
						<IcMFilter />
					</Button>
				</Popover>
				<Button size="lg" className={styles.createBtn}>
					<IcMPlus />
					<div
						className={styles.btn_text}
						role="presentation"
					>
						Create New

					</div>
				</Button>
			</div>

		</div>
	);
}

export default Header;
