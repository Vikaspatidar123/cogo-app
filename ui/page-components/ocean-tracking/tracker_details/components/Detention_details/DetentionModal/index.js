// import { Text, Flex } from '@cogoport/front/components';
// import { Formik, Field, ErrorMessage, Form } from 'formik';
// import React, { useState, useRef } from 'react';
// import { toast } from 'react-toastify';
// import * as Yup from 'yup';

import { Modal, Button } from '@cogoport/components';
import { IcMAlert } from '@cogoport/icons-react';

import useAddDetention from '../../../hooks/useAddDetention';

import styles from './styles.module.css';

import { useForm } from '@/packages/forms';
import getField from '@/packages/forms/Controlled';

function DetentionModal({ isOpen, handleModal, trackerDetails, setTrackerDetails }) {
	const { shipment_info = {} } = trackerDetails || {};
	const { onSubmit } = useAddDetention({ shipment_info, trackerDetails, setTrackerDetails, handleModal });

	const controls = [
		{
			serial_no   : '1',
			name        : 'origin_detention',
			label       : 'free detention days',
			type        : 'number',
			placeholder : 'Enter number of days here',
			value       : '',
			max         : 30,
			min         : 0,
			rules       : {
				required : 'Please enter origin_detention',
				maxValue : {
					value   : 30,
					message : 'Entered number cannot greater that 30',
				},
			},
		},
		{
			serial_no   : '2',
			name        : 'destination_detention',
			label       : 'free detention days',
			type        : 'number',
			placeholder : 'Enter number of days here',
			value       : '',
			max         : 30,
			min         : 0,
			rules       : {
				required : 'Please enter destination_detention',
				maxValue : {
					value   : 30,
					message : 'Entered number cannot greater that 30',
				},
			},
		},
		{
			serial_no   : '3',
			name        : 'destination_demurrage',
			label       : 'free demurrage days',
			type        : 'number',
			placeholder : 'Enter number of days here',
			value       : '',
			max         : 30,
			min         : 0,
			rules       : {
				required : 'Please enter destination_demurrage',
				maxValue : {
					value   : 30,
					message : 'Entered number cannot greater that 30',
				},
			},
		},
	];
	const {
		control,
		handleSubmit,
		formState: { errors },
	} = useForm();
	// const [symbolsArr] = useState(['e', 'E', '+', '-', '.']);
	console.log(errors, 'errors');
	return (

		<Modal
			show={isOpen}
			onClose={handleModal}
            // width={isMobile ? 350 : 'none'}
            // heading={STEPS_INFO[step]?.heading}
			placement="center"
		>
			<Modal.Header title="Setup detention / demurrage days" />
			<div className={styles.Alert}>
				<IcMAlert width={10} height={10} />
				<p>
					Get alerted when detention / demurrage free days are about to expire, and when they expire.
				</p>
			</div>
			<form>
				<Modal.Body>

					{controls.map((feild) => {
						const { name } = feild;
						const Element = getField('number');
						return (
							<div>
								{feild?.serial_no === '1' && <div className={styles.destination}>At Origin</div>}
								{feild?.serial_no === '2' && <div className={styles.destination}>At Destination</div>}
								<div className={styles.content}>
									<div className={styles.input}>
										<Element {...feild} control={control} size="md" />
										<div className={styles.label}>{feild?.label}</div>
									</div>
									<div>
										{errors[name]?.type === 'required' || 'maxValue' ? (
											<div className={styles.error}>
												{errors[name]?.message}
											</div>
										) : null}
									</div>
								</div>
							</div>
						);
					})}

				</Modal.Body>
				<Modal.Footer>
					<div className={styles.button}>
						<Button onClick={handleModal} themeType="secondary">Cancel</Button>
						<Button onClick={handleSubmit(onSubmit)}>Save</Button>
					</div>
				</Modal.Footer>
			</form>
		</Modal>
	);
}

export default DetentionModal;
