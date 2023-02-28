import { Button } from '@cogoport/components';
import { merge } from '@cogoport/utils';
import React from 'react';

import useCheckDuplicateOrganization from '../../../hooks/useCheckDuplicateOrganization';
import useCreateOrganization from '../../../hooks/useCreateOrganization';

import getControls from './config';
import styles from './styles.module.css';

import {
	useForm, SelectController, useGetAsyncOptions, asyncFieldsLocations, InputController, MultiselectController,
} from '@/packages/forms';

function OrganizationForm({ setBillingAddressDetails, setOrgId, setOrgBranchId }) {
	const cityOptions = useGetAsyncOptions(merge(asyncFieldsLocations(), {
		params: { filters: { type: ['country'] } },
	}));
	const {
		handleSubmit, control, formState: { errors }, watch,
	} = useForm();

	const formValues = watch();

	const fields = getControls({ cityOptions, formValues });

	const { onClickCheckDuplicateOrganization } = useCheckDuplicateOrganization();

	const handleClick = () => {
		onClickCheckDuplicateOrganization(formValues);
	};

	const {
		onClickCreateOrganization,
		createOrganizationLoading,
	} = 		useCreateOrganization({ setBillingAddressDetails, setOrgId, setOrgBranchId });

	return (
		<div className={styles.container}>
			<form
				className={styles.form_container}
				onSubmit={handleSubmit(onClickCreateOrganization)}
			>
				<div className={styles.select_container}>
					<SelectController
						control={control}
						{...fields[0]}
					/>

					{errors.country_id && (
						<span className={styles.errors}>
							{errors.country_id.message}
						</span>
					)}
				</div>
				<div className={styles.select_container}>
					<InputController control={control} {...fields[1]} />
					{errors.registration_number && (
						<span className={styles.errors}>
							{errors.registration_number.message}
						</span>
					)}
				</div>
				<div
					className={styles.select_container}
					onClick={handleClick}
					role="presentation"
				>
					<InputController control={control} {...fields[2]} />
					{errors.business_name && (
						<span className={styles.errors}>
							{errors.business_name.message}
						</span>
					)}
				</div>
				<div className={styles.select_container}>
					<MultiselectController control={control} {...fields[3]} />
					{errors.work_scopes && (
						<span className={styles.errors}>
							{errors.work_scopes.message}
						</span>
					)}
				</div>
				<div className={styles.select_container}>
					<MultiselectController control={control} {...fields[4]} />
					{errors.preferred_languages && (
						<span className={styles.errors}>
							{errors.preferred_languages.message}
						</span>
					)}
				</div>
				<div className={styles.button_container}>
					<Button
						size="lg"
						themeType="accent"
						type="submit"
						className={styles.button}
						loading={createOrganizationLoading}
					>
						NEXT
					</Button>
				</div>
			</form>
		</div>
	);
}

export default OrganizationForm;
