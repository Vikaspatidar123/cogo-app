import Item from '../Item';
import Pagination from '../Item/Pagination';

import CardHeader from './CardHeader';
import styles from './styles.module.css';

function List({
	configs,
	apiData,
	loading,
	pageObj,
	refetchHsCode,
	headCode,
	headingToggle,
}) {
	const list = loading ? [1, 2, 3, 4, 5] : apiData;
console.log(pageObj,'pageObj');
	return (
		<div>
			<CardHeader configs={configs} />

			{list?.map((data) => (
				<Item configs={configs} data={data} loading={loading} />
			))}
			{pageObj && apiData?.length > 0 && (
				<Pagination
					pageObj={pageObj}
					refetchHsCode={refetchHsCode}
					headCode={headCode}
					headingToggle={headingToggle}
				/>
			)}
			{!loading && apiData?.length === 0 && <div className={styles.empty}>No Data Available</div>}
		</div>
	);
}

export default List;
