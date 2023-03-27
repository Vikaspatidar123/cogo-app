/* eslint-disable no-unused-vars */
import React, { useCallback, useState } from 'react';
import { InfiniteScroll } from '@cogo/deprecated_legacy/ui';
import { useRouter } from '@cogo/next';
// import { Skeleton } from '@cogoport/front/components/admin';
import { useSelector } from '@cogo/store';
import useQuickSearch from '@cogo/app-search/hooks/useQuickSearch';
import Loading from './List/Loading';
import List from './List';
import { useList, getList } from './List/getList';
import { Title, Scroll } from './styles';

const AlternativeRates = ({
	search_id = '',
	data = {},
	importer_exporter_id = '',
	type = '',
}) => {
	const { scope } = useSelector(({ general }) => general);
	const { push } = useRouter();
	const { quickSearch } = useQuickSearch();

	const [creatingAlternate, setAlternate] = useState(false);

	const [disableRate, setDisableRate] = useState(false);
	const params = { globalParams: { spot_search_id: search_id } };

	const { loading, list, hookSetters } = getList(
		useList('list_alternate_spot_searches', scope),
		params,
		true,
		search_id,
	);

	const loadMore = useCallback(() => {
		setTimeout(() => {
			if (!loading) {
				hookSetters.setPage((p) => p + 1);
			}
		}, 1000);
	}, [loading]);

	const onClickResultRow = (portIds) => {
		if (!disableRate) {
			quickSearch(
				{ ...data, ...portIds },
				{
					setIsLoading: setAlternate,
					extraParams: {
						importer_exporter_id,
						importer_exporter_branch_id: data?.importer_exporter_branch_id,
						user_id: data?.user_id,
					},
					onCreate: (postData) => {
						push(postData.href, postData.as);
					},
				},
			);
		}
		setDisableRate(true);
	};

	const renderList = () =>
		list?.data.map((rate) => (
			<List
				rate={rate}
				onClickResultRow={onClickResultRow}
				disableRate={disableRate}
				creatingAlternate={creatingAlternate}
			/>
		));

	const infiniteScrollContainer = () => (
		<>
			<Title>Alternative rates</Title>

			<InfiniteScroll
				pageStart={1}
				initialLoad={false}
				loadMore={loadMore}
				threshold={500}
				hasMore={list?.hasMore}
				loader={<Loading key="rm-loading" count={1} />}
			>
				{renderList()}
			</InfiniteScroll>
		</>
	);

	return null;

	// if (loading) {
	// 	return (
	// 		<div>
	// 			<Title>Getting alternative rate suggestions for you ...</Title>

	// 			<Skeleton height="90px" margin="10px 0px" width="100%" />
	// 			<Skeleton height="90px" margin="10px 0px" width="100%" />
	// 			<Skeleton height="90px" margin="10px 0px" width="100%" />
	// 		</div>
	// 	);
	// }

	// if (list?.data?.length <= 0) {
	// 	return null;
	// }

	// return type === 'edit-in-mobile' ? (
	// 	infiniteScrollContainer()
	// ) : (
	// 	<Scroll style={{ paddingBottom: 40 }}>{infiniteScrollContainer()}</Scroll>
	// );
};

export default AlternativeRates;
