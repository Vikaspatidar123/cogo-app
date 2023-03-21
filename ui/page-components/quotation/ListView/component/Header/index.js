import { cl, Button, Popover } from '@cogoport/components';
import { IcMFilter, IcMPlus } from '@cogoport/icons-react';
import { useState, memo } from 'react';

import getSummary from '../../configurations/summary';

import Card from './Card';
import FilterContent from './FilterContent';
import styles from './styles.module.css';

import { useRouter } from '@/packages/next';

function Header({
	filters, setFilters, summaryLoading = false,
	summaryData = {},
}) {
	const [showFilters, setshowFilters] = useState(false);
	const { push } = useRouter();
	const summaryControl = getSummary({ summaryResp: summaryData });
	return (
		<>
			<div className={styles.main_quote}>
				<div className={styles.quote}>Quick Quotations</div>
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
					<div
						className={styles.filter_icon}
						role="presentation"
						onClick={() => setshowFilters((prev) => !prev)}
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
						<div>
							<Button
								size="lg"
								themeType="accent"
								onClick={() => setshowFilters((prev) => !prev)}
							>
								<div className={styles.btn_text}>Filter By</div>
								<IcMFilter />
							</Button>
						</div>
					</Popover>
					<Button size="lg" className={styles.create_btn}>
						<IcMPlus />
						<div
							className={styles.btn_text}
							role="presentation"
							onClick={() => push(
								'/saas/planning/quickquotation/createQuotation',
								'/saas/planning/quickquotation/createQuotation',
							)}
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
