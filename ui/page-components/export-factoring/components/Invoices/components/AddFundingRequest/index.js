import { Button, Modal } from '@cogoport/components';
import { useForm } from 'react-hook-form';

import styles from './styles.module.css';

import getField from '@/packages/forms/Controlled';
import { getAddFundingRequestControls } from '@/ui/page-components/export-factoring/configurations/getAddFundingRequestControls';
import FieldArray from '@/ui/page-components/export-factoring/common/FieldArray';

function AddFundingRequest({ openAddFundingRequest, setOpenFundingRequest }) {
	const fundingRequestControls = getAddFundingRequestControls();

	const { control, watch, handleSubmit, formState: { errors } } = useForm();
	return (
		<Modal
			show={openAddFundingRequest}
			onClose={() => setOpenFundingRequest((pv) => !pv)}
			size="lg"
		>
			<Modal.Header
				title="Create New Request"
			/>
			<Modal.Body>
				<form className={styles.formDiv}>
					{fundingRequestControls.map((item) => {
						if (item.type === 'fieldArray') {
							console.log(item,'item');
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
							item?.type
										&& (
											<div className={styles.field}>
												<div className={styles.field_name}>{item?.label}</div>
												<Element control={control} {...item} />
												<div className={styles.error_text}>
													{errors?.[item?.name]?.message
													|| errors?.[item?.name]?.type }
												</div>
											</div>
										)
						);
					})}
				</form>

			</Modal.Body>
			<Modal.Footer>
				<Button
					type="button"
					themeType="secondary"
					style={{ margin: '0px 10px' }}
					onClick={() => setOpenFundingRequest((pv) => !pv)}
				>
					Cancel
				</Button>
				<Button type="button">
					Submit
				</Button>
			</Modal.Footer>

		</Modal>
	);
}

export default AddFundingRequest;
