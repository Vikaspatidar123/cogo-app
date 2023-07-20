import { Toast } from '@cogoport/components';
import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';

import getControls from './controls';

import { useForm } from '@/packages/forms';
import { useRequest } from '@/packages/request';

const useEditPocDetails = ({
	type,
	address_data,
	setShowPocModal,
	refetch,
	showPocModal,
	pocToUpdate,
}) => {
	const { t } = useTranslation(['common', 'settings']);

	const fields = getControls({ t });

	const endPoint = type === 'other_address'
		? '/update_organization_address'
		: '/update_organization_billing_address';
	const editEndPoint = '/update_organization_poc';

	const api = showPocModal === 'edit' ? editEndPoint : endPoint;

	const [{ loading }, trigger] = useRequest(
		{
			url    : api,
			method : 'post',
		},
		{ manual: true },
	);

	const { formState, handleSubmit, control, setValue, register } = useForm();

	const setValues = () => {
		fields?.map((item) => setValue(item?.name, pocToUpdate[item.name]));
		const phone_number = {
			number       : pocToUpdate?.mobile_number,
			country_code : pocToUpdate?.mobile_country_code,
		};
		setValue('phone_number', phone_number);
		const alternate_phone_number = {
			number       : pocToUpdate?.alternate_mobile_number,
			country_code : pocToUpdate?.alternate_mobile_country_code,
		};
		setValue('alternate_phone_number', alternate_phone_number);
	};

	useEffect(() => {
		if (pocToUpdate !== null && showPocModal === 'edit') {
			setValues();
		}
		/* eslint-disable react-hooks/exhaustive-deps */
	}, []);
	const onCreate = async (value) => {
		const { phone_number = {}, alternate_phone_number, ...prop } = value || {};
		const poc_details = [
			{
				...prop,
				mobile_number       : phone_number?.number || undefined,
				mobile_country_code : phone_number?.country_code || undefined,
				alternate_mobile_number:
          value?.alternate_phone_number?.number || undefined,
				alternate_mobile_country_code:
          value?.alternate_phone_number?.country_code || undefined,
			},
		];
		const edit = {
			...prop,
			mobile_number           : phone_number?.number || undefined,
			mobile_country_code     : phone_number?.country_code || undefined,
			alternate_mobile_number : alternate_phone_number?.number || undefined,
			alternate_mobile_country_code:
        alternate_phone_number?.country_code || undefined,
		};
		const payload = showPocModal === 'edit'
			? {
				...edit,
				id: pocToUpdate.id,
			}
			: {
				poc_details,
				id: address_data.id,
			};
		try {
			await trigger({
				data: payload,
			});
			Toast.success(t('settings:add_or_edit_poc_details_toast'));
			setShowPocModal(false);
			refetch();
		} catch (err) {
			const error = Object.values(err?.response?.data).map((x) => x);
			if (error) Toast.error(error);
		}
	};

	return {
		fields,
		formState,
		handleSubmit,
		control,
		onCreate,
		loading,
		register,
	};
};

export default useEditPocDetails;
