import { cl } from '@cogoport/components';
import { IcMDelete } from '@cogoport/icons-react';

import styles from './styles.module.css';

import Item from '@/ui/page-components/manage-rfq/common/Layout/Item';
import useGetOperatorsConfig from '@/ui/page-components/manage-rfq/hooks/useGetOperatorsConfig';
import getwidth from '@/ui/page-components/manage-rfq/utils/getWidth';

function BodyDetailsChildFormat(props) {
	const {
		controls,
		control,
		field,
		mode,
		index,
		locationName,
		name,
		remove,
		watch,
		handleIndex,
		containersListLength = 1,
		error,
		checkFieldArray,
		showElements = {},
		setShippingLinesDetails = () => {},
		shippingLinesDetails,
	} = props;

	const { params, updateCache, getCacheOptions, keysMapping } = useGetOperatorsConfig({
		formValues: checkFieldArray?.[index],
	});

	return (
		<div className={styles.container}>
			{name === 'dimensions' && (
				<div className={cl`${styles.header} ${index > 0 ? styles.not_first : styles.first}`}>
					<div className={styles.title}>
						Package-
						{index + 1}
					</div>
					{containersListLength > 1 && (
						<IcMDelete className={styles.delete_icon} onClick={() => remove(index, 1)} />
					)}
				</div>
			)}
			<div className={cl`${styles.row} ${styles.form}`}>
				{(controls || []).map((controlItem) => {
					const { span = 6, subLabel: content, name: itmName } = controlItem;
					const milestoneName = `${locationName}.${index}.${itmName}`;
					const value = checkFieldArray?.[index]?.[itmName];
					const show = !(itmName in showElements) || showElements[itmName];
					const loopKey = `${name}.${index}.${itmName}`;

					const handleChange = (val, type) => {
						if (Object.keys(keysMapping).includes(type)) {
							setShippingLinesDetails({
								...shippingLinesDetails,
								[mode]: {
									...shippingLinesDetails?.[mode],
									[handleIndex]: {
										...(shippingLinesDetails?.[mode]?.[handleIndex] || {}),
										[type]: val,
									},
								},
							});
						}
					};

					if (watch) {
						return (
							show && (
								<div
									className={styles.col}
									style={{ width: getwidth(span) }}
									key={loopKey}
								>
									<div
										className={cl`${styles.section} ${content && styles.has_content}`}
										content={content}
									>
										<Item
											{...controlItem}
											{...(mode === 'fcl_freight' && {
												containerType: checkFieldArray?.[index]?.container_type,
											})}
											{...(value
												&& Array.isArray(value)
												&& value.length > 0 && { defaultOptions: true })}
											{...params(itmName)}
											id={milestoneName}
											cacheOptions={getCacheOptions(itmName)}
											itemKey={milestoneName}
											control={control}
											name={milestoneName}
											value={field[itmName]}
											error={error?.[itmName]}
											onFocus={() => {
												updateCache(itmName);
											}}
											handleChange={(val) => handleChange(val, itmName)}
										/>
									</div>
								</div>
							)
						);
					}
					return (
						show && (
							<div
								className={styles.col}
								style={{ width: getwidth(span) }}
								key={loopKey}
							>
								<div className={styles.section} content={content} key={loopKey}>
									<Item
										{...controlItem}
										{...(controlItem.rules || {})}
										defaultValue={field[itmName]}
										error={error?.[itmName]}
									/>
								</div>
							</div>
						)
					);
				})}
			</div>
		</div>
	);
}

export default BodyDetailsChildFormat;
