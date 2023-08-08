import AdvFilters from './AdvFilters';
import BaseFilters from './BaseFilters';
import styles from './styles.module.css';

const FILTER_COMPONENT = {
	normalSearch  : BaseFilters,
	advanceSearch : AdvFilters,
};

function Filters({
	labeledValue,
	refetch,
	refetchSearch,
	loading,
	resetDrillDownHandler,
	setSearchTag,
}) {
	const FilterComponent = FILTER_COMPONENT[labeledValue];

	return (
		<div className={styles.container}>
			<FilterComponent
				refetch={refetch}
				refetchSearch={refetchSearch}
				loading={loading}
				resetDrillDownHandler={resetDrillDownHandler}
				setSearchTag={setSearchTag}
			/>
		</div>
	);
}

export default Filters;
