import { cl, Button, Popover } from '@cogoport/components';
import { IcMFilter, IcMPlus } from '@cogoport/icons-react';
import { useState, memo } from 'react';

import getSummary from '../../configurations/summary';

import Card from './Card';
import FilterContent from './FilterContent';
import styles from './styles.module.css';

function Header({
	filters, setFilters, summaryLoading = false,
	summaryData = {},
}) {
	const [showFilters, setshowFilters] = useState(false);

	const summaryControl = getSummary({ summaryResp: summaryData });
	return (
		<div className={styles.container}>
			<div className={cl`${styles.summary} ${styles.flex_container}`}>
				{(summaryControl || []).map((summary) => (
					<Card key={summary?.name} summary={summary} loading={summaryLoading} />
				))}
			</div>
			<div className={cl`${styles.filter_section} ${styles.flex_container}`}>
				<Popover
					placement="bottom"
					interactive={showFilters}
					visible={showFilters}
					onClickOutside={() => setshowFilters(false)}
					content={(
						<FilterContent
							filters={filters}
							setFilters={setFilters}
						/>
					)}
					maxWidth={350}
				>
					<Button size="lg" themeType="accent" onClick={() => setshowFilters(!showFilters)}>
						<div className={styles.btn_text}>Filter By</div>
						<IcMFilter />
					</Button>
				</Popover>
				<Button size="lg" className={styles.create_btn}>
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

export default memo(Header);
