import { Button, Timepicker } from '@cogoport/components';
import { IcCFtick } from '@cogoport/icons-react';
import { useTranslation } from 'next-i18next';
import React, { useState } from 'react';

import useCreateOrganizationCommunicationDetail from '../../hooks/useCreateOrganizationCommunicationDetail';

import styles from './styles.module.css';

function SetTimeForCall({ orgId, orgBranchId }) {
	const { t } = useTranslation(['common', 'getStarted']);
	const [startTime, setStartTime] = useState();
	const [endTime, setEndTime] = useState();

	const {
		onClickCreateOrganizationCommunicationDetail,
		createOrganizationCommunicationDetailLoading,
	} = useCreateOrganizationCommunicationDetail({ orgId, orgBranchId });

	const getFormattedTime = () => {
		const startTimeFormat = new Date(startTime);
		let startTimeFormatHour = startTimeFormat.getHours();
		const startTimeFormatMinutes = startTimeFormat.getMinutes();
		const formattedStartDate = {
			period : startTimeFormatHour >= 12 ? 'PM' : 'AM',
			hr     : startTimeFormatHour > 12 ? startTimeFormatHour -= 12 : startTimeFormatHour,
			min    : startTimeFormatMinutes,
		};

		const endTimeFormat = new Date(endTime);
		let endTimeFormatHour = endTimeFormat.getHours();
		const endTimeFormatMinutes = endTimeFormat.getMinutes();

		const formattedEndDate = {
			period : endTimeFormatHour >= 12 ? 'PM' : 'AM',
			hr     : endTimeFormatHour > 12 ? endTimeFormatHour -= 12 : endTimeFormatHour,
			min    : endTimeFormatMinutes,

		};

		return { formattedStartDate, formattedEndDate };
	};

	const handleClick = () => {
		const { formattedStartDate, formattedEndDate } = getFormattedTime();
		onClickCreateOrganizationCommunicationDetail({
			formattedStartDate, formattedEndDate,
		});
	};

	return (
		<div className={styles.container}>
			<div className={styles.header_container}>
				<span className={styles.header_container_bold}>
					{t('getStarted:rightPanel_get_started_call_setup_text_1')}
				</span>
				{t('getStarted:rightPanel_get_started_call_setup_text_2')}
			</div>
			<div className={styles.icon_container}>
				<IcCFtick width="120px" height="120px" />
			</div>
			<div className={styles.text}>
				{t('getStarted:rightPanel_get_started_call_setup_text_3')}
			</div>
			<div className={styles.text}>
				{t('getStarted:rightPanel_get_started_call_setup_text_4')}
			</div>
			<div className={styles.time_picker_container}>
				<div className={styles.time_picker}>
					<Timepicker name="date" timeIntervals={15} onChange={setStartTime} value={startTime} />
				</div>
				<div className={styles.text}>To</div>
				<div className={styles.time_picker}>
					<Timepicker name="date" timeIntervals={15} onChange={setEndTime} value={endTime} />
				</div>
				<div className={styles.button_container}>
					<Button
						className={styles.button}
						themeType="accent"
						size="lg"
						disabled={createOrganizationCommunicationDetailLoading}
						onClick={handleClick}
					>
						{t('getStarted:rightPanel_get_started_call_setup_finish_button_label')}
					</Button>
				</div>
			</div>
		</div>
	);
}

export default SetTimeForCall;
