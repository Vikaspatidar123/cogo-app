import { get } from '@cogoport/utils';
import { useTranslation } from 'next-i18next';

import useSaveDocument from '../../hooks/useSaveDocument';

import getDocumentsName from './configurations/documents-name';
import { getControls } from './utils/controls';

import { useForm } from '@/packages/forms';

/**
 * @typedef  {Object} 	[props]
 * @property {Object} 	[orgResponse]
 * @property {string} 	[tradePartyId]
 * @property {function} [getOrganizationDocuments]
 * @property {Object} 	[data]
 * @property {function}	[onCloseModal]
 */
const useOthersDocumentForm = (props) => {
	const { data } = props;

	const { loading, saveDocument } = useSaveDocument(props);

	const { t } = useTranslation(['profile']);

	const controls = getControls({ values: data, t });

	const documentsName = getDocumentsName({ t });

	const formProps = useForm();
	const { watch } = formProps;

	const watchDocumentType = watch('document_type');

	const onSubmit = (values) => {
		const { document_type, image_url, ...restValues } = values;

		const newValues = {
			name      : documentsName[document_type],
			document_type,
			image_url : get(image_url, 'url'),
			data      : {
				identity_number: get(restValues, `[${document_type}]`),
			},
		};

		saveDocument({
			values: newValues,
		});
	};

	const showElements = {};
	controls.forEach((control) => {
		const { name } = control;

		let showElement = false;

		if (['document_type', watchDocumentType, 'image_url'].includes(name)) {
			showElement = true;
		}

		showElements[name] = showElement;
	});

	return {
		loading,
		controls,
		formProps,
		errors: formProps.formState.errors,
		showElements,
		onSubmit,
	};
};

export default useOthersDocumentForm;
