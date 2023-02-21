import { Toast } from '@cogoport/components';
import { useTranslation } from 'next-i18next';

import getChangedObjectValues from '../../../../utils/getChangedObjectValues';
import getValue from '../../../../utils/getValue';

import { useRequest } from '@/packages/request';
import { useSelector } from '@/packages/store';

/**
 * @typedef  {Object} 	[props]
 * @property {Object} 	[editPoc]
 * @property {function} [setEditPoc]
 * @property {function} [getAddressesList]
 */
const useSavePocDetails = (props) => {
	const { editPoc, setEditPoc, getAddressesList } = props;

	const {
		general: { scope },
	} = useSelector((state) => state);

	const { t } = useTranslation(['profile']);

	const api = useRequest('post', false, scope)('/update_organization_poc');

	const getPayload = ({ values }) => {
		const newValues = {
			name                : getValue(values, 'name'),
			email               : getValue(values, 'email'),
			mobile_country_code : getValue(
				values,
				'mobile_number.mobile_country_code',
			),
			mobile_number: getValue(values, 'mobile_number.mobile_number'),
		};

		const payload = getChangedObjectValues({
			values         : newValues,
			previousValues : editPoc,
		});

		return {
			id: getValue(editPoc, 'id'),
			...payload,
		};
	};

	const onSuccess = () => {
		Toast.success(
			t(
				'profile:accountDetails.tabOptions.tradeParty.addressList.pocList.savePocDetails.form.toastMessages.1',
			),
		);

		getAddressesList();
		setEditPoc({});
	};

	const onFailure = ({ error }) => {
		Toast.error(error.data);
	};

	const savePocDetails = async ({ values }) => {
		try {
			const payload = getPayload({ values });

			await api.trigger({ data: payload });

			onSuccess();
		} catch (error) {
			onFailure({ error });
		}
	};

	return {
		loading: api.loading,
		savePocDetails,
	};
};

export default useSavePocDetails;
