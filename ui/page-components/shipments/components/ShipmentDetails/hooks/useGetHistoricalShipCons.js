import { Toast } from '@cogoport/components';
import { useState, useEffect, useContext } from 'react';

import { ShipmentDetailContext } from '../common/Context';

import { useRequest } from '@/packages/request';

const createOptions = ({
	setList = () => {},
	shipment_data = {},
	list = [],
}) => {
	const options = [];
	list.forEach((item) => {
		const poc_data = item?.poc_data?.[0] || {};
		const address = [...item.billing_addresses, ...item.other_addresses];
		const item_data = {
			country_name        : item?.country?.name,
			country_id          : item?.country_id,
			buisness_name       : item?.legal_business_name,
			trade_party_id      : item?.id,
			organization_poc_id : poc_data?.id,
			registration_number : item?.registration_number,
		};

		if (
			shipment_data?.shipment_type === 'ftl_freight'
			&& item?.trade_party_type === 'shipper'
		) {
			address.map((add) => options.push({
				...item_data,
				address    : add?.address,
				pincode    : add?.pincode,
				tax_number : add?.tax_number,
			}));
		} else {
			options.push({
				...item_data,
				address : address?.[0]?.address,
				pincode : address?.[0]?.pincode,
			});
		}
	});

	setList({ ...list, options });
};

const useGetHistoricalShipCons = ({ props, selectedData = '', query = '' }) => {
	const {
		role,
		listServiceRefetch = () => {},
		setUtilities = () => {},
		utilities,
		listShipmentTradePartners = () => {},
		source = '',
		task = {},
		taskRefetch = () => {},
		onCancel = () => {},
	} = props || {};

	const [{ shipment_data }] = useContext(ShipmentDetailContext);

	const [list, setList] = useState([]);
	const [page, setPage] = useState(1);

	const [{ loading, data }, tradeContactsListApi] = useRequest({
		url    : '/list_organization_trade_parties',
		method : 'get',
	}, { manual: true });
	const [{ loading:load }, CreateShipmentTradePartner] = useRequest({
		url    : '/create_shipment_trade_partner',
		method : 'post',
	}, { manual: true });

	const fetch = async () => {
		try {
			const res = await tradeContactsListApi({
				params: {
					page_limit : 50,
					filters    : {
						address_query    : query || undefined,
						organization_id  : shipment_data?.importer_exporter_id,
						trade_party_type : ['shipper', 'consignee'],
					},
					billing_addresses_data_required : true,
					other_addresses_data_required   : true,
					poc_data_required               : true,
					page,
				},
			});
			if (!res.hasErrors) {
				createOptions({ setList, shipment_data, list: res?.data?.list || [] });
			}
		} catch (error) {
			Toast.error(error?.response?.data?.message);
		}
	};
	const selected = selectedData.split('_');

	const handleExistingCompany = async () => {
		try {
			const tradePartnerData = shipment_data?.shipment_type === 'ftl_freight' && role === 'shipper'
				? (list?.options || [])?.find(
					(item, index) => item.trade_party_id === selected[0]
								&& index.toString() === selected[1],
				)
				: (list?.options || [])?.find(
					(item) => item.trade_party_id === selectedData,
				);

			const params = {
				shipment_id         : shipment_data?.id,
				trade_party_type    : role,
				country_id          : tradePartnerData.country_id,
				trade_party_id      : tradePartnerData.trade_party_id,
				address             : tradePartnerData.address,
				pincode             : tradePartnerData.pincode,
				organization_poc_id : tradePartnerData.organization_poc_id,
				registration_number : tradePartnerData.registration_number,
				pending_task_id     : source === 'task' ? task?.id : undefined,
			};

			const res = await CreateShipmentTradePartner({ params });

			if (!res.hasError) {
				Toast.success('Company added successfully');
				setUtilities({
					...utilities,
					addCompanyModal: false,
				});
				if (source === 'task') {
					Toast.success('Task Completed!!');
					taskRefetch();
					onCancel();
				} else {
					listServiceRefetch();
					listShipmentTradePartners();
				}
			}
		} catch (error) {
			Toast.error(error?.response?.data?.message);
		}
	};
	useEffect(() => {
		fetch();
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [page, query]);

	return {
		list,
		loading,
		handleExistingCompany,
		setPage,
		page,
		total_count: data?.total_count || 0,
		load,

	};
};

export default useGetHistoricalShipCons;
