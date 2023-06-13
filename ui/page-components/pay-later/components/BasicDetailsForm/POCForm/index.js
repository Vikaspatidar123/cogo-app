import { Accordion, Button, Pill } from '@cogoport/components';
import { IcMPlus } from '@cogoport/icons-react';
import { useState } from 'react';

import AddPOC from '../../../common/AddPoc';
import { getControls } from '../../../configurations/pocControls';
import useUpdatePOCDetails from '../../../hooks/useUpdatePOCDetails';

import styles from './styles.module.css';

import { useForm } from '@/packages/forms';
import getField from '@/packages/forms/Controlled';

const getAccordianTitle = ({ placeholder, pocStatus }) => (
	<div className={styles.pill_container}>
		<div>{placeholder}</div>
		<Pill color={pocStatus === 'completed' ? 'green' : 'yellow'} size="sm">
			{pocStatus === 'completed' ? 'Completed' : 'Pending'}
		</Pill>
	</div>
);

function POCForm({ getCreditRequestResponse = {} }) {
	const [addNewPoc, setAddNewPoc] = useState([]);
	const [pocDetails, setPOCDetails] = useState({});

	const getPocStatus = (key) => getCreditRequestResponse?.credit_application_data?.section_progress_flag
		?.poc_details_status[key];

	const POCControls = getControls({ setPOCDetails });

	const {
		control,
		setValue,
		// watch,
	} = useForm({
		defaultValues: {
			owner: getCreditRequestResponse?.poc_details?.[0]?.name,
		},
	});

	const { updatePOCDetails = () => {}, loading = false } = useUpdatePOCDetails({ setValue });

	const callUpdatePOCdetails = ({ poc }) => {
		updatePOCDetails({ poc, pocDetails, id: getCreditRequestResponse?.id });
	};

	return (
		<form type="submit">
			{POCControls.map((item) => {
				const Element = getField(item.type);
				const pocStatus = getPocStatus(item.name);
				return (
					<div className={styles.field} key={item.name}>
						<Accordion
							title={getAccordianTitle({
								placeholder: item.placeholder,
								pocStatus,
							})}
							type="form"
						>
							{!addNewPoc.includes(item.name) ? (
								<>
									<Element {...item} control={control} />
									{pocStatus === 'incomplete' &&					(
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
