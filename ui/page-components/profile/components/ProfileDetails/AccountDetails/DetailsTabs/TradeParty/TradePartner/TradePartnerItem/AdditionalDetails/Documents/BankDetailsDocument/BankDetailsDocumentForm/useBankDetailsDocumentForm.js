import { get } from '@cogoport/utils';
import { useTranslation } from 'next-i18next';

import useSaveDocument from '../../hooks/useSaveDocument';

import useGetBankDetails from './useGetBankDetails';
import { getControls } from './utils/controls';

// import Spinner from '@/commons/components/Spinner';
import { useForm } from '@/packages/forms';

/**
 * @typedef  {Object} 	[props]
 * @property {Object} 	[orgResponse]
 * @property {string} 	[tradePartyId]
 * @property {function} [getOrganizationDocuments]
 * @property {Object} 	[data]
 * @property {function}	[onCloseModal]
 */
const useBankDetailsDocumentForm = (props) => {
	const { data } = props;
	const { loading, saveDocument } = useSaveDocument(props);

	const { t } = useTranslation(['profile']);

	const controls = getControls({ values: data, t });

	const formProps = useForm();

	const { watch, setValues } = formProps;

	const { bankDetailsLoading, onBlurIfscControl } = useGetBankDetails({
		setValues,
	});

	const ifscCode = watch('ifsc_number');

	const newBankAccountControls = [];
	controls.forEach((controlItem) => {
		let newField = controlItem || {};
		const controlName = controlItem.name;

		if (controlName === 'ifsc_number') {
			newField = {
				...newField,
				onBlur: () => onBlurIfscControl({ code: ifscCode }),
				...(bankDetailsLoading && {
					// suffix: (
					// 	<Spinner
					// 		size={20}
					// 		style={{ padding: '4px', margin: '16px' }}
					// 		spinBorderColor="#1444a1"
					// 		outerBorderColor="#e7efff"
					// 	/>
					// ),
				}),
			};
		}

		newBankAccountControls.push(newField);
	});
	const onSubmit = (values) => {
		const { image_url, ...restValues } = values;

		const newValues = {
			name          : 'BankDetails',
			document_type : 'bank_account_details',
			image_url     : get(image_url, 'url'),
			data          : restValues,
		};

		saveDocument({
			values: newValues,
		});
	};

	return {
		loading,
		controls: newBankAccountControls,

		formProps: {
			...formProps,
		},
		errors: formProps.formState.errors,
		onSubmit,
	};
};

export default useBankDetailsDocumentForm;
