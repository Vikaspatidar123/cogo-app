import { Modal, Button, Tooltip, Checkbox, Toast } from '@cogoport/components';
import { IcMInfo } from '@cogoport/icons-react';
import { useState, useEffect } from 'react';

import useCreateAlerts from '../../../hooks/useCreateAlerts';
import useFetchMasterList from '../../../hooks/useFetchMasterList';

import styles from './styles.module.css';

import FormItem from '@/ui/commons/components/FormItem';

function AddAlerts({
	handlePrevious,
	setLoading,
	trackerPoc,
	subscriptionAlerts,
	setTrackerPoc,
	handleNext,
	trackerDetails,
}) {
	const { selected_poc_details = [] } = trackerPoc;
	const [pocDetails, setPocDetails] = useState([]);
	const { masterList } = useFetchMasterList();
	const { loading, createAlert } = useCreateAlerts();
	const [values, setValue] = useState({
		shipper   : [],
		consignee : [],
		dsr       : [],
	});
	// setLoading(submitLoading);
	const syncServerToFields = async () => {
		const pocDetailsFromServer = (subscriptionAlerts || []).map(
			(u) => u?.poc_details,
		);
		setTrackerPoc((prev) => ({
			...prev,
			selected_poc_details: [
				...pocDetailsFromServer,
				...selected_poc_details.filter(
					(u) => !pocDetailsFromServer.some((v) => u?.id === v?.id),
				),
			],
		}));
		const prefilledValues = {
			shipper   : [],
			consignee : [],
			dsr       : [],
		};
		subscriptionAlerts?.forEach((poc) => {
			if (poc?.poc_details?.user_type === 'SHIPPER') {
				prefilledValues.shipper.push(poc?.poc_details?.id);
			}
			if (poc?.poc_details?.user_type === 'CONSIGNEE') {
				prefilledValues.consignee.push(poc?.poc_details?.id);
			}
			if (poc?.dsr_status_report?.status === 'TRUE') {
				prefilledValues.dsr.push(poc?.poc_details?.id);
			}
			poc.alerts_configured.forEach((pocAlert) => {
				if (!prefilledValues?.[pocAlert?.alert_name]) {
					prefilledValues[pocAlert?.alert_name] = [];
				}
				if (pocAlert?.is_active) {
					prefilledValues?.[pocAlert?.alert_name].push(poc?.poc_details.id);
				}
			});
		});
		setValue(prefilledValues);
	};
	const isUpdate = subscriptionAlerts?.length > 0;
	useEffect(() => {
		if (isUpdate) {
			syncServerToFields();
		} else {
			setPocDetails(selected_poc_details);
		}
	}, []);
	useEffect(() => {
		setPocDetails(selected_poc_details);
	}, [selected_poc_details]);
	function TooltipContent({ description }) {
		return (
			<Tooltip
				position="bottom"
				trigger="mouseenter"
				content={<div>{description}</div>}
			>
				{' '}
				<IcMInfo size={1} />
				{' '}

			</Tooltip>
		);
	}
	const handleSubmit = async () => {
		const { shipper, consignee, dsr, ...otherValues } = values;
		const alert_configuration = pocDetails?.map((poc) => {
			const poc_id = poc?.id;
			const event = [];
			masterList?.forEach((alertConfig) => {
				const singleEvent = {
					milestone    : alertConfig?.milestone,
					alert_name   : alertConfig?.alert_name,
					alert_types  : alertConfig?.alert_types,
					alert_medium : alertConfig?.alert_medium,
				};
				const otherValue = otherValues[alertConfig?.alert_name];
				singleEvent.is_active = otherValue?.includes(poc_id);
				if (isUpdate) {
					const pocSub = subscriptionAlerts.find(
						(s) => s?.poc_details?.id === poc_id,
					);
					const pocSubAlert = pocSub?.alerts_configured?.find?.(
						(a) => a.alert_name === alertConfig.alert_name,
					);
					if (pocSubAlert) {
						singleEvent.id = pocSubAlert?.id;
					}
				}
				event.push(singleEvent);
			});
			const dsr_report = dsr?.includes(poc_id);
			const req = {
				poc_id,
				dsr_report,
				event,
			};
			const pocSub = subscriptionAlerts.find(
				(s) => s?.poc_details?.id === poc_id,
			);
			if (isUpdate) {
				req.saas_dsr_id = pocSub?.dsr_status_report?.saas_dsr_id;
			}
			return req;
		});
		if (!(shipper.length > 0 || consignee.length > 0)) {
			Toast.error('Please select either shipper or consignee');
			return;
		}
		try {
			const alertData = await createAlert(
				trackerDetails?.id,
				shipper[0],
				consignee[0],
				alert_configuration,
			);
			if (alertData?.result) {
				handleNext(true);
			} else {
				Toast.error('Unable to create alerts. Please try again.');
			}
		} catch (err) {
			Toast.error('Unable to create alerts. Please try again.');
		}
	};
	const POC = {
		SHIPPER   : 'Is Shipper?',
		CONSIGNEE : 'Is Consignee?',
		DSR       : 'Include Shipment in Status Report',
	};
	const handleCheckboxChange = (name, detail, value) => (e) => {
		let newValues = value?.[name];
		if (!Array.isArray(newValues)) {
			newValues = [];
		}
		if (e.target.checked) {
			if (
				(name === 'shipper' || name === 'consignee')
        && newValues?.length > 0
			) {
				newValues = [detail?.id];
			} else {
				newValues.push(detail?.id);
			}
		} else {
			const detailIndex = (values?.[name] || []).findIndex(
				(d) => d === detail?.id,
			);
			newValues.splice(detailIndex, 1);
		}
		setValue((prv) => ({ ...prv, [name]: newValues }));
	};
	function CheckboxContainerComp({ value, ...props }) {
		return (
			<div className={styles.check_box_container}>
				{' '}
				<Checkbox
					className={styles.check_box}
					{...props}
					checked={value}
					position
				/>
				{' '}

			</div>
		);
	}
	return (
		<div>
			{' '}
			<Modal.Body>
				{' '}
				<from style={{ width: '100%', marginTop: 32, overflowX: 'auto' }}>
					{' '}
					<FormItem style={{ minWidth: 100 }}>
						{' '}
						<div className={styles.container}>
							{' '}
							<div className={styles.main} style={{ minWidth: 150 }}>
								{' '}
&nbsp;
							</div>
							{' '}
							{pocDetails?.map((detail) => (
								<div className={styles.item}>{detail?.name}</div>))}
						</div>
						{' '}
						<div className={styles.container} style={{ background: '#F9F9F9' }}>
							{' '}
							<div className={styles.main}>{POC.SHIPPER}</div>
							{' '}
							{pocDetails?.map((detail) => (
								<CheckboxContainerComp
									key={detail?.id}
									disabled={isUpdate}
									name="shipper"
									onChange={handleCheckboxChange('shipper', detail, values)}
									value={values?.shipper.includes(detail?.id)}
									color="blue"
								/>
							))}
						</div>
						{' '}
						<div className={styles.container}>
							{' '}
							<div className={styles.main}>{POC.CONSIGNEE}</div>
							{' '}
							{pocDetails?.map((detail) => (
								<CheckboxContainerComp
									key={detail?.id}
									disabled={isUpdate}
									name="consignee"
									onChange={handleCheckboxChange('consignee', detail, values)}
									value={values?.consignee.includes(detail?.id)}
									color="blue"
								/>
							))}
						</div>
						{' '}
						<div
							className={styles.container}
							style={{
								background   : '#F9F9F9',
								borderBottom : '1px dashed black',
							}}
						>
							{' '}
							<div className={styles.main}>{POC.DSR}</div>
							{' '}
							{pocDetails.map((detail) => (
								<CheckboxContainerComp
									key={detail?.id}
									name="dsr"
									onChange={handleCheckboxChange('dsr', detail, values)}
									value={values?.dsr.includes(detail?.id)}
									color="blue"
								/>
							))}
						</div>
						{' '}
						<div className={styles.container}>
							{' '}
							<div
								className={styles.main}
								style={{ fontWeight: 'bold', fontSize: 16 }}
							>
								{' '}
								Configure Alerts
							</div>
							{' '}
							{pocDetails?.map((detail) => (
								<div className={styles.empty} key={detail?.id} />))}
						</div>
						{' '}
						{masterList?.map((list, index) => (
							<div
								className={styles.container}
								style={{ background: index % 2 ? '#F9F9F9' : 'none' }}
								key={list?.alert_name}
							>
								{' '}
								<div className={styles.main}>
									{' '}
									{list?.alert_name}
									{' '}
									{list?.description ? (
										<TooltipContent description={list?.description} />) : null}
								</div>
								{' '}
								{pocDetails?.map((detail) => (
									<CheckboxContainerComp
										key={detail?.id}
										name={list?.alert_name}
										onChange={handleCheckboxChange(
											list?.alert_name,
											detail,
											values,
										)}
										value={(values?.[list?.alert_name] || []).includes(
											detail?.id,
										)}
									/>
								))}
							</div>
						))}
					</FormItem>
					{' '}

				</from>
				{' '}

			</Modal.Body>
			{' '}
			<Modal.Footer>
				{' '}
				<div className={styles.button}>
					{' '}
					<Button size="lg" onClick={handlePrevious} themeType="secondary">
						{' '}
						Back
					</Button>
					{' '}
					<Button
						size="lg"
						disabled={loading}
						hideOverflow
						type="submit"
						onClick={() => handleSubmit()}
					>
						{' '}
						Save
					</Button>
					{' '}

				</div>
				{' '}

			</Modal.Footer>
			{' '}

		</div>
	);
}
export default AddAlerts;
