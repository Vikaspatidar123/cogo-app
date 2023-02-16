import { useEffect, useState } from 'react';

import getOrganizationControls from '../EditOrganizationDetails/get-organization-controls';

import { useForm } from '@/packages/forms';
import { useRequest } from '@/packages/request';
import { useDispatch } from '@/packages/store';

const useEditOrganizationDetails = ({
	organizationType = '',
	organizationData = {},
	getOrganization = () => { },
	setShowEditOrganizationDetails = () => { },
}) => {
	const dispatch = useDispatch();

	const [errors, setErrors] = useState({});

	const controls = getOrganizationControls();

	// const formProps = useFormCogo(controls);

	const [{ loading }, trigger] = useRequest({
		url: '/update_organization',
		method: 'post',
	}, { manual: true });

	const {
		fields = {}, handleSubmit = () => { }, setValues, control,
	} = useForm();

	// useEffect(() => {
	// 	setValues({ ...organizationData });
	// }, [organizationData]);

	const onError = (err) => {
		setErrors({ ...err });
	};

	const showElements = controls.reduce((previousControls, currentControls) => {
		const { name = '' } = currentControls;

		let showElement = true;
		if (name === 'city_id' && organizationData.kyc_status === 'verified') {
			showElement = false;
		}

		return {
			...previousControls,
			[name]: showElement,
		};
	}, {});
	return {
		showElements,
		control,
		fields: controls,
		errors,
		loading,
		handleSubmit,
		onError,
	};
};

export default useEditOrganizationDetails;
