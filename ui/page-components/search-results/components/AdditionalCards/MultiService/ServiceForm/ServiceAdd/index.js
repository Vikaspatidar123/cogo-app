import React from 'react';

import useAddService from '../../../../../hooks/useAddService';
import styles from '../styles.module.css';

import getField from '@/packages/forms/Controlled';

function ServiceForm(
	{
		service,
		detail = {},
		onClose = () => {},
		refetch = () => {},
		setNoOfServiceForms = () => {},
		addedServiceEnquiry,
		formData,
		prefillDetails,
		setShowElementAdd,
		setLocationObj,
		setParams,
		params,
	},
	ref,
) {
	const { search_type } = detail || {};
	const { controls, showElements, errors, control } = useAddService({
		detail,
		service,
		search_type,
		services : Object.values(detail?.service_details || {}),
		onAdd    : () => {
			refetch();
			onClose();
		},
		setNoOfServiceForms,
		addedServiceEnquiry,
		formData,
		prefillDetails,
		setShowElementAdd,
		setLocationObj,
		setParams,
		params,
		ref,
	});

	return (
		<div className={styles.container}>
			<div className={styles.header_container}>
				{controls.map((item) => {
					const Element = getField(item.type);
					const show = showElements[item.name];
					return (
						show && (
							<div className={styles.field} key={item.name}>
								<div className={styles.lable}>{item.label}</div>
								<Element {...item} control={control} />
								{errors && (
									<div className={styles.errors}>
										{errors[item?.name]?.message}
									</div>
								)}
							</div>
						)
					);
				})}

			</div>
		</div>
	);
}

export default ServiceForm;
