import { Button } from '@cogoport/components';
import { IcMPlus, IcMTick } from '@cogoport/icons-react';
import { useState } from 'react';

import AddSignatory from '../../../../common/AddSignatory';
import { getControls } from '../../../../configurations/signatoryControls';
import useUpdateOrganizationCreditApplication from '../../../../hooks/useUpdateOrganizationCreditApplication';

import styles from './styles.module.css';

import { useForm } from '@/packages/forms';
import getField from '@/packages/forms/Controlled';

function Signatory({ getCreditRequestResponse = {}, method = '' }) {
	const [addSignatory, setAddSignatory] = useState(false);
	const { control, watch } = useForm();

	const { directors = [] } = getCreditRequestResponse || {};

	const getOptionsForSignatories = () => directors.map((item) => ({
		label : item.name,
		value : item.name,
	}));

	const fields = getControls({ getOptionsForSignatories, watch });

	const signatoryValue = !!watch('signatory');

	const {
		updateOrganizationCreditApplication = () => {},
		loading = false,
	} = useUpdateOrganizationCreditApplication();

	return (
		<>
			{!addSignatory && (
				<>
					<form>
						{fields.map((item) => {
							const Element = getField(item.type);
							if (item.show) {
								return (
									<div className={styles.field}>
										<div className={styles.field_name}>{item.placeholder}</div>
										<Element control={control} {...item} />
									</div>
								);
							}
							return null;
						})}
					</form>
					<div className={styles.button_wrapper}>
						{method === 'physical' &&						(
							<div
								className={styles.button}
								role="presentation"
								onClick={() => setAddSignatory((prev) => !prev)}
							>
								<IcMPlus />
								Add New
							</div>
						)}
						{signatoryValue &&	(
							<Button
								themeType="secondary"
								className={styles.save_button}
								onClick={updateOrganizationCreditApplication}
								loading={loading}
							>
								<IcMTick />
								Save
							</Button>
						)}
					</div>

				</>
			)}

			{addSignatory && (
				<AddSignatory
					setAddSignatory={setAddSignatory}
					updateOrganizationCreditApplication={updateOrganizationCreditApplication}
					loading={loading}
				/>
			)}
		</>
	);
}

export default Signatory;
