import { startCase } from '@cogoport/utils';
import { useState, useEffect, useContext } from 'react';

import { ShipmentDetailContext } from '../common/Context';

import { useRequest } from '@/packages/request';

const useGetExistingCompanies = ({ role, servProvId, compType }) => {
	const [{ shipment_data }] = useContext(ShipmentDetailContext);

	const [companyName, setCompanyName] = useState();
	const [{ loading }, trigger] = useRequest({
		url    : 'list_organization_trade_parties',
		method : 'get',
	}, { manual: true });

	const fetch = async () => {
		let stakeholder = '';

		if (compType === 'booking_party') {
			stakeholder = 'self';
		} else if (
			['booking_party', 'shipper', 'consignee'].includes(role)
			&& compType === 'trade_partner'
		) {
			stakeholder = 'paying_party';
		} else if (
			compType === 'historical'
			&& ['shipper', 'consignee'].includes(role)
		) {
			stakeholder = ['shipper', 'consignee'];
		} else {
			stakeholder = role;
		}

		const res = await trigger({
			params: {
				page_limit : 50,
				filters    : {
					organization_id:
						role === 'collection_party'
							? servProvId
							: shipment_data?.importer_exporter_id,
					trade_party_type: stakeholder,
				},
				billing_addresses_data_required : true,
				other_addresses_data_required   : true,
			},
		});
		setCompanyName(res?.data);
	};

	const companyArr = companyName?.list;

	const existingCompanyOptions = (companyArr || []).map((item) => ({
		label : startCase(item?.business_name),
		value : item?.id,
	}));

	const existingAddresses = {};

	(companyArr || []).forEach((item) => {
		const billingAddresses = (item?.billing_addresses || []).map((address) => ({
			label : `${address?.address}`,
			value : `${address?.address}::${address?.pincode} `,
		}));
		const otherAddrresses = (item?.other_addresses || []).map((address) => ({
			label : `${address?.address} `,
			value : `${address?.address}::${address?.pincode} `,
		}));
		existingAddresses[item?.id] = [...billingAddresses, ...otherAddrresses];
	});

	useEffect(() => {
		fetch();
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [compType]);

	return {
		existingCompanyOptions,
		existingAddresses,
		companyArr,
		loading,
	};
};

export default useGetExistingCompanies;
