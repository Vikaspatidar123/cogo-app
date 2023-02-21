import { Input } from '@cogoport/components';
import { useState, useEffect } from 'react';

import CONTROLS from '../../configurations/controls';
import useList from '../../hooks/useList';

import List from './List';
import FilterSection from './List/Filter';
import styles from './styles.module.css';

import { useWindowDimensions } from '@/ui/commons/utils/getMobailView';

function OrderHistory() {
	const [sort, setSort] = useState();
	const {
		getList = () => {},
		setGlobalFilters = () => {},
		filters = {},
		apiData = {},
		apiLoading = false,
	} = useList({
		sort,
	});
	const [isMobile, setIsMobile] = useState(false);
	const { width } = useWindowDimensions();
	useEffect(() => {
		if (width < 1154) {
			setIsMobile(true);
		} else {
			setIsMobile(false);
		}
	}, [width]);

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
						isMobile={isMobile}
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
						/>
					</div>
				</div>
			</div>

			<div>
				<List
					config={CONTROLS}
					data={apiData || {}}
					loading={apiLoading}
					setGlobalFilters={setGlobalFilters}
					filters={filters}
					getList={getList}
					sort={sort}
					setSort={setSort}
					isMobile={isMobile}
				/>
			</div>
		</div>
	);
}
export default OrderHistory;
