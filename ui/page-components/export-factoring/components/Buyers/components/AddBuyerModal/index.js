import { Modal, Button } from '@cogoport/components';
import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';

import styles from './styles.module.css';

import getField from '@/packages/forms/Controlled';
import FieldArray from '@/ui/page-components/export-factoring/common/FieldArray';
import { getAddBuyerControls } from '@/ui/page-components/export-factoring/configurations/getAddBuyerControls';
import useSubmitBuyerDetails from '@/ui/page-components/export-factoring/hooks/useSubmitBuyerDetails';

function AddBuyerModal({ refetch, openAddBuyer, setOpenAddBuyer, getCreditRequestResponse }) {
	const [addressDetail, setAddressDetail] = useState();
	const [countryData, setCountryData] = useState();

	const addBuyerControls = getAddBuyerControls({
		setAddressDetail,
		setCountryData,
	});

	const {
		control, watch, handleSubmit, setValue, formState: { errors },
	} = useForm();

	const { onSubmit, loading } = useSubmitBuyerDetails({
		getCreditRequestResponse,
		setOpenAddBuyer,
		addressDetail,
		countryData,
		refetch,
	});

	useEffect(() => {
		setValue('city', addressDetail?.name);
		setValue('country', addressDetail?.country?.country_id);
		setValue('state', addressDetail?.region?.name);
	}, [addressDetail]);

	return (
		<Modal
			size="lg"
			show={openAddBuyer}
			onClose={() => setOpenAddBuyer((pv) => !pv)}
		>
			<Modal.Header
				title="Add Buyer"
			/>
			<Modal.Body>
				<div className={styles.formDiv}>
					{addBuyerControls.map((item) => {
						if (item.type === 'fieldArray') {
							return (
								<FieldArray
									{...item}
									control={control}
									name={item.name}
									error={errors?.[item.name]}
								/>
							);
						}

						const Element = getField(item?.type);
						return (
							<div className={styles.field}>
								<div className={styles.field_name}>{item?.label}</div>
								<Element control={control} {...item} />
								<div className={styles.error_text}>
									{errors?.[item?.name]?.message
												|| errors?.[item?.name]?.type }
								</div>
							</div>

						);
					})}
				</div>
			</Modal.Body>
			<Modal.Footer>
				<Button
					themeType="primary"
					onClick={handleSubmit(onSubmit)}
					loading={loading}
					type="button"

				>
					Submit
				</Button>
			</Modal.Footer>
		</Modal>
	);
}

export default AddBuyerModal;
