import { Pagination } from '@cogoport/components';
import { isEmpty } from '@cogoport/utils';
import { useState } from 'react';

import LoadingState from '../LoadingState';

import CreatePayingPartyModal from './CreatePayingPartyModal';
import EditPayingPartyModal from './EditPayingPartyModal';
import styles from './styles.module.css';
import TradePartnerItem from './TradePartnerItem';
import useGetTradePartnerList from './useGetTradePartnerList';

// import EmptyState from '@/commons/components/EmptyState';

/**
 * @typedef  {Object} 	[props]
 * @property {Object} 	[orgResponse]
 * @property {Object} 	[tradePartyType]
 * @property {string} 	[activeTab]
 * @property {boolean} 	[showModal]
 * @property {function} [setShowModal]
 */
function TradePartner(props) {
	const { orgResponse, tradePartyType, activeTab } = props;

	const [showHiddenContentId, setShowHiddenContentId] = useState(null);

	const {
		loading,
		data,
		getTradePartnerList,
		page,
		setPage,
		editTradePartnerItem,
		setEditTradePartnerItem,
	} = useGetTradePartnerList(props);

	if (loading) {
		return <LoadingState />;
	}

	const renderCreatePayingPartyModal = () => (
		<CreatePayingPartyModal
			{...props}
			getTradePartnerList={getTradePartnerList}
		/>
	);

	const renderEditPayingPartyModal = () => (
		<EditPayingPartyModal
			{...props}
			editTradePartnerItem={editTradePartnerItem}
			setEditTradePartnerItem={setEditTradePartnerItem}
			getTradePartnerList={getTradePartnerList}
		/>
	);

	const list = data?.list || [];
	const totalCount = data?.total_count || 0;

	if (isEmpty(list)) {
		return (
			<div className={styles.container}>
				{/* <EmptyState
					height={124}
					width={124}
					bottomText={t(
						'profile:accountDetails.tabOptions.tradeParty.tradePartner.emptyState.bottomText',
					)}
				/> */}
				{renderCreatePayingPartyModal()}
			</div>
		);
	}

	const onClickEditButton = (item) => {
		setEditTradePartnerItem(item);

		return true;
	};

	return (
		<div className={styles.container}>
			<div className={styles.header}>
				<div className={styles.title}>
					Trade Party
				</div>
			</div>

			{list.map((item, index) => (
				<TradePartnerItem
					key={item.id}
					orgResponse={orgResponse}
					tradePartyType={tradePartyType}
					activeTab={activeTab}
					data={item}
					onClickEditButton={() => onClickEditButton(item)}
					marginBottom={index === list.length - 1 ? 0 : '16px'}
					showHiddenContent={showHiddenContentId === item.id}
					onClickShowHiddenContent={() => {
						setShowHiddenContentId((previousState) => (previousState === item.id ? null : item.id));
					}}
				/>
			))}

			{totalCount >= 10 && (
				<div className={styles.pagination_container}>
					<Pagination
						type="table"
						pageSize={10}
						totalItems={totalCount}
						currentPage={page}
						onPageChange={setPage}
					/>
				</div>
			)}

			{renderCreatePayingPartyModal()}

			{/* {renderEditPayingPartyModal()} */}
		</div>
	);
}

export default TradePartner;
