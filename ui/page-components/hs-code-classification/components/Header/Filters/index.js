import { merge } from '@cogoport/utils';

import AdvFilters from './AdvFilters';
import BaseFilters from './BaseFilters';
import styles from './styles.module.css';

import { asyncFieldsHsCodeCountries, useGetAsyncOptionsBf } from '@/packages/forms';

function Filters({
	labeledValue,
	refetch,
	refetchSearch,
	loading,
	resetDrillDownHandler,
	setSearchTag,
}) {
	const countryOptions = useGetAsyncOptionsBf(merge(asyncFieldsHsCodeCountries(), {}));

	return (
		<div className={styles.container}>
			{labeledValue === 'normalSearch' ? (
				<BaseFilters
					refetch={refetch}
					refetchSearch={refetchSearch}
					loading={loading}
					resetDrillDownHandler={resetDrillDownHandler}
					setSearchTag={setSearchTag}
					countryOptions={countryOptions}
				/>
			) : (
				<AdvFilters
					refetch={refetch}
					refetchSearch={refetchSearch}
					loading={loading}
					resetDrillDownHandler={resetDrillDownHandler}
					setSearchTag={setSearchTag}
					countryOptions={countryOptions}
				/>
			)}
		</div>
	);
}

export default Filters;
