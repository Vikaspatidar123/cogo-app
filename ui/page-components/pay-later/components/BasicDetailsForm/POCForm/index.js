import { Accordion, Button } from '@cogoport/components';
import { IcMPlus } from '@cogoport/icons-react';
import { useState } from 'react';

import { getControls } from '../../../configurations/pocControls';
import useUpdatePOCDetails from '../../../hooks/useUpdatePOCDetails';
import AddPOC from '../FormFields/AddPoc';

import styles from './styles.module.css';

import { useForm } from '@/packages/forms';
import getField from '@/packages/forms/Controlled';

function POCForm({ getCreditRequestResponse = {} }) {
	const [addNewPoc, setAddNewPoc] = useState([]);
	const [pocDetails, setPOCDetails] = useState({});

	const POCControls = getControls({ setPOCDetails });

	const {
		control,
		setValue,
	} = useForm({
		defaultValues: {
			owner: getCreditRequestResponse?.poc_details?.[0]?.name,
		},
	});

	const { updatePOCDetails = () => {}, loading = false, updated = {} } = useUpdatePOCDetails({ setValue });

	const callUpdatePOCdetails = ({ poc }) => {
		updatePOCDetails({ poc, pocDetails, id: getCreditRequestResponse?.id });
	};

	return (
		<form type="submit">
			{POCControls.map((item) => {
				const Element = getField(item.type); return (
					<div className={styles.field}>
						<Accordion title={item.placeholder} type="form">
							{!addNewPoc.includes(item.name) ? (
								<>
									<Element {...item} control={control} />
									{!updated?.[item.name] &&					(
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
									)}
								</>
							) : (
								<AddPOC
									setPOCDetails={setPOCDetails}
									setAddNewPoc={setAddNewPoc}
									renderingField={item}
									callUpdatePOCdetails={callUpdatePOCdetails}
								/>
							)}
						</Accordion>
					</div>
				);
			})}
		</form>
	);
}

export default POCForm;
