import { Button } from '@cogoport/components';
import { IcMPlus, IcMTick } from '@cogoport/icons-react';
import { useState } from 'react';

import AddSignatory from '../../../../common/AddSignatory';
import { getControls } from '../../../../configurations/signatoryControls';

import styles from './styles.module.css';

import { useForm } from '@/packages/forms';
import getField from '@/packages/forms/Controlled';

function Signatory({
	getCreditRequestResponse = {},
	method = '',
	updateOrganizationCreditApplication = () => {},
	loading = false,
}) {
	const [addSignatory, setAddSignatory] = useState(false);
	const [selectedSignatory, setSelectedSignatory] = useState({});
	const { control, watch, handleSubmit, formState:{ errors }, register } = useForm();

	const { directors = [] } = getCreditRequestResponse || {};

	const getOptionsForSignatories = () => directors.map((item) => ({
		...item,
		label : item.name,
		value : item.name,
		id    : item.id,
	}));

	const submitSignatoryDetails = (values) => {
		updateOrganizationCreditApplication({ values, selectedSignatory });
	};

	const fields = getControls({ getOptionsForSignatories, watch, setSelectedSignatory });

	const signatoryValue = !!watch('signatory');

	return (
		<>
			{!addSignatory && (
				<>
					<form>
						{fields.map((item) => {
							const { name, show, type, rules, placeholder } = item;
							const Element = getField(type);
							const isMobileNo = type === 'mobile_number';
							if (show) {
								return (
									<div className={styles.field} key={name}>
										<div className={styles.field_name}>{placeholder}</div>
										<Element
											control={control}
											{...item}
											mobileSelectRef={isMobileNo ? register(name, rules).ref : undefined}
										/>
										<div className={styles.error_text}>
											{errors?.[name]?.message
												|| errors?.[name]?.type }
										</div>
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
								onClick={handleSubmit(submitSignatoryDetails)}
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
