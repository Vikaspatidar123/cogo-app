import { CheckboxGroup, Button, Modal, Tooltip } from '@cogoport/components';
import { IcMInfo } from '@cogoport/icons-react';
import React, { useState } from 'react';

import getControls from './controls';
import styles from './styles.module.css';

import {
	useForm,
	InputNumberController,
	SelectController,
	InputController,
	withControl,
} from '@/packages/forms';
import getField from '@/packages/forms/Controlled';

function GrossCargoDetails({
	setShowFilledValues = () => {},
	setShowPopover = () => {},
	showFilledValues = {},
	setCurrentTab = () => {},
}) {
	const Checkbox = withControl(CheckboxGroup);

	const [weightInfo, setWeightInfo] = useState(true);
	const [dimensionsInfo, setDimensionsInfo] = useState(true);
	const [showInfoModal, setInfoModal] = useState(false);

	const controls = getControls({ showFilledValues });
	const FileUploader = getField('file');

	const {
		handleSubmit,
		formState: { errors },
		control,
	} = useForm();

	const onSubmit = (data, e) => {
		e.preventDefault();
		const { total_weight = 0, total_quantity = 0 } = data || {};
		if (Number(total_weight) / Number(total_quantity) > 150) {
			setInfoModal(true);
			return;
		}

		setShowPopover(false);
		setShowFilledValues({ gross: data });
	};

	const tooltipMessage = ({ label, message }) => (
		<Tooltip content={message} placement="right" animation="shift-away">
			<span style={{ display: 'flex', alignItems: 'center' }}>
				{label}
				<IcMInfo style={{ marginLeft: 4 }} />
			</span>
		</Tooltip>
	);

	return (
		<div className={styles.container}>
			<div className={styles.form_container}>
				<div className={styles.layout_container}>
					<div className={styles.single_control} style={{ marginRight: 12 }}>
						<div className={styles.label}>Total Units</div>
						<InputNumberController {...controls[0]} control={control} />
						{Object.keys(errors).includes('total_quantity') && (
							<div className={styles.error_message}>Units is required</div>
						)}
					</div>
					<div
						className={styles.single_control}
						style={{ minWidth: 80, marginRight: 12 }}
					>
						<div className={styles.label}>
							{tooltipMessage({
              	label: 'Total Volume',
              	message:
                  'For rate calculation, volume will be converted to CBM',
							})}
						</div>
						<InputController {...controls[1]} control={control} />
						{Object.keys(errors).includes('gross_volume') && (
							<div className={styles.error_message}>Volume is required</div>
						)}
					</div>
					<div
						className={styles.single_control}
						style={{ minWidth: 80, marginRight: 12 }}
					>
						<div />
						<div className={styles.label}>Volume Unit</div>
						<SelectController {...controls[2]} control={control} />
						{Object.keys(errors).includes('volume_unit') && (
							<div className={styles.error_message}>Unit is required</div>
						)}
					</div>
					<div
						className={styles.single_control}
						style={{ minWidth: 80, marginRight: 12 }}
					>
						<div className={styles.label}>
							{tooltipMessage({
              	label   : 'Total Weight',
              	message : 'For rate calculation, weight will be converted to KG',
							})}
						</div>
						<InputController {...controls[3]} control={control} />
						{Object.keys(errors).includes('total_weight') && (
							<div className={styles.error_message}>Weight is required</div>
						)}
					</div>
					<div
						className={styles.single_control}
						style={{ minWidth: 80, marginRight: 12 }}
					>
						<div />
						<div className={styles.label}>Weight Unit</div>
						<SelectController {...controls[4]} control={control} />
						{Object.keys(errors).includes('weight_unit') && (
							<div className={styles.error_message}>Unit is required</div>
						)}
					</div>
					<div className={styles.single_control}>
						<div className={styles.label}>Total package Type</div>
						<SelectController {...controls[5]} control={control} />
						{Object.keys(errors).includes('package_type') && (
							<div className={styles.error_message}>Type is required</div>
						)}
					</div>
					<div className={styles.single_control} style={{ marginLeft: 12 }}>
						<div className={styles.label} />
						<Checkbox
							{...controls[6]}
							control={control}
							style={{ marginTop: 6, marginBottom: 10 }}
						/>
					</div>
				</div>

				<div className={styles.layout_container}>
					<div className={styles.single_control}>
						<div className={styles.label}>
							Packing List
							{' '}
							<span>(OPTIONAL)</span>
						</div>
						<FileUploader {...controls[7]} control={control} />
					</div>
				</div>

				<div className={styles.info_container}>
					<CheckboxGroup
						options={[
            	{
            		label : 'Each unit weighs less than 150 kg (330lbs)',
            		value : true,
            	},
						]}
            // value={weightInfo}
						onChange={(item) => {
            	setInfoModal(true);
            	setWeightInfo(item);
						}}
					/>
					<CheckboxGroup
						options={[
            	{
            		label : 'Each unit dimensions is less than 110 x 65 x 65 cm',
            		value : true,
            	},
						]}
            // value={dimensionsInfo}
						onChange={(item) => {
            	setInfoModal(true);
            	setDimensionsInfo(item);
						}}
					/>
				</div>

				<div className={styles.button_container}>
					<Button
						onClick={() => setShowPopover(false)}
						size="md"
						themeType="secondary"
						ghost
					>
						Cancel
					</Button>
					<Button
						style={{ marginLeft: '8px' }}
						size="md"
						onClick={handleSubmit(onSubmit)}
					>
						Confirm
					</Button>
				</div>
			</div>

			<Modal
				show={showInfoModal}
				placement="top"
				onClose={() => {
        	setInfoModal(false);
        	setWeightInfo(true);
        	setDimensionsInfo(true);
				}}
				onOuterClick={() => {
        	setInfoModal(false);
        	setWeightInfo(true);
        	setDimensionsInfo(true);
				}}
				style={{ zIndex: 9999 }}
			>
				<div className={styles.modal}>
					<div className={styles.modal_title}>
						<IcMInfo height={15} width={15} style={{ marginRight: 8 }} />
						In this case, use &#8220;By Packing Type&#8221; option instead
					</div>
					<p>
						If any unit is heavier than 150 kg or bigger than 110x65x65 cm, you
						should use &#8220;By Packing Type&#8221; option to calculate your
						shipment details
					</p>

					<div className={styles.button_container}>
						<Button
							size="md"
							themeType="secondary"
							style={{ marginRight: 8 }}
							onClick={() => {
								setWeightInfo(true);
								setDimensionsInfo(true);
								setInfoModal(false);
							}}
						>
							Take me back
						</Button>
						<Button
							className="primary sm"
							onClick={() => {
								setCurrentTab('per_package');
								setInfoModal(false);
							}}
						>
							OK, take me there
						</Button>
					</div>
				</div>
			</Modal>
		</div>
	);
}

export default GrossCargoDetails;
