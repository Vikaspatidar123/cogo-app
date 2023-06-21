import { startCase } from '@cogoport/utils';
import { useState, useEffect, useContext } from 'react';

import { mutateFields } from '../../../utils/mutateFields';
import { ShipmentDetailContext } from '../common/Context';

import { useForm } from '@/packages/forms';
import { useRequest } from '@/packages/request';

const useGetExistingCompanies = ({ role, servProvId, compType, existing_company_controls }) => {
	const [{ shipment_data }] = useContext(ShipmentDetailContext);
	const [companyDetails, setCompanyDetails] = useState({});
	const { handleSubmit, watch, setValue, control } = useForm();
	const formProps = watch();

	const [errors, setErrors] = useState({});
	const onError = (error) => {
		setErrors(error);
	};
	const { newFields } = mutateFields({
		fields: existing_company_controls(role, compType),
		companyDetails,
		setValue,
		setCompanyDetails,
		compType,
	});
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
		if (!res.hasError) {
			if (compType === 'booking_party') {
				const tradeParty = (res?.data?.list || [])[0] || {};
				setValue('business_name', tradeParty.legal_business_name);
				setValue('registration_number', tradeParty.registration_number);
				const address_list = [
					...tradeParty.billing_addresses,
					...tradeParty.other_addresses,
				];
				const address_details = address_list.map((item) => ({
					label : item.address,
					value : item.address,
				}));
				setCompanyDetails({
					...companyDetails,
					trade_party_id: tradeParty.id,
					address_list,
					address_details,
				});
			} else {
				const business_name_list = (res?.data?.list || []).map((item) => ({
					label : item?.legal_business_name,
					value : item?.id,
				}));
				const tradeParty = (res?.data?.list || [])[0] || {};
				setValue('business_name', tradeParty.legal_business_name);
				setValue('registration_number', tradeParty.registration_number);
				setCompanyDetails({
					...companyDetails,
					details       : res?.data?.list,
					business_list : business_name_list,
				});
			}
		}
		// setCompanyName(res?.data);
	};

	const companyArr = companyDetails?.list;

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
		newFields,
		companyDetails,
		loading,
		handleSubmit,
		watch,
		setValue,
		formProps,
		errors,
		onError,
		control,
		existingCompanyOptions,
	};
};

export default useGetExistingCompanies;
