import React, { forwardRef } from 'react';

import useUpdateEnquiryParams from '../../../../../hooks/useUpdateEnquiryParams';

import styles from './styles.module.css';

import getField from '@/packages/forms/Controlled';

function EnquiryExtraControls(
	{
		service,
		detail,
		location,
		onClose,
		handleServiceAdd,
		refetch = () => {},
		setExtraDetails,
		extraDetails,
		prefillDetails,
		extraData,
		setShowElementExtra,
		serviceKey,
		params,
		index,
	},
	ref,
) {
	const { controls, errors, showElements, control } = useUpdateEnquiryParams({
		service,
		location,
		handleServiceAdd,
		onClose,
		detail,
		refetch,
		ref,
		setExtraDetails,
		extraDetails,
		prefillDetails,
		extraData,
		setShowElementExtra,
		serviceKey,
		params,
		index,
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

export default forwardRef(EnquiryExtraControls);
