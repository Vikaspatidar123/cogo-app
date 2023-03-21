import { useForm } from '@/packages/forms';
import controls from '@/ui/page-components/manage-rfq/configurations/SearchFormControls';

function DraftEditLayout(props) {
	const {
		serviceType,
		item,
		index,
		loading,
		importerExporterDetails,
		updateRfqDraft,
		updateLoading,
		services,
		originDetails,
		destinationDetails,
	} = props;

	let newControls = [];
	controls(serviceType).forEach((controlItem) => {
		const newItem = { ...controlItem };
		newItem.value = item.search_rates;
		newControls = [...newControls, newItem];
	});

	const formProps = useForm();
	const {
		control,
		formState: { errors },
	} = formProps;

	const handleUpdatePayload = (formData) => {
		updateRfqDraft({
			formData,
			serviceType,
			index,
			importerExporterDetails,
			id              : item.id,
			services        : services?.[serviceType]?.[index] || {},
			originData      : originDetails[serviceType][index],
			destinationData : destinationDetails[serviceType][index],
		});
	};
	return (
		<div>
			<PortPairLayout
				{...props}
				{...formProps}
				{...fields.search_rates}
				formType="editform"
				editFormData={item}
				editIndex={index}
				error={errors?.search_rates}
				mode={serviceType}
				loading={updateLoading || loading}
				handleUpdatePayload={handleUpdatePayload}
			/>
		</div>
	);
}

export default DraftEditLayout;
