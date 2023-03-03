import getControls from './controls';

import { useForm } from '@/packages/forms';

const useEditPocDetails = () => {
	const fields = getControls();

	const { formState, handleSubmit, control } = useForm();

	return {
		fields,
		formState,
		handleSubmit,
		control,
	};
};

export default useEditPocDetails;
