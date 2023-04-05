import { Button, Modal } from '@cogoport/components';
import React from 'react';

import useAddService from '../../../hooks/useAddService';

import styles from './styles.module.css';

import getField from '@/packages/forms/Controlled';

function Forms({
	search_type = '',
	addService: service = '',
	onClose = () => {},
	services = [],
	refetch = () => {},
	detail,
	data,
}) {
	const {
		onError,
		addService,
		loading,
		showElements,
		controls,
		errors,
		formProps,
		control,
	} = useAddService({
		detail,
		service : { service },
		search_type,
		onAdd   : () => {
			refetch();
			onClose();
		},
		services,
		data,
	});
	const { handleSubmit } = formProps || {};

	return (
		<div className={styles.container}>
			<Modal.Header title={`Add ${detail[service]?.title}`} />
			<Modal.Body>
				<div className={styles.form_container}>
					<div className={styles.header_container}>
						{controls.map((item) => {
							const Element = getField(item.type);
							const show = showElements[item.name];
							return (
								show && (
									<div className={styles.field} key={item.name}>
										<div className={styles.lable}>{item.label}</div>
										<Element {...item} control={control} />
										{errors && (
											<div className={styles.errors}>
												{errors[item?.name]?.message}
											</div>
										)}
									</div>
								)
							);
						})}

					</div>
				</div>
			</Modal.Body>
			<Modal.Footer>
				<div className={styles.btn_wrap}>
					<div className={styles.cancel_btn_wrap}>
						<Button
							onClick={onClose}
							disabled={loading}
							id="search_results_additional_service_add_cancel_btn"
							size="md"
							themeType="tertiary"
						>
							Cancel
						</Button>
					</div>

					<Button
						onClick={handleSubmit(addService, onError)}
						disabled={loading}
						id="search_results_additional_service_add_save_btn"
					>
						Save and proceed
					</Button>
				</div>
			</Modal.Footer>
		</div>
	);
}

export default Forms;
