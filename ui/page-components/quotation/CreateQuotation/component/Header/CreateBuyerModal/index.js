import { Modal, Button } from '@cogoport/components';
import { useState } from 'react';

import iconUrl from '../../../../utils/iconUrl.json';
import RenderTitle from '../../../common/RenderTitle';
import createBuyerControls from '../../../configuration/createBuyerControls';

import styles from './styles.module.css';

import { useForm } from '@/packages/forms';
import getField from '@/packages/forms/Controlled';
import { useSelector } from '@/packages/store';

function CreateBuyerModal({ openModal, setOpenModal, loading, createBuyerAddress }) {
	const { id, organization } = useSelector((state) => state.profile);

	const [countryInfo, setCountryInfo] = useState({});
	const [stateInfo, setStateInfo] = useState({});
	const [cityInfo, setCityInfo] = useState({});

	const { control, handleSubmit, formState: { errors } } = useForm();

	const {	userDetailControl, addressDetailsControl } = createBuyerControls({ countryInfo, stateInfo });

	const controlsArray = [{ title: 'User Details', fields: userDetailControl },
		{ title: 'Address Details', fields: addressDetailsControl }];

	const onSubmit = (data) => {
		console.log(data);
		const userData = {
			...data,
			performedBy             : id,
			organizationId          : organization.id,
			state                   : stateInfo.name,
			city                    : cityInfo.name,
			country                 : countryInfo.name,
			countryId               : countryInfo.id,
			phoneCode               : data?.phoneNumber.country_code,
			phoneNumber             : data?.phoneNumber.number,
			partnerOrganizationType : 'BUYER',
		};
		createBuyerAddress(userData);
	};

	const changeHandler = (data, name) => {
		if (name !== 'country' && name !== 'state' && name !== 'city') return null;
		if (name === 'country') return setCountryInfo(data);
		if (name === 'state') return setStateInfo(data);
		return setCityInfo(data);
	};

	return (
		<Modal size="md" show={openModal} onClose={() => setOpenModal(false)} scroll={false}>
			<Modal.Header title={(
				<div className={styles.header}>
					<img src={iconUrl.createUser} alt="create user" />
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
									<div
										key={field?.name}
										className={`${styles.col} ${errors?.[field.name] && styles.error}`}
									>
										<div className={styles.label_container}>
											<p className={styles.label}>{field?.label}</p>
											{errors?.[field.name]?.type !== 'required'
                                            && <p className={styles.error_text}>{errors?.[field.name]?.message}</p>}
										</div>
										<Element
											{...field}
											control={control}
											handleChange={(data) => changeHandler(data, field?.name)}
										/>
									</div>
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

export default CreateBuyerModal;
