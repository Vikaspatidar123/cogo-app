import { Checkbox, cl, Tooltip, Button } from '@cogoport/components';
import { IcMInfo } from '@cogoport/icons-react';
import { startCase } from '@cogoport/utils';
import { useState } from 'react';

import useCreateAlert from '../../../../../../hooks/useCreateAlert';

import styles from './styles.module.css';

const POC = {
	shipper   : 'Is Shipper?',
	consignee : 'Is Consignee?',
	dsr       : 'Include Shipment in Status Report',
};

function RenderTooltip({ description }) {
	if (!description) return null;
	return (
		<Tooltip
			content={description}
		>
			<span><IcMInfo className={styles.info_icon} /></span>
		</Tooltip>
	);
}

function AddAlert({
	prevStepHandler, prevAlertData = [], selectContactList = [], alertList = [], shipmentId = '',
}) {
	const [tableValue, setTableValue] = useState({
		shipper   : [],
		consignee : [],
		dsr       : [],
	});

	const { loading, submitHandler, checkboxChangeHandler, contactList } = useCreateAlert({
		tableValue,
		setTableValue,
		prevAlertData,
		selectContactList,
		alertList,
		shipmentId,
	});

	return (
		<div className={styles.container}>
			<div className={styles.header}>
				<h3>Customize events for updates and deviations</h3>
			</div>

			<div className={styles.info_container}>

				<div className={styles.table_container}>
					<div className={cl`${styles.flex_box} ${styles.title_row}`}>
						<div className={cl`${styles.title_col} ${styles.col}`}>&nbsp;</div>
						{contactList.map((contact) => (
							<div className={styles.col}>{startCase(contact?.name)}</div>
						))}
					</div>

					<div className={styles.value_container}>
						<div>
							{Object.keys(POC).map((ele) => (
								<div key={ele} className={styles.flex_box}>
									<div className={cl`${styles.title_col} ${styles.col}`}>{POC[ele]}</div>

									{contactList.map((contact) => (
										<div key={`${ele}_${contact?.id}`} className={styles.col}>
											<Checkbox
												checked={tableValue[ele].includes(contact?.id)}
												onChange={checkboxChangeHandler({ name: ele, contactInfo: contact })}
											/>
										</div>
									))}
								</div>
							))}
						</div>

						<p className={styles.configure_title}>Configure Alerts</p>
						<div>
							{(alertList || []).map((ele) => {
								const { alert_name = '', description = '' } = ele;
								return (
									<div key={ele?.id} className={styles.flex_box}>

										<div className={cl`${styles.title_col} ${styles.col}`}>
											<span>{alert_name}</span>
											<RenderTooltip description={description} />
										</div>

										{contactList.map((contact) => (
											<div key={`${ele?.id}_${contact?.id}`} className={styles.col}>
												<Checkbox
													checked={tableValue?.[alert_name]?.includes(contact?.id)}
													onChange={checkboxChangeHandler({
														name        : alert_name,
														contactInfo : contact,
													})}
												/>
											</div>
										))}
									</div>
								);
							})}
						</div>
					</div>
					<div className={styles.footer}>
						<Button themeType="secondary" onClick={prevStepHandler} disabled={loading}>Back</Button>
						<Button
							className={styles.submit_btn}
							themeType="accent"
							loading={loading}
							onClick={submitHandler}
						>
							Next
						</Button>
					</div>
				</div>
			</div>
		</div>
	);
}

export default AddAlert;
