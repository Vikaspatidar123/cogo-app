import { useTranslation } from 'next-i18next';

import { getControls } from '../utils/getControls';

import useSavePocDetails from './useSavePocDetails';

import { useForm } from '@/packages/forms';

/**
 * @typedef  {Object} 	[props]
 * @property {Object} 	[editPoc]
 * @property {function} [setEditPoc]
 * @property {function} [getAddressesList]
 */
const useSavePocDetailsForm = (props) => {
	const { editPoc } = props;

	const { t } = useTranslation(['profile']);
	const { loading, savePocDetails } = useSavePocDetails(props);

	const controls = getControls({ values: editPoc, t });
	const formProps = useForm();

	const onSubmit = (values) => {
		savePocDetails({ values });
	};

	return {
		controls,
		formProps,
		errors: formProps.formState.errors,
		onSubmit,
		loading,
	};
};

export default useSavePocDetailsForm;
