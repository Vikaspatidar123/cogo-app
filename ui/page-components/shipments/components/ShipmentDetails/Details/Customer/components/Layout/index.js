// import Grid from '@cogoport/front/components/Grid';
// import React from 'react';

// import ChildFormat from './ChildFormat';
// import EditLineItems from './EditLineItems';
// import Item from './Item';
// import ServiceChargeEdit from './ServiceChargeEdit';
// import { Container } from './styles';
// import SupplierSelect from './SupplierSelect';

// const { Row, Col } = Grid;
import { Pill } from '@cogoport/components';

import ChildFormat from './ChildFormat';
import EditLineItems from './EditLineItems';
import Item from './Item';
import ServiceChargeEdit from './ServiceChargeEdit';
import styles from './styles.module.css';
import SupplierSelect from './SupplierSelect';

import IN from '@/ui/commons/constants/geo/IN';

function Layout({
	controls,
	fields,
	control,
	errors,
	themeType = 'admin',
	showElements = {},
	id_prefix = null,
	customValues = {},
	disabledProps = false,
}) {
	const openTruck = IN.options.open_truck;
	console.log(openTruck, 'openTruck');
	return (
		<div>
			<div className={styles.row}>
				{controls.map((controlItem) => {
					const { type, span = 6, subType } = controlItem;
					console.log(type, 'type12');
					const show = !(controlItem.name in showElements)
						|| showElements[controlItem.name];

					if (type === 'supplier-select') {
						return (
							<div className={styles.col}>
								<SupplierSelect
									{...controlItem}
									control={control}
									// {...fields[controlItem.name]}
									label={
										customValues[controlItem.name]?.label
										|| fields[controlItem.name]?.label
									}
									error={errors[controlItem.name]}
									value={controlItem.value}
									id_prefix={id_prefix}
									themeType={themeType}
								/>
							</div>
						);
					}
					if (type === 'fieldArray' && subType === 'edit_service' && show) {
						return (
							<div className={styles.col}>
								<ServiceChargeEdit
									{...controlItem}
									control={control}
									// {...fields[controlItem.name]}
									error={errors[controlItem.name]}
									showElements={showElements[controlItem.name]}
									id_prefix={id_prefix}
									customValues={customValues[controlItem.name]}
									themeType={themeType}
									disabledProps={disabledProps}
								/>
							</div>
						);
					}
					if (type === 'fieldArray' && subType === 'edit_items' && show) {
						return (
							<div className={styles.col}>
								<EditLineItems
									{...controlItem}
									control={control}
									// {...fields[controlItem.name]}
									error={errors[controlItem.name]}
									showElements={showElements[controlItem.name]}
									id_prefix={id_prefix}
									customValues={customValues[controlItem.name]}
									themeType={themeType}
								/>
							</div>
						);
					}
					if (type === 'fieldArray' && show) {
						return (
							<div className={styles.col}>
								<ChildFormat
									{...controlItem}
									control={control}
									// {...fields[controlItem.name]}
									error={errors[controlItem.name]}
									showElements={showElements[controlItem.name]}
									id_prefix={id_prefix}
									customValues={customValues[controlItem.name]}
									themeType={themeType}
								/>
							</div>
						);
					}

					return show ? (
						<div className={styles.col}>
							<Item
								{...controlItem}
								control={control}
								error={errors[controlItem.name]}
								value={controlItem.value}
								id_prefix={id_prefix}
								themeType={themeType}
							/>
						</div>
					) : null;
				})}
			</div>
		</div>
	);
}
export default Layout;
