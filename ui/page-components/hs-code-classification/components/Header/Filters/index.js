import AdvFilters from './AdvFilters';
import BaseFilters from './BaseFilters';
import styles from './styles.module.css';

import { useSelector } from '@/packages/store';

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
	const { organization } = useSelector((state) => state.profile);
	const orgCountryCode = organization?.country?.country_code;

	const FilterComponent = FILTER_COMPONENT[labeledValue];

	return (
		<div className={styles.container}>
			<FilterComponent
				refetch={refetch}
				refetchSearch={refetchSearch}
				loading={loading}
				resetDrillDownHandler={resetDrillDownHandler}
				setSearchTag={setSearchTag}
				orgCountryCode={orgCountryCode}
			/>
		</div>
	);
}

export default Filters;
