import { useState, useEffect } from 'react';

import useCreateRfqDraft from '../../../hooks/useCreateRfqDraft';
import useCreateRfqSearch from '../../../hooks/useCreateRfqSearch';
import useGetRfq from '../../../hooks/useGetRfq';
import useUpdateRfqDraft from '../../../hooks/useUpdateRfqDraft';
import iconUrl from '../../../utils/iconUrl.json';

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
	const [originDetails, setOriginDetails] = useState({});
	const [editForm, setEditForm] = useState('');
	const [showForm, setShowForm] = useState('fcl_freight');
	const [destinationDetails, setDestinationDetails] = useState({});
	const [shippingLinesDetails, setShippingLinesDetails] = useState({});
	const [draftFormData, setDraftFormData] = useState({ rfq_id: rfqId || '' });
	const [services, setServices] = useState({});

	const lclProps = useForm();
	const fclProps = useForm();
	const airProps = useForm();

	const formProps = {
		fcl_freight : fclProps,
		lcl_freight : lclProps,
		air_freight : airProps,
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
		if (rfqId) getRfq(rfqId);
	}, []);

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
				<div className={styles.body} />
			)}
		</div>
	);
}

export default ManualCreation;
