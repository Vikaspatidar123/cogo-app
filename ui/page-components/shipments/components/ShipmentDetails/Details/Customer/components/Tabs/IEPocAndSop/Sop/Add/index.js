import { Button } from '@cogoport/components';
import { useState, useEffect, useContext } from 'react';

import useAddSopData from '../../../../../hooks/useAddSopData';
import Layout from '../../../../Layout';

import controls from './controls';
import styles from './styles.module.css';

import { useForm } from '@/packages/forms';
import getField from '@/packages/forms/Controlled';
import { ShipmentDetailContext } from '@/ui/page-components/shipments/components/ShipmentDetails/common/Context';

const Select = getField('select');
const Input = getField('text');
const RadioGroup = getField('radio');

function AddSop({
	sops,
	setSopAddForm = () => {},
	setQuickAction = () => {},
	setReload = () => {},
	reload,
	trade_partners_details,
}) {
	const [errors, setErrors] = useState({});
	const [showheadingError, setShowHeadingError] = useState(false);
	const [hasData, sethasData] = useState(false);

	const [{ primary_service }] = useContext(ShipmentDetailContext);
	const fieldControls = controls({
		primary_service,
		trade_partners_details,
	});

	const { control, watch, handleSubmit } = useForm(fieldControls);
	const formValues = watch();

	const { handleAddSop, loading } = useAddSopData({
		formValues,
		api          : 'create',
		sopID        : '',
		originalData : [],
		reload,
		setReload,
		setSopAddForm,
		trade_partners_details,
	});

	useEffect(() => {
		const { instruction_items, heading, conditions } = formValues;
		let hasIntructions = false;
		if (instruction_items.length) {
			if (instruction_items[0].instruction || instruction_items[0].file) {
				hasIntructions = true;
			}
		}

		if (heading || conditions.length || hasIntructions) {
			sethasData(true);
		} else {
			sethasData(false);
		}
	}, [JSON.stringify(formValues)]);

	const onError = (errs, e) => {
		e.preventDefault();
		if (Object.keys(errs).includes('heading')) {
			setShowHeadingError(true);
		} else {
			setShowHeadingError(false);
		}

		setErrors({ ...errs });
	};

	return (
		<div className={styles.container}>
			<div>
				{/* <RadioGroup {...fields.soptype} /> */}
			</div>

			<div className={styles.form_box}>
				{formValues.soptype === 'for_booking_party' ? (
					<>
						<div className={styles.heading}>Applicable if (optional)</div>
						{/* <Select {...fields.conditions} /> */}
					</>
				) : null}

				<div className={styles.sop_heading}>
					{/* <Input {...fields.heading} /> */}
					{showheadingError ? (
						<p className={styles.sop_heading_error}>Heading is Required</p>
					) : null}
				</div>
			</div>
			<div className={styles.detail_upload}>
				<Layout
					themeType="admin"
					controls={[fieldControls[0]]}
					// fields={fields}
					control={control}
					errors={errors}
				/>
			</div>

			<div className={styles.action_row}>
				{sops.length >= 1 ? (
					<Button
						className="secondary sm"
						onClick={() => {
							setQuickAction('');
							setSopAddForm(false);
						}}
					>
						Close
					</Button>
				) : null}

				<Button
					className="primary sm"
					onClick={handleSubmit(handleAddSop, onError)}
					style={{ marginLeft: '10px' }}
					disabled={!hasData || loading}
				>
					Submit
				</Button>
			</div>
		</div>
	);
}
export default AddSop;
