import { Button, cl } from '@cogoport/components';
import React, { forwardRef } from 'react';

import advancedServices from '../../../../configurations/search/common/advanced-search-services.json';
import Form from '../../../FormElement';

import Header from './Header';
import styles from './styles.module.css';

function MainControls(
	{
		controls = [],
		mode = '',
		fields = {},
		onShowAdvanced = () => {},
		onClose = () => {},
		onSubmit = () => {},
		mobile = false,
		errors = {},
		showElements = {},
		formValues,
		setValue,
		search_type = '',
		index = 0,
		clearPreviousValues = () => {},
		contractType = '',
		control,
	},
	ref,
) {
	const advancedService = advancedServices.includes(mode);

	return (
		<div
			className={cl`${styles.container} ${styles.search_form_cargo_details_popover} ${mobile ? 'mobile ' : ''}`}
			ref={ref}
			id="search_form_cargo_details_popover"
		>
			<Header
				onClose={onClose}
				onSubmit={onSubmit}
				search_type={search_type}
				index={index}
				clearPreviousValues={clearPreviousValues}
				formValues={formValues}
			/>

			<Form
				controls={controls}
				control={control}
				fields={fields}
				errors={errors}
				showElements={showElements}
				formValues={formValues}
				setValue={setValue}
			/>

			{onShowAdvanced
					&& advancedService && search_type !== 'rfq'
					&& contractType !== 'with_carrier' ? (
						<Button
							className="search_form_cargo_details_add_services_button"
							type="button"
							onClick={onShowAdvanced}
							themeType="linkUi"
							id="search_form_cargo_details_add_services_button"
						>
							Add Trucking and Customs
						</Button>
				) : null}
		</div>
	);
}

export default forwardRef(MainControls);
