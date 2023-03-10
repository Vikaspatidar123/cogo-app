import { Tooltip } from '@cogoport/components';
import { IcMInfo } from '@cogoport/icons-react';

// import { StyledCol, IconDiv } from '../style';

import styles from './styles.module.css';

import { InputController, SelectController } from '@/packages/forms';

function ChargeDetails({
	control = {},
	errors = {},
	fields = [],
	watch,
}) {
	return (
		<>
			{control
				.filter((items, index) => index < 2)
				.map((item, index) => {
					const Element = item.type === 'text' ? InputController : SelectController;
					return (
						<div
							className={styles.col}
							key={item.name}
							// action={errors[item.name]?.message}
						>
							<Element
								{...fields[index]}
								control={control}
							/>
							<div>
								{fields[index].name !== 'policyCurrency' ? (
									<span className={watch(fields[index]?.name) !== ''
										? styles.display : styles.hidden}
									>
										{fields[index].placeholder}
									</span>
								) : (
									<span className={watch(fields[index]?.name) !== ''
										? styles.display : styles.hidden}
									>
										<div className={styles.icon_div}>
											{fields[index].placeholder}
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
							{errors[fields[index].name]?.type === 'required'
							|| errors[fields[index].name]?.type === 'pattern'
							|| errors[fields[index].name]?.type === 'minLength'
							|| errors[fields[index].name]?.type === 'maxValue' ? (
								<div className={styles.error_message}>
									{errors[fields[index].name]?.message}
								</div>
								) : null}
						</div>
					);
				})}
		</>
	);
}

export default ChargeDetails;
