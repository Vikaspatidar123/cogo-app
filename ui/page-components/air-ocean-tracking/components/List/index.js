import { Pagination } from '@cogoport/components';
import { isEmpty } from '@cogoport/utils';
import { useState } from 'react';

import useGetListTracker from '../../hooks/useGetListTracker';

import AirCard from './AirCard';
import Header from './Header';
import ModalList from './ModalList';
import OceanCard from './OceanCard';
import styles from './styles.module.css';

import { Image } from '@/packages/next';
import GLOBAL_CONSTANTS from '@/ui/commons/constants/globals';

const CARD_COMPONENT = {
	air   : AirCard,
	ocean : OceanCard,
};

function List() {
	const [modalInfo, setModalInfo] = useState({
		show: false,
	});
	const {
		data,
		loading, globalFilter, filterChangeHandler, refetchTrackerList,
		...rest
	} = useGetListTracker();

	const { activeTab = '' } = globalFilter;

	const { list = [], filter_data = {}, page, page_limit, total_count } = data || {};

	const newList = loading ? [...Array(5).keys()] : list;
	const Card = CARD_COMPONENT?.[activeTab];

	return (
		<div className={styles.container}>
			<Header
				globalFilter={globalFilter}
				filterChangeHandler={filterChangeHandler}
				filterData={filter_data}
				{...rest}
			/>

			{(newList || []).map((listItem) => (
				<Card
					key={listItem?.id || listItem}
					listItem={listItem}
					loading={loading}
					setModalInfo={setModalInfo}
					activeTab={activeTab}
					refetchTrackerList={refetchTrackerList}
				/>
			))}
			{isEmpty(newList) ? (
				<div className={styles.empty_state}>
					<Image
						src={GLOBAL_CONSTANTS.image_url.air_empty_state}
						width={450}
						height={250}
						alt="empty"
					/>
					<p>No Tracking Data Found</p>
				</div>
			) : (
				<div className={styles.pagination_container}>
					<Pagination
						type="number"
						currentPage={page}
						totalItems={total_count}
						pageSize={page_limit}
						onPageChange={(e) => filterChangeHandler('page', e)}
					/>
				</div>
			)}

			<ModalList
				modalInfo={modalInfo}
				setModalInfo={setModalInfo}
				activeTab={activeTab}
				refetchTrackerList={refetchTrackerList}
			/>
		</div>
	);
}

export default List;
