// import { Text, Flex } from '@cogoport/front/components';
// import { Formik, Field, ErrorMessage, Form } from 'formik';
// import React, { useState, useRef } from 'react';
// import { toast } from 'react-toastify';
// import * as Yup from 'yup';

import { Modal, Button } from '@cogoport/components';

import useAddDetention from '../../../hooks/useAddDetention';

import styles from './styles.module.css';

import { useForm } from '@/packages/forms';
import getField from '@/packages/forms/Controlled';

function DetentionModal({ isOpen, handleModal, trackerDetails, setTrackerDetails }) {
	const { shipment_info = {} } = trackerDetails || {};
	const { onSubmit } = useAddDetention({ shipment_info, trackerDetails, setTrackerDetails, handleModal });

	const controls = [
		{
			name  : 'origin_detention',
			label : 'free detention days',
			type  : 'number',
			value : '',
			rules : {
				required: 'Please enter origin_detention',
				// pattern  : {
				// 	value   : emailValidator,
				// 	message: 'Invalid email address',
				// },
			},
		},
		{
			name  : 'destination_detention',
			label : 'free detention days',
			type  : 'number',
			value : '',
			rules : {
				required: 'Please enter destination_detention',
				// pattern  : {
				// 	value   : emailValidator,
				// 	message: 'Invalid email address',
				// },
			},
		},
		{
			name  : 'destination_demurrage',
			label : 'free demurrage days',
			type  : 'number',
			value : '',
			rules : {
				required: 'Please enter destination_demurrage',
				// pattern  : {
				// 	value   : emailValidator,
				// 	message: 'Invalid email address',
				// },
			},
		},
	];
	const {
		control,
		handleSubmit,
		formState: { errors },
	} = useForm();
	// const [symbolsArr] = useState(['e', 'E', '+', '-', '.']);

	return (

		<Modal
			show={isOpen}
			onClose={handleModal}
            // width={isMobile ? 350 : 'none'}
            // heading={STEPS_INFO[step]?.heading}
			placement="center"
		>
			<form>
				<Modal.Header title="Setup detention / demurrage days" />
				<Modal.Body>

					{controls.map((feild) => {
						const { name } = feild;
						const Element = getField('number');
						return (
							<div className={styles.content}>
								<Element {...feild} control={control} size="md" />
								<div className={styles.label}>{feild?.label}</div>
								<div>
									{errors[name]?.type === 'required' || 'pattern' ? (
										<div>
											{errors[name]?.message}
										</div>
									) : null}
								</div>
							</div>

						);
					})}

				</Modal.Body>
				<Modal.Footer>
					<div className={styles.button}>
						<Button onClick={handleModal}>Cancel</Button>
						<Button onClick={handleSubmit(onSubmit)}>Save</Button>
					</div>
				</Modal.Footer>
			</form>
		</Modal>
	);
}

export default DetentionModal;
