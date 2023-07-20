/* eslint-disable react-hooks/exhaustive-deps */
import { Toast } from '@cogoport/components';
import { useTranslation } from 'next-i18next';
import { useEffect, useState } from 'react';

import getProfileControls from '../EditProfileDetails/get-profile-controls';

import { useForm } from '@/packages/forms';
import { useRequest } from '@/packages/request';
import { useDispatch, useSelector } from '@/packages/store';
import { setProfileStoreState } from '@/packages/store/store/profile';

const useEditProfileDetails = ({
	userDetails = {},
	setShowEditProfileDetails = () => {},
}) => {
	const { t } = useTranslation(['settings']);

	const {
		profile: { organization = {} },
	} = useSelector((state) => state);

	const dispatch = useDispatch();

	const [errors, setErrors] = useState({});
	const controls = getProfileControls({ userDetails, t });

	const formProps = useForm();
	const fields = controls;

	const { handleSubmit = () => {}, setValue = () => {} } = formProps;

	const [{ loading }, trigger] = useRequest(
		{
			url    : '/update_organization_user_details',
			method : 'post',
		},
		{ manual: true },
	);

	const onCreate = async (values = {}) => {
		const alternate_mobile_numbers = [];
		values.alternate_mobile_numbers?.forEach((alternate_mobile_number) => {
			const { mobile_number = {} } = alternate_mobile_number;

			const { country_code = '', number = '' } = mobile_number;

			if (country_code && number) {
				alternate_mobile_numbers.push({
					mobile_country_code : country_code,
					mobile_number       : number,
				});
			}
		});

		try {
			const body = {
				id                       : organization.id,
				user_id                  : userDetails.id,
				name                     : values.name || undefined,
				work_scopes              : values.work_scopes || undefined,
				preferred_languages      : values.preferred_languages || undefined,
				picture                  : values.picture || undefined,
				birth_date               : values.date_of_birth || undefined,
				alternate_mobile_numbers : alternate_mobile_numbers.length
					? alternate_mobile_numbers
					: undefined,
			};

			await trigger({ data: body });
			Toast.success(t('settings:edited_successfully_toast'));
			dispatch(
				setProfileStoreState({
					...body,
				}),
			);

			setShowEditProfileDetails(false);
		} catch (err) {
			Toast.error(err.data);
		}
	};

	const onError = (err) => {
		setErrors({ ...err });
	};

	const showElements = controls.reduce((previousControls, currentControls) => {
		const { name = '' } = currentControls;

		let showElement = true;
		if (name === 'phone_number' && userDetails.mobile_verified) {
			showElement = false;
		}

		if (name === 'email' && userDetails.mobile_verified) {
			showElement = false;
		}

		return {
			...previousControls,
			[name]: showElement,
		};
	}, {});

	useEffect(() => {
		if (userDetails.alternate_mobile_numbers?.length) {
			const alternate_mobile_numbers = [];

			userDetails.alternate_mobile_numbers?.forEach(
				(alternate_mobile_number) => {
					const { mobile_country_code = '', mobile_number = '' } = alternate_mobile_number;

					if (mobile_country_code && mobile_number) {
						alternate_mobile_numbers.push({
							mobile_number: {
								country_code : mobile_country_code,
								number       : mobile_number,
							},
						});
					}
				},
			);
			setValue('alternate_mobile_numbers', alternate_mobile_numbers);
		}
	}, [userDetails]);

	return {
		showElements,
		control: formProps.control,
		fields,
		errors,
		handleSubmit,
		onCreate,
		onError,
		loading,
		setValue,
	};
};

export default useEditProfileDetails;
