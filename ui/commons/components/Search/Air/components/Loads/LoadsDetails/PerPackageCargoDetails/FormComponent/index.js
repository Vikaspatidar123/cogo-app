import { IcMDelete } from '@cogoport/icons-react';
import React from 'react';

import styles from './styles.module.css';
import LAYOUT from './utils/layout-mapping';

import getField from '@/packages/forms/Controlled';
import getWidth from '@/ui/page-components/discover_rates/common/SearchForm/utils/getWidth';

const SELECT_STYLE = { marginTop: '15px', alignItems: 'flex-start' };

function FormComponent({
	error,
	controls,
	index,
	control,
	name,
	onClickDelete,
	packageQuantity = [],
	packageWeight = [],
	packageVolume = [],
}) {
	const subControls = (controls.find((ctrl) => ctrl.name === 'packages') || {}).controls || [];

	return (
		<div className={styles.container}>
			<div className={styles.flex}>
				<div className={styles.row} style={SELECT_STYLE}>
					{Object.values(LAYOUT).map((layout) => {
						const { controlNames: controlNamesHash, span } = layout;

						const controlNames = Object.keys(controlNamesHash);

						if (controlNames.includes('deleteButton') && index !== 0) {
							return (
								<div className={styles.col} style={{ width: getWidth(span) }}>
									<div
										className={styles.flex}
										style={{
											alignItems     : 'center',
											justifyContent : 'center',
											height         : '100%',
											marginTop      : '8px',
										}}
									>
										<IcMDelete
											style={{ cursor: 'pointer' }}
											onClick={onClickDelete}
											fill="#393f70"
											width={18}
											height={18}
										/>
									</div>
								</div>
							);
						}

						if (controlNames.includes('displayDetails')) {
							return (
								<div className={styles.col} style={{ width: getWidth(span) }}>
									<div
										className={styles.flex}
										style={{
											fontSize   : '10px',
											color      : '#393f70',
											alignItems : 'flex-start',
											height     : '50%',
											marginTop  : index === 0 ? 10 : -4,
										}}
									>
										<div className={styles.row}>
											{`${packageQuantity[index] || 0} pkg`}
										</div>
										<div className={styles.row}>
											{`${packageWeight[index] || 0} kgs`}
										</div>
										<div className={styles.row}>
											{`${packageVolume[index] || 0} cbm`}
										</div>
									</div>
								</div>
							);
						}

						const layoutControls = subControls.filter((subCtrl) => controlNames.includes(subCtrl.name));

						return (
							<div className={styles.col} style={{ width: getWidth(span) }}>
								<div className={styles.row}>
									{layoutControls.map((layoutCtrl) => {
										const { type, name: subCtrlName, label } = layoutCtrl;

										const FieldController = getField(type);

										if (!FieldController) {
											return null;
										}

										return (
											<div style={{
												width: getWidth(controlNamesHash[subCtrlName].span),
												...controlNamesHash[subCtrlName].style,
											}}
											>
												<div
													className={styles.flex}
													direction="column"
													style={{
														marginTop: label === '' && index === 0 ? 18 : 0,
													}}
												>
													{label && index === 0 && (
														<div
															className={styles.label}
														>
															{label}

														</div>
													)}
													<FieldController
														{...layoutCtrl}
														key={`${name}.${index}.${subCtrlName}`}
														name={`${name}.${index}.${subCtrlName}`}
														itemKey={`${name}.${index}.${subCtrlName}`}
														control={control}
														size="sm"
													/>
													{error && Object.keys(error).includes(subCtrlName) ? (
														<div className={styles.error_message}>
															{error?.[subCtrlName]?.type === 'required'
																? 'Required'
																: 'Invalid'}
														</div>
													) : null}
												</div>
											</div>
										);
									})}
								</div>
							</div>
						);
					})}
				</div>
			</div>
		</div>
	);
}

export default FormComponent;
