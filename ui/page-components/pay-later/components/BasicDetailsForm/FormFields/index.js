import { Accordion, Button } from '@cogoport/components';
import { IcMPlus } from '@cogoport/icons-react';
import { useState } from 'react';

import { getControls } from '../../../configurations/basicDetailsControls';
import useUpdatePOCDetails from '../../../hooks/useUpdatePOCDetails';
import GSTproof from '../GSTproof';

import AddPOC from './AddPoc';
import styles from './styles.module.css';

import getField from '@/packages/forms/Controlled';
import { useSelector } from '@/packages/store';

const FormFields = ({
	details = '', control = {},
	setShow = () => {},
	documentDetails = {},
	gstDetails = {},
	setGSTDetails = () => {},
	clearDocumentDetails = () => {},
	handleSubmit = () => {},
}) => {
	const { profile } = useSelector((state) => state);

	const [addNewPoc, setAddNewPoc] = useState([]);

	const [pocDetails, setPOCDetails] = useState({});

	const { updatePOCDetails, loading } = useUpdatePOCDetails();

	const callUpdatePOCdetails = ({ poc }) => {
		updatePOCDetails({ poc, pocDetails });
	};

	console.log('🚀 ~ file: index.js:28 ~ pocDetails:', pocDetails);

	const basicDetailsControls = getControls({ profile, setGSTDetails, gstDetails, setShow, setPOCDetails });

	return (
		basicDetailsControls.map((item) => {
			const Element = getField(item?.type);
			if (item?.section === details) {
				return (
					<div className={styles.field} key={item.key}>
						<div className={styles.field_name}>{item?.label}</div>
						<div
							onClick={item?.onClick}
							role="presentation"
							className={item.onClick ? styles.pointer : ''}
						>
							{item?.isAccordian
								? (
									<Accordion
										title={(
											<div>
												<div>{item?.placeholder}</div>
											</div>
										)}
										type="form"
									>
										{!addNewPoc.includes(item.name)
											? (
												<>
													<Element
														{...item}
														control={control}
													/>
													<div className={styles.button_wrapper}>
														<Button
															themeType="secondary"
															onClick={() => setAddNewPoc((prev) => ([
																...prev,
																item.name,
															]))}
														>
															<IcMPlus />
															Add New
														</Button>
														<Button
															themeType="accent"
															className={styles.save_button}
															onClick={() => callUpdatePOCdetails({ poc: item.name })}
															loading={loading}
														>
															Save
														</Button>
													</div>
												</>
											) : (
												<AddPOC
													addNewPoc={addNewPoc}
													setAddNewPoc={setAddNewPoc}
													renderingField={item}
												/>
											)}
									</Accordion>
								)
								: (
									<>
										{item.showField ? <Element {...item} control={control} /> : ''}
										{documentDetails?.image_url	&& (
											<GSTproof
												item={item}
												documentDetails={documentDetails}
												clearDocumentDetails={clearDocumentDetails}
												handleSubmit={handleSubmit}
											/>
										)}
									</>
								)}
						</div>
					</div>
				);
			}
			return null;
		})
	);
};

export default FormFields;
