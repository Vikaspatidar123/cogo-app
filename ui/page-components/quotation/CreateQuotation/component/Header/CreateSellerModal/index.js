/* eslint-disable react-hooks/exhaustive-deps */
import { Modal, Button } from '@cogoport/components';
import { useEffect } from 'react';

import iconUrl from '../../../../utils/iconUrl.json';
import RenderTitle from '../../../common/RenderTitle';
import createSellerControl from '../../../configuration/createSellerControls';
import styles from '../CreateBuyerModal/styles.module.css';

import { useForm } from '@/packages/forms';
import getField from '@/packages/forms/Controlled';

function CreateSellerModal({ openModal, setOpenModal, createSellerAddres, getSellerAddress, loading }) {
	const { control, handleSubmit, watch, reset, formState: { errors } } = useForm();

	const {	billingDetailControl, pocDetailControl, resetSeller } = createSellerControl();

	useEffect(() => {
		if (openModal) reset({ ...resetSeller });
	}, [openModal]);

	const watchSez = watch('is_sez');

	const controlsArray = [{ title: 'Billing Party Details', fields: billingDetailControl },
		{ title: 'POC Details', fields: pocDetailControl }];

	const onSubmit = async (data) => {
		const resp = await createSellerAddres(data);
		if (resp?.data) {
			await getSellerAddress();
			setOpenModal(false);
		}
	};
	return (
		<Modal size="md" show={openModal} onClose={() => setOpenModal(false)} scroll={false}>
			<Modal.Header title={(
				<div className={styles.header}>
					<img src={iconUrl.createSeller} alt="create user" />
					<h2 className={styles.title}>Create User</h2>
				</div>
			)}
			/>
			<Modal.Body>
				{controlsArray.map(({ title, fields }) => (
					<div key={title}>
						<RenderTitle title={title} />
						<div className={styles.row}>
							{(fields || []).map((field) => {
								const Element = getField(field?.type);
								return (
									<>
										{(field?.name !== 'sez_proof') && (
											<div
												key={field?.name}
												className={`${styles.col} ${errors?.[field.name] && styles.error}`}
											>
												<div className={styles.label_container}>
													{field?.name !== 'is_sez'
												&& <p className={styles.label}>{field?.label}</p>}
													{errors?.[field.name]?.type !== 'required'
                                            && <p className={styles.error_text}>{errors?.[field.name]?.message}</p>}
												</div>
												<Element
													{...field}
													control={control}
												/>
											</div>
										)}
										{(field?.name === 'sez_proof' && watchSez) && (
											<div
												key={field?.name}
												className={`${styles.col} ${errors?.[field.name] && styles.error}`}
											>
												<div className={styles.label_container}>
													{field?.name !== 'is_sez'
													&& <p className={styles.label}>{field?.label}</p>}
													{errors?.[field.name]?.type !== 'required'
                                            && <p className={styles.error_text}>{errors?.[field.name]?.message}</p>}
												</div>
												<Element
													{...field}
													control={control}
												/>
											</div>
										)}
									</>

								);
							})}
						</div>
					</div>
				))}
			</Modal.Body>
			<Modal.Footer>
				<Button onClick={handleSubmit(onSubmit)} loading={loading}>Create</Button>
			</Modal.Footer>
		</Modal>
	);
}

export default CreateSellerModal;
