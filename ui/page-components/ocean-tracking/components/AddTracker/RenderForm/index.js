import { Radio, Button } from '@cogoport/components';
import { useState } from 'react';

import useAddTracker from '../../../hooks/useAddTracker';
import useCreateTracker from '../../../hooks/useCreateTracker';

import styles from './styles.module.css';

import {
	useDebounceQuery,
	useForm,
	SelectController,
	InputController,
	UploadController,
} from '@/packages/forms';

const containerValidator = /^([a-zA-Z]*){4}([0-9]{7})$/;

function RenderForm({ labeledValue }) {
	const [fileValue, setFileValue] = useState();

	const {
		handleSubmit,
		formState: { errors },
		control,
	} = useForm();
	const { addTracker } = useAddTracker({ fileValue, labeledValue });
	const { query, debounceQuery } = useDebounceQuery();

	const [showinput, setShowInput] = useState(false);
	const { loading, value, setValue, shippingLines, controls } = useCreateTracker({ query });

	const newInput = (item) => {
		if (item?.length >= 4) {
			const data = item.toUpperCase();
			setShowInput(true);
			debounceQuery(data);
			setValue((prv) => ({ ...prv, search_value: item }));
		} else setShowInput(false);
	};
	return (
		<div>
			<form>
				{labeledValue && (
					<UploadController
						name="file_url"
						value={fileValue}
						handleChange={(e) => setFileValue(e)}
						accept="csv"
						style={{ width: '300px' }}
						loading={loading}
						control={control}
					/>
				)}
				<div className={styles.error}>{errors?.search_type?.type}</div>
				<div className={styles.form}>
					{controls.map((item) => (
						<div className={styles.radio}>
							<Radio
								name="search_type"
								value={item.value}
								label={item.label}
								onChange={(e) => {
									setValue((prv) => ({
										...prv,
										search_type: e.target.value,
									}));
								}}
							/>
						</div>
					))}
				</div>

				{!labeledValue && (
					<div>
						<div className={styles.error}>
							{errors?.search_value?.message
                                || errors?.search_value?.type}
						</div>
						<InputController
							name="search_value"
							size="md"
							placeholder="Enter Container / BL Booking"
							handleChange={(e) => newInput(e)}
							value={value?.search_value}
							control={control}
							rules={{
								required : true,
								pattern  : {
									value   : containerValidator,
									message : 'Invalid container Number',
								},
							}}
						/>
					</div>
				)}
				{(showinput || labeledValue) && (
					<div className={styles.select}>
						<div className={styles.error}>
							{errors?.shipping_line_id?.type}
						</div>
						<SelectController
							name="shipping_line_id"
							handleChange={(option) => {
								setValue((prev) => ({
									...prev,
									shipping_line_id: option?.value,
								}));
							}}
							value={value?.shipping_line_id}
							options={(shippingLines || []).map((item) => ({
								label : item.short_name,
								value : item.id,
							}))}
							placeholder="Please select a shipping line"
							control={control}
							rules={{ required: true }}
						/>
					</div>
				)}
				<div className={styles.button}>
					<Button
						loading={loading}
						onClick={handleSubmit(() => addTracker(value))}
					>
						Track Shipment
					</Button>
				</div>
			</form>
		</div>
	);
}
export default RenderForm;
