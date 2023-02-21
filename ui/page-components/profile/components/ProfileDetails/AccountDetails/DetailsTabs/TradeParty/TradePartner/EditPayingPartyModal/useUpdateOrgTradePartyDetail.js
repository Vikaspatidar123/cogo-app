import { Toast } from '@cogoport/components';
import { isEmpty } from '@cogoport/utils';
import { useTranslation } from 'next-i18next';
import { useEffect } from 'react';

import { useForm } from '@/packages/forms';
import { useRequest } from '@/packages/request';
import { useSelector } from '@/packages/store';
import getOrgControls from '@/ui/commons/components/AddInvoicingParty/utils/orgControls';

const useUpdateOrgTradePartDetail = ({
	editTradePartnerItem = '',
	setEditTradePartnerItem = () => {},
	getTradePartnerList = () => {},
}) => {
	const {
		general: { scope = '' },
	} = useSelector((state) => state);

	const { t } = useTranslation(['profile']);

	const {
		organization_trade_party_detail_id = '',
		business_name = '',
		company_type = '',
	} = editTradePartnerItem;

	const updateOrgTradePartyDetailApi = useRequest(
		'post',
		false,
		scope,
	)('/update_organization_trade_party_detail');

	const onSubmit = async (values = {}) => {
		try {
			const payload = {
				id            : organization_trade_party_detail_id,
				business_name : values.business_name,
				company_type  : values.company_type,
			};
			await updateOrgTradePartyDetailApi?.trigger({
				data: payload,
			});

			Toast.success(
				t(
					'profile:accountDetails.tabOptions.tradeParty.tradePartner.editPayingParty.toastMessage',
				),
			);

			if (getTradePartnerList) {
				setEditTradePartnerItem({});
				getTradePartnerList();
			}
		} catch (err) {
			Toast.error(err?.error);
		}
	};

	const controls = getOrgControls({ values: editTradePartnerItem });

	const showElements = {};

	controls.forEach((control) => {
		const { name = '' } = control;

		let showElement = true;
		if (
			['registration_number', 'country_id'].includes(name)
			&& !isEmpty(editTradePartnerItem)
		) {
			showElement = false;
		}

		showElements[name] = showElement;
	});

	const { setValues = () => {}, ...restFormProps } = useForm();

	useEffect(() => {
		setValues({
			business_name,
			company_type,
		});
	}, [editTradePartnerItem]);

	return {
		controls,
		onSubmit,
		showElements,
		restFormProps,
		loading: updateOrgTradePartyDetailApi.loading,
	};
};

export default useUpdateOrgTradePartDetail;
