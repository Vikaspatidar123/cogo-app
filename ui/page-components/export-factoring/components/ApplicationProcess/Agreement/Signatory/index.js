import { Button } from '@cogoport/components';
import { IcMPlus, IcMTick } from '@cogoport/icons-react';
import { useState } from 'react';

import AddSignatory from './AddSignatory';
import styles from './styles.module.css';

import { useForm } from '@/packages/forms';
import getField from '@/packages/forms/Controlled';
import { getSignControls } from '@/ui/page-components/export-factoring/configurations/signatoryControls';
import useUpdateCreditApplication from '@/ui/page-components/export-factoring/hooks/useUpdateCreditApplication';

function Signatory({
	getCreditRequestResponse = {},
	method = '',
	refetch = () => {},
}) {
	const [addSignatory, setAddSignatory] = useState(false);
	const [selectedSignatory, setSelectedSignatory] = useState({});
	const {
		updateCreditApplication,
		loading: updateLoading,
	} = useUpdateCreditApplication();
	const {
		control,
		watch,
		handleSubmit,
		formState: { errors },
	} = useForm();

	const { directors = [] } = getCreditRequestResponse || {};

	const getOptionsForSignatories = () => directors.map((item) => ({
		...item,
		label : item.name,
		value : item.name,
		id    : item.id,
	}));

	const submitSignatoryDetails = async (values) => {
		const payload = {
			credit_id                           : getCreditRequestResponse.credit_id,
			export_factoring_service_attributes : {
				agreement_execution_details: {
					preferred_mode            : method,
					signing_authority_details : {
						name                       : values.signatory || values.signatory_name,
						designation                : selectedSignatory.designation,
						mobile_country_code        : values.signatory_mobile_number?.country_code,
						mobile_number              : values.signatory_mobile_number?.number,
						email                      : values.signatory_email,
						signatory_board_resolution : values.upload_proof,
						id                         : selectedSignatory.id,
					},
				},
				section_to_update: 'agreement_execution_details',
			},
		};
		const resp = await updateCreditApplication(payload);
		if (resp) {
			refetch();
		}
	};

	const fields = getSignControls({
		getOptionsForSignatories,
		watch,
		setSelectedSignatory,
	});

	const signatoryValue = !!watch('signatory');

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
										<div className={styles.field_name}>
											{item.placeholder}
										</div>
										<Element control={control} {...item} />
										<div className={styles.error_text}>
											{errors?.[item.name]?.message
												|| errors?.[item.name]?.type}
										</div>
									</div>
								);
							}
							return null;
						})}
					</form>
					<div className={styles.button_wrapper}>
						{method === 'physical' && (
							<div
								className={styles.button}
								role="presentation"
								onClick={() => setAddSignatory((prev) => !prev)}
							>
								<IcMPlus />
								Add New
							</div>
						)}
						{signatoryValue && (
							<Button
								themeType="secondary"
								className={styles.save_button}
								onClick={handleSubmit(submitSignatoryDetails)}
								loading={updateLoading}
								disabled={updateLoading}

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
					updateOrganizationCreditApplication={submitSignatoryDetails}
					loading={updateLoading}
				/>
			)}
		</>
	);
}

export default Signatory;
