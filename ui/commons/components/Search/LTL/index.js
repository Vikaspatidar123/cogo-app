import { Button } from '@cogoport/components';
import React, { useRef, useState } from 'react';

import useCreateSpotSearch from './hooks/useCreateSpotSearch';
import SearchForm from './SearchForm';
import styles from './styles.module.css';
import getPayLoad from './utils/getPayLoad';

function LTL({
	search_type = '',
	data: searchData,
	onPush,
	extraParams = {},
	isEdit,
}) {
	const { createSpotSearch, loading } = useCreateSpotSearch({
		extraParams,
		search_type,
	});

	const [error, setErrors] = useState({});

	const ltlRef = useRef({});

	const handleClick = async () => {
		const data = await ltlRef.current.searchForm?.handleSubmit();

		if (data?.hasError) {
			setErrors({
				...data?.errors,
			});
			return;
		}

		const payload = getPayLoad(data);

		createSpotSearch(payload, onPush);
	};

	return (
		<div className={styles.container}>
			<SearchForm
				mode="ltl_freight"
				ref={(r) => {
					ltlRef.current.searchForm = r;
				}}
				searchData={searchData}
				error={error}
				extraParams={extraParams}
				isEdit={isEdit}
			/>

			<div className={styles.btn_container}>
				<Button type="button" onClick={handleClick} disabled={loading}>
					Search Rates
				</Button>
			</div>
		</div>
	);
}

export default LTL;
