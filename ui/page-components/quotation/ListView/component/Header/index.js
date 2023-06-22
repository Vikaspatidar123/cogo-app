import { cl, Button, Popover } from '@cogoport/components';
import { IcMFilter, IcMPlus } from '@cogoport/icons-react';
import { useState, memo } from 'react';

import redirectUrl from '../../../utils/redirectUrl';
import getSummary from '../../configurations/summary';

import Card from './Card';
import FilterContent from './FilterContent';
import styles from './styles.module.css';

function Header({
	summaryLoading = false,
	summaryData = {}, setGlobalFilter, globalFilter = {},
}) {
	const [showFilters, setShowFilters] = useState(false);
	const [mobileFilters, setMobileFilters] = useState(false);

	const { redirectQuotation } = redirectUrl();
	const summaryControl = getSummary({ summaryResp: summaryData });
	return (
		<>
			<div className={styles.main_quote}>
				<div className={styles.quote}>Quick Quotations</div>
				<Popover
					placement="bottom"
					interactive
					visible={mobileFilters}
					onClickOutside={() => setMobileFilters(false)}
					content={(
						<FilterContent
							globalFilter={globalFilter}
							setGlobalFilter={setGlobalFilter}
						/>
					)}
					maxWidth={350}
				>
					<div
						className={styles.filter_icon}
						role="presentation"
						onClick={() => setMobileFilters(!mobileFilters)}
					>
						<IcMFilter />
					</div>
				</Popover>

			</div>
			<div className={styles.container}>
				<div className={cl`${styles.summary} ${styles.flex_container}`}>
					{(summaryControl || []).map((summary) => (
						<Card key={summary?.name} summary={summary} loading={summaryLoading} />
					))}
				</div>
				<div className={cl`${styles.filter_section} ${styles.flex_container}`}>
					<Popover
						placement="bottom"
						interactive
						visible={showFilters}
						onClickOutside={() => setShowFilters(false)}
						content={(
							<FilterContent
								globalFilter={globalFilter}
								setGlobalFilter={setGlobalFilter}
							/>
						)}
						maxWidth={350}
					>

						<Button
							size="lg"
							themeType="accent"
							onClick={() => setShowFilters(!showFilters)}
						>
							<div className={styles.btn_text}>Filter By</div>
							<IcMFilter />
						</Button>

					</Popover>
					<Button size="lg" className={styles.create_btn}>
						<IcMPlus />
						<div
							className={styles.btn_text}
							role="presentation"
							onClick={redirectQuotation}
						>
							Create New
						</div>
					</Button>
				</div>
			</div>
		</>
	);
}

export default memo(Header);
