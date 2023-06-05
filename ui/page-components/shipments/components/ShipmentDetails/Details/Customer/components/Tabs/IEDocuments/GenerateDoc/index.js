/* eslint-disable react-hooks/exhaustive-deps */
import { Button, Placeholder } from '@cogoport/components';
import { useEffect, useState } from 'react';

import Layout from '../../../Layout';

import mawbControls from './mawbControls';
import styles from './styles.module.css';

import { useForm } from '@/packages/forms';
import useGenerateDocument from '@/ui/page-components/shipments/components/ShipmentDetails/hooks/useGenerateDocument';

function GenerateDoc({
	shipment_data = {},
	task = '',
	refetch = () => {},
	clearTask = () => {},
	setIsGenerated = () => {},
	viewDoc = false,
	details = {},
	isAmended = false,
	// setIsAmended = () => {},
	primary_service = {},
}) {
	const {
		documentList,
		pendingTaskLoading,
		documentLoading,
		generateLoading,
		certificateData,
		completeTask,
		generateCertificate,
	} = useGenerateDocument({
		shipment_data,
		task,
		refetch,
		clearTask,
	});
	const [back, setBack] = useState(false);

	const {
		control,
		handleSubmit,
		// watch,
		setValue,
		setValues,
		formState: { errors },
	} = useForm(mawbControls());
	const packages_details = [];
	if (!isAmended) {
		const { packages = [] } = primary_service;
		if (packages?.length === 0) {
			packages_details.push({
				length   : '',
				width    : '',
				height   : '',
				packages : '',
			});
		}
		(packages || []).forEach((pack) => {
			packages_details.push({
				length   : pack?.length,
				width    : pack?.width,
				height   : pack?.height,
				packages : pack?.packages_count,
			});
		});
	}

	const data = details.data ? JSON.parse(details?.data) : {};
	const keys = Object.keys(data);

	useEffect(() => {
		setValues({
			origin_airport      : primary_service?.origin_airport?.name,
			destination_airport : primary_service?.destination_airport?.name,
			dimension           : packages_details,
		});
		keys.map((item) => setValue(`${item}`, data[item]));
	}, []);

	// const formValues = watch();

	// const form_data = {
	// 	agent_name: primary_service
	// 		? `${primary_service?.service_provider?.business_name}`
	// 		: null,
	// 	...formValues,
	// };

	useEffect(() => {
		if (certificateData?.id) {
			setIsGenerated(true);
		}
	}, [certificateData]);

	useEffect(() => {
		if (viewDoc) generateCertificate();
	}, [viewDoc]);

	if (generateLoading) {
		return (
			<div className={styles.empty_container}>
				<Placeholder />
			</div>
		);
	}
	const onSubmit = () => {
		generateCertificate();
		setBack(true);
	};
	return (
		<div className={styles.container}>
			{!viewDoc && !back && (
				<div>
					<Layout
						control={control}
						errors={errors}
						controls={mawbControls()}
						themeType="admin"
					/>
				</div>
			)}
			{!viewDoc && (
				<div className={styles.button_div}>
					{!back ? (
						<Button
							onClick={handleSubmit(onSubmit)}
							disabled={documentLoading || generateLoading}
						>
							{documentLoading || generateLoading
								? 'Generating'
								: 'Generate Master Airway Bill'}
						</Button>
					) : null}
				</div>
			)}
			<div className={styles.file_container}>
				{/* {(back || viewDoc) && (
					<GenerateMawbDoc
						shipment_data={shipment_data}
						completeTask={completeTask}
						task={task}
						viewDoc={viewDoc}
						details={details}
						setIsAmended={setIsAmended}
						isAmended={isAmended}
						formData={form_data}
						setBack={setBack}
						back={back}
						primary_service={primary_service}
					/>
				)} */}
			</div>
			{documentList?.[0]?.document_url ? (
				<div className={styles.btn_div}>
					<Button
						onClick={() => {
							completeTask();
						}}
						disabled={pendingTaskLoading}
					>
						Submit
					</Button>
				</div>
			) : null}
		</div>
	);
}

export default GenerateDoc;
