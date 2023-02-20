import { Input } from '@cogoport/components';
import { IcMSearchlight } from '@cogoport/icons-react';

import FilterSection from './Filter';
import styles from './styles.module.css';

function AllFilters({ filters, setFilters, isMobile }) {
	return (
		<div className={`${styles.container} ${isMobile && styles.mobile_view}`}>
			<div className={`${styles.button_div} ${isMobile && styles.mobile}`}>
				<FilterSection isMobile={isMobile} filters={filters} setFilters={setFilters} />
				<div className={styles.search_wrapper}>
					<Input
						className="search"
						onChange={(e) => setFilters((prev) => ({
							...prev,
							searchTerm : e,
							page       : 1,
						}))}
						placeholder="Search by Transaction No."
						suffix={<IcMSearchlight height={30} width={15} />}
					/>
				</div>
			</div>
		</div>
	);
}

export default AllFilters;
