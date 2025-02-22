import { Button, Toast } from '@cogoport/components';
import { IcMPlus } from '@cogoport/icons-react';
import { useState, useEffect } from 'react';

import controls from '../../../configurations/SearchFormControls';
import airControls from '../../../configurations/SearchFormControls/create-air-rfq-controls';
import fclControls from '../../../configurations/SearchFormControls/create-fcl-rfq-controls';
import lclControls from '../../../configurations/SearchFormControls/create-lcl-rfq-controls';
import { FreightServices } from '../../../constant';
import useCreateRfqDraft from '../../../hooks/useCreateRfqDraft';
import useCreateRfqSearch from '../../../hooks/useCreateRfqSearch';
import useGetRfq from '../../../hooks/useGetRfq';
import useUpdateRfqDraft from '../../../hooks/useUpdateRfqDraft';
import { airDefaultValues, lclDefaultValue, fclDefaultValue } from '../../../utils/defaultValues';
import iconUrl from '../../../utils/iconUrl.json';

import Footer from './Footer';
import SearchForm from './SearchForm';
import styles from './styles.module.css';

import { useForm } from '@/packages/forms';

function ManualCreation({ currentStep, setCurrentStep, rfqId, ...rest }) {
	const {
		quotation_name,
		importerExporterDetails: ImpExpDetails,
		reason_type,
	} = rest;

	const [importerExporterDetails, setImporterExporterDetails] = useState({
		...ImpExpDetails,
		rfqName : quotation_name,
		rfqType : reason_type,
	});
	const [editForm, setEditForm] = useState('');
	const [showForm, setShowForm] = useState('fcl_freight');
	const [originDetails, setOriginDetails] = useState({});
	const [destinationDetails, setDestinationDetails] = useState({});
	const [hscodeDetails, setHscodeDetails] = useState({});
	const [shippingLinesDetails, setShippingLinesDetails] = useState({});
	const [draftFormData, setDraftFormData] = useState({ rfq_id: rfqId || '', serviceType: ['fcl_freight'] });
	const [services, setServices] = useState({});

	const lclProps = useForm(lclDefaultValue);
	const fclProps = useForm(fclDefaultValue);
	const airProps = useForm(airDefaultValues);

	const formProps = {
		fcl_freight : fclProps,
		lcl_freight : lclProps,
		air_freight : airProps,
	};
	const fieldProps = {
		fcl_freight : fclControls,
		lcl_freight : lclControls,
		air_freight : airControls,
	};

	const { createRfqSearch, searchLoading } = useCreateRfqSearch();

	const { createRfqDraft, createLoading } = useCreateRfqDraft({
		draftFormData,
		setDraftFormData,
		originDetails,
		destinationDetails,
		formProps,
		importerExporterDetails,
		setShowForm,
	});

	const { getRfq, loading } = useGetRfq({
		setImporterExporterDetails,
		setDraftFormData,
		setShowForm,
		setServices,
		setOriginDetails,
		setDestinationDetails,
		rfqId,
		showForm,
	});

	const { updateRfqDraft, updateLoading } = useUpdateRfqDraft({
		draftFormData,
		setDraftFormData,
		editForm,
		setEditForm,
		originDetails,
		destinationDetails,
		getRfq,
	});

	useEffect(() => {
		if (rfqId) {
			getRfq(rfqId);
		}
	}, [getRfq, rfqId]);

	const totalDraftsCount = (draftFormData?.formData?.fcl_freight?.data || []).length
		+ (draftFormData?.formData?.lcl_freight?.data || []).length
		+ (draftFormData?.formData?.air_freight?.data || []).length;

	return (
		<div className={styles.container}>
			{loading ? (
				<div className={styles.loader}>
					<img src={iconUrl.loading} alt="loading.." className={styles.cogo_loader} />
				</div>
			) : (
				<div className={styles.body}>
					{(draftFormData?.serviceType || ['fcl_freight']).map(
						(serviceItem, idx) => (
							<div key={`${serviceItem}_search_form`}>
								<SearchForm
									formProps={formProps}
									fieldProps={fieldProps}
									controls={controls}
									idx={idx}
									serviceItem={serviceItem}
									createRfqDraft={createRfqDraft}
									draftFormData={draftFormData}
									setDraftFormData={setDraftFormData}
									originDetails={originDetails}
									editForm={editForm}
									showForm={showForm}
									setShowForm={setShowForm}
									setEditForm={setEditForm}
									setOriginDetails={setOriginDetails}
									destinationDetails={destinationDetails}
									setDestinationDetails={setDestinationDetails}
									hscodeDetails={hscodeDetails}
									setHscodeDetails={setHscodeDetails}
									shippingLinesDetails={shippingLinesDetails}
									setShippingLinesDetails={setShippingLinesDetails}
									loading={searchLoading || createLoading}
									updateLoading={updateLoading}
									updateRfqDraft={updateRfqDraft}
									setServices={setServices}
									services={services}
									totalDraftsCount={totalDraftsCount}
								/>
							</div>
						),
					)}
					{(draftFormData?.serviceType || []).length > 0 && (draftFormData?.serviceType || []).length < 3 && (
						<div className={styles.btn_box}>
							<div>
								<Button
									themeType="secondary"
									onClick={() => {
										if (!showForm) {
											const newServices = FreightServices.filter(
												(el) => !draftFormData.serviceType.includes(el),
											);
											setDraftFormData({
												...draftFormData,
												serviceType: [
													...draftFormData.serviceType,
													newServices[0],
												],
											});
										} else if (!editForm) {
											Toast.error('Save all forms to open a new form.');
										} else {
											Toast.error('To open a new form, save the edited form. ');
										}
									}}
								>
									Add New Block
									{' '}
									<IcMPlus className={styles.plus_icon} />
								</Button>
							</div>
						</div>
					)}
					<div className={styles.dummy_footer} />
				</div>
			)}
			<Footer
				draftFormData={draftFormData}
				showForm={showForm}
				editForm={editForm}
				currentStep={currentStep}
				setCurrentStep={setCurrentStep}
				importerExporterDetails={importerExporterDetails}
				createRfqSearch={createRfqSearch}
				totalDraftsCount={totalDraftsCount}
				loading={createLoading || searchLoading}
			/>
		</div>
	);
}

export default ManualCreation;
