import { Button, Toast, Accordion, Pill } from '@cogoport/components';
import { IcMPlus } from '@cogoport/icons-react';
import React, { useState } from 'react';

import { getControls } from '../../../configurations/pocControls';
import useUpdatePOCFormDetails from '../../../hooks/useUpdatePOCFormDetails';

import AddPOC from './AddPoc';
import PocList from './PocList';
import styles from './styles.module.css';

import { useForm } from '@/packages/forms';
import getField from '@/packages/forms/Controlled';
import GLOBAL_CONSTANTS from '@/ui/commons/constants/globals';

const MIN_POC_VERIFIED = 1;

const getAccordianTitle = ({ placeholder, pocLength }) => (
	<div className={styles.pill_container}>
		<div>
			{`${placeholder} ${pocLength}`}

		</div>
		<Pill color={pocLength >= MIN_POC_VERIFIED ? 'green' : 'yellow'} size="sm">
			{pocLength >= MIN_POC_VERIFIED ? 'Completed' : 'Pending'}
		</Pill>
	</div>
);

function PointOfContacts({ getCreditRequestResponse = {}, refetch = () => { } }) {
	const [addNewPoc, setAddNewPoc] = useState(false);
	const [pocDetails, setPOCDetails] = useState({});

	const getPocStatus = (key) => getCreditRequestResponse?.credit_application_data?.section_progress_flag
		?.poc_details_status[key];

	const getPocValue = (key) => getCreditRequestResponse?.poc_details?.find((item) => item.work_scope === key)
		?.name;

	const pocControls = getControls({ setPOCDetails, getPocStatus });

	const { control } = useForm({
		defaultValues: {
			poc: getPocValue('poc'),
		},
	});
	const {
		updatePOCDetails = () => { },
		loading :updateLoading = false,
	} = useUpdatePOCFormDetails({ refetch, id: getCreditRequestResponse?.id });

	return (
		<form type="submit">
			<Accordion
				title={getAccordianTitle({
					placeholder : 'Point of Contact',
					pocLength   : getCreditRequestResponse?.poc_details?.length,
				})}
				type="form"
			>

				{(pocControls || []).map((item, index) => {
					const Element = getField(item.type);
					return (
						<div className={styles.field} key={item.name}>
							{!addNewPoc ? (
								<>
									<Element {...item} control={control} />
									{item.name !== 'user' && (
										<div className={styles.button_wrapper}>
											<Button
												type="button"
												themeType="secondary"
												onClick={() => setAddNewPoc(true)}
											>
												<IcMPlus />
												Add New
											</Button>
											<Button
												type="button"
												themeType="accent"
												className={styles.save_button}
												onClick={() => (
													getCreditRequestResponse.id
														? updatePOCDetails({ pocDetails })
														: Toast.error('Please Confirm Uploaded Documents'))}
												loading={updateLoading}
											>
												Save
											</Button>
										</div>
									)}
								</>
							) : (
								index === GLOBAL_CONSTANTS.zeroth_index && (
									<AddPOC
										setPOCDetails={setPOCDetails}
										setAddNewPoc={setAddNewPoc}
										renderingField={item}
										updatePOCDetails={updatePOCDetails}
										pocDetails={pocDetails}
										updateLoading={updateLoading}
									/>
								)
							)}

						</div>

					);
				})}
				{(getCreditRequestResponse?.poc_details
							&& getCreditRequestResponse?.poc_details?.length) >= MIN_POC_VERIFIED && (
								<PocList
									list={getCreditRequestResponse?.poc_details}
								/>
				)}
			</Accordion>
		</form>
	);
}

export default PointOfContacts;
