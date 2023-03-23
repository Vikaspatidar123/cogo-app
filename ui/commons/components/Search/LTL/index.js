import React, { useRef, useState } from 'react';
import { Button } from '@cogoport/front/components/admin';
import { BtnContainer, Container } from './styles';
import SearchForm from './SearchForm';
import useCreateSpotSearch from './hooks/useCreateSpotSearch';
import getPayLoad from './utils/getPayLoad';

const LTL = ({
	search_type = '',
	data: searchData,
	onPush,
	extraParams = {},
}) => {
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
		<Container>
			<SearchForm
				mode="ltl_freight"
				ref={(r) => {
					ltlRef.current.searchForm = r;
				}}
				searchData={searchData}
				error={error}
				extraParams={extraParams}
			/>

			<BtnContainer>
				<Button type="button" onClick={handleClick} disabled={loading}>
					Search Rates
				</Button>
			</BtnContainer>
		</Container>
	);
};

export default LTL;
