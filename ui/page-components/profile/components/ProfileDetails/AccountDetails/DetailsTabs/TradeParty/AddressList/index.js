import { Pagination } from '@cogoport/components';
import { getByKey, isEmpty } from '@cogoport/utils';
import { useTranslation } from 'next-i18next';

import LoadingState from '../LoadingState';

import AddressItem from './AddressItem';
import getConfig from './configurations/config';
import SaveAddressModal from './SaveAddressModal';
import styles from './styles.module.css';
import useGetAddressesList from './useGetAddressList';

// import EmptyState from '@/commons/components/EmptyState';

/**
 * @typedef  {Object} 	[props]
 * @property {string} 	[addressType]
 * @property {string} 	[organizationId]
 * @property {Object} 	[tradePartyData]
 * @property {Object} 	[tradePartyType]
 * @property {string} 	[activeTab]
 * @property {boolean} 	[showModal]
 * @property {function} [setShowModal]
 * @property {string} 	[countryId]
 */
function AddressList(props) {
	const { addressType, setShowModal } = props;

	const { t } = useTranslation(['profile']);

	const config = getConfig({ t });

	const { apiEndpoint } = config[addressType];

	const {
		loading,
		data,
		getAddressesList,
		pagination,
		setPagination,
		editAddressItem,
		setEditAddressItem,
	} = useGetAddressesList({ apiEndpoint, ...props });

	if (loading) {
		return <LoadingState />;
	}

	const list = getByKey(data, 'list', []);
	const totalCount = data.total_count || 0;

	const onClickEditButton = (item) => {
		setShowModal(() => {
			setEditAddressItem(item);

			return true;
		});
	};

	const renderSaveAddressModal = () => (
		<SaveAddressModal
			key={isEmpty(editAddressItem) ? 'create' : 'edit'}
			{...props}
			getAddressesList={getAddressesList}
			editAddressItem={editAddressItem}
			setEditAddressItem={setEditAddressItem}
		/>
	);

	if (isEmpty(list)) {
		return (
			<>
				{/* <EmptyState
					height={125}
					width={125}
					bottomText={t(
						'profile:accountDetails.tabOptions.tradeParty.addressList.emptyState.bottomText',
					)}
				/> */}

				{renderSaveAddressModal()}
			</>
		);
	}

	return (
		<div className={styles.container}>
			{list.map((item, index) => (
				<AddressItem
					key={item.id}
					addressConfig={config}
					addressType={addressType}
					data={item}
					getAddressesList={getAddressesList}
					onClickEditButton={() => onClickEditButton(item)}
					marginBottom={index === list.length - 1 ? 0 : '16px'}
				/>
			))}

			{totalCount >= pagination.page_limit && (
				<div className={styles.pagination_container}>
					<Pagination
						type="table"
						pageSize={pagination.page_limit}
						totalItems={totalCount}
						currentPage={pagination.page}
						onPageChange={(newPage) => setPagination((previousState) => ({
							...previousState,
							page: newPage,
						}))}
					/>
				</div>
			)}

			{renderSaveAddressModal()}
		</div>
	);
}

export default AddressList;
