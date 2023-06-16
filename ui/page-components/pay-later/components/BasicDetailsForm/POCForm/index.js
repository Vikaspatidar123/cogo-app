import { Toast, Accordion, Button, Pill } from '@cogoport/components';
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

function POCForm({ getCreditRequestResponse = {}, refetch = () => {} }) {
	const [addNewPoc, setAddNewPoc] = useState([]);
	const [pocDetails, setPOCDetails] = useState({});

	const getPocStatus = (key) => getCreditRequestResponse?.credit_application_data?.section_progress_flag
		?.poc_details_status[key];

	const getPocValue = (key) => getCreditRequestResponse?.poc_details?.find((item) => item.work_scope === key)
		?.name;

	const POCControls = getControls({ setPOCDetails, getPocStatus });

	const { control } = useForm({
		defaultValues: {
			owner          : getPocValue('owner'),
			financial_head : getPocValue('financial_head'),
			logistics_head : getPocValue('logistics_head'),
		},
	});

	const {
		updatePOCDetails = () => {},
		loading = false,
	} = useUpdatePOCDetails({ refetch, id: getCreditRequestResponse?.id, pocDetails });

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
									{pocStatus !== 'completed' &&					(
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
												onClick={() => (getCreditRequestResponse.id
													? updatePOCDetails({ poc: item.name })
													: Toast.error('Please Confirm Uploaded Documents'))}
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
									updatePOCDetails={updatePOCDetails}
									pocDetails={pocDetails}
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
