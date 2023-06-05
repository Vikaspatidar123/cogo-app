import {
	ButtonIcon, Tabs, TabPanel, cl, Select, Button, Input, Popover,
} from '@cogoport/components';
import { IcMArrowBack, IcMSearchlight } from '@cogoport/icons-react';
import { useRouter } from 'next/router';
import { useState } from 'react';

import STATS_MAPPING from '../../../constant/statsMapping';
import TAB_MAPPING from '../../../constant/tabMapping';

import DailyReport from './DailyReport';
import styles from './styles.module.css';

function Header({ globalFilter, filterChangeHandler, inputValue, setInputValue }) {
	const { back } = useRouter();
	const [showConfigure, setShowConfigure] = useState(false);
	return (
		<div className={styles.container}>
			<div className={cl`${styles.flex_box} ${styles.first_row}`}>

				<ButtonIcon size="lg" icon={<IcMArrowBack />} themeType="primary" onClick={back} />
				<h2>Shipment List</h2>

				<div>
					<Tabs
						themeType="tertiary"
						activeTab={globalFilter.activeTab}
						onChange={(e) => filterChangeHandler('activeTab', e)}
					>
						{Object.keys(TAB_MAPPING).map((tab) => (
							<TabPanel name={tab} title={TAB_MAPPING?.[tab]} badge={3} />
						))}
					</Tabs>
				</div>
			</div>

			<div className={cl`${styles.flex_box} ${styles.second_row}`}>
				<div className={cl`${styles.flex_box} ${styles.filter_section}`}>
					<Input
						size="sm"
						className={styles.search_field}
						value={inputValue}
						onChange={setInputValue}
						placeholder="Search"
						suffix={<IcMSearchlight />}
					/>
					<Select
						size="sm"
						className={styles.select_field}
						options={STATS_MAPPING}
						value={globalFilter.selectValue}
						onChange={(e) => filterChangeHandler('selectValue', e)}
					/>
					<Popover
						caret={false}
						visible={showConfigure}
						content={<DailyReport />}
						onClickOutside={() => setShowConfigure(false)}
						placement="bottom-end"
					>
						<Button
							themeType="secondary"
							type="button"
							onClick={() => setShowConfigure((prev) => !prev)}
						>
							Daily Status Report
						</Button>
					</Popover>
				</div>

			</div>
		</div>
	);
}

export default Header;
