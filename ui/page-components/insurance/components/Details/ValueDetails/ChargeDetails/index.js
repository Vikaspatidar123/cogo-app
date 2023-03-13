import { Tooltip } from '@cogoport/components';
import { IcMInfo } from '@cogoport/icons-react';

import styles from './styles.module.css';

import getField from '@/packages/forms/Controlled';

function ChargeDetails({
	control = {},
	errors = {},
	fields = [],
	watch,
}) {
	return (
		<>
			{fields
				.filter((items, index) => index < 2)
				.map((item) => {
					const Element = getField(item.type);
					const renderingField = fields.find((ele) => ele.name === item.name);
					return (
						<div
							className={styles.col}
							key={item.name}
						>
							<Element
								{...renderingField}
								control={control}
								key={item.name}
							/>
							<div>
								{renderingField.name !== 'policyCurrency' ? (
									<span className={watch(renderingField?.name) !== ''
										? styles.display : styles.hidden}
									>
										{renderingField.placeholder}
									</span>
								) : (
									<span className={watch(renderingField?.name) !== ''
										? styles.display : styles.hidden}
									>
										<div className={styles.icon_div}>
											{renderingField.placeholder}
											<Tooltip
												theme="light"
												placement="right"
												content="This currency is used to calculate the amount payable"
											>
												<div>
													<IcMInfo />
												</div>
											</Tooltip>
										</div>
									</span>
								)}
							</div>
							{errors[renderingField.name]?.type === 'required'
							|| errors[renderingField.name]?.type === 'pattern'
							|| errors[renderingField.name]?.type === 'minLength'
							|| errors[renderingField.name]?.type === 'maxValue' ? (
								<div className={styles.error_message}>
									{errors[renderingField.name]?.message}
								</div>
								) : null}
						</div>
					);
				})}
		</>
	);
}

export default ChargeDetails;
