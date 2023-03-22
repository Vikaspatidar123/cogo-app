import { Button } from '@cogoport/components';

import PortPairChildLayout from './PortPairChildLayout';
import styles from './styles.module.css';

import { useFieldArray } from '@/packages/forms';

function PortPairLayout(props) {
	const {
		name,
		control,
		controls,
		error,
		serviceType,
		watch,
		showElements = {},
		mode,
		editIndex,
		draftFormData,
		setDraftFormData = () => {},
		formType = 'createform',
		handleSubmit = () => {},
		editFormData,
		editForm,
		showForm,
		loading,
		setShowForm = () => {},
		setEditForm = () => {},
		handleUpdatePayload = () => {},
		draftLength,
		createRfqDraft,
		services,
		totalDraftsCount,
		originDetails,
		destinationDetails,
	} = props;

	const handleIndex = formType === 'editform' ? editIndex : draftLength;

	const { fields, remove } = useFieldArray({
		control,
		name,
	});
	const handlePayload = (formData) => {
		createRfqDraft(
			formData,
			serviceType,
			services?.[serviceType]?.[handleIndex] || {},
			originDetails?.[serviceType]?.[handleIndex] || {},
			destinationDetails?.[serviceType]?.[handleIndex] || {},
		);
	};
	const watchSearchRates = watch('search_rates');
	const childEmptyValues = {};

	controls.forEach((controlItem) => {
		childEmptyValues[controlItem.name] = controlItem.value || '';
	});

	return (
		<div className={styles.container}>
			{fields.map((field, index) => (
				<div key={field.id}>
					<div className={styles.card} key={field.id}>
						<PortPairChildLayout
							{...props}
							id={field.id}
							watch={watch}
							field={field}
							serviceType={serviceType}
							index={index}
							control={control}
							controls={controls}
							editIndex={editIndex}
							name={name}
							remove={remove}
							formType={formType}
							error={error?.[index]}
							showElements={showElements?.[index]}
							mode={mode}
							handleIndex={handleIndex}
							totalDraftsCount={totalDraftsCount}
							watchSearchRates={watchSearchRates}
						/>
					</div>
				</div>
			))}

			<div className={styles.btn_container}>
				{formType !== 'editform' ? (
					<div className={styles.btn_group}>
						{totalDraftsCount !== 0 && (
							<Button
								themeType="secondary"
								disabled={loading}
								onClick={() => {
									setShowForm('');
									if (
										draftLength === 0
										&& showForm === serviceType
										&& totalDraftsCount !== 0
									) {
										const getServices = [...(draftFormData?.serviceType || [])];
										setDraftFormData({
											...draftFormData,
											serviceType: [
												...(getServices.filter((itm) => itm !== serviceType)
													|| []),
											],
										});
									}
								}}
							>
								Cancel
							</Button>
						)}

						<Button
							themeType="secondary"
							onClick={handleSubmit(handlePayload)}
							disabled={loading}
						>
							Save
						</Button>
					</div>
				) : (
					<div className={styles.btn_group}>
						<Button
							themeType="secondary"
							disabled={loading}
							onClick={() => {
								if (editForm === editFormData.id) {
									setEditForm('');
								}
							}}
						>
							Cancel
						</Button>
						<Button
							themeType="secondary"
							disabled={loading}
							onClick={handleSubmit(handleUpdatePayload)}
						>
							Update
						</Button>
					</div>
				)}
			</div>
		</div>
	);
}

export default PortPairLayout;
