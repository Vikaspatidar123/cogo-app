import { Input } from '@cogoport/components';
import { IcMSearchlight } from '@cogoport/icons-react';
import { useState } from 'react';

import CONTROLS from '../../configurations/controls';
import useList from '../../hooks/useList';

import List from './List';
import FilterSection from './List/Filter';
import styles from './styles.module.css';

function OrderHistory() {
	const [sort, setSort] = useState();
	const {
		setGlobalFilters = () => { },
		filters = {},
		apiData = {},
		apiLoading = false,
	} = useList({
		sort,
	});

	return (
		<div className={styles.container}>
			<div className={styles.head}>
				<div className={styles.title_section}>
					<h1 className={styles.title}>Order History</h1>
					<div className={styles.line_wrapper}>
						<div className={styles.line} />
					</div>
				</div>
				<div className={styles.flex_div}>
					<FilterSection
						filters={filters}
						setFilters={setGlobalFilters}
					/>
					<div className={styles.input}>
						<Input
							placeholder="search by order number"
							onChange={(e) => {
								setGlobalFilters((prev) => ({
									...prev,
									searchTerm : e,
									page       : 1,
								}));
							}}
							suffix={<IcMSearchlight height={30} style={{ marginRight: '10px' }} />}
						/>
					</div>
				</div>
			</div>

			<List
				config={CONTROLS}
				data={apiData || {}}
				loading={apiLoading}
				setGlobalFilters={setGlobalFilters}
				filters={filters}
				sort={sort}
				setSort={setSort}
			/>
		</div>
	);
}
export default OrderHistory;
