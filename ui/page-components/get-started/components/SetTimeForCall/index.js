import { Button, Timepicker } from '@cogoport/components';
import { IcCFtick } from '@cogoport/icons-react';
import React, { useState } from 'react';

import useCreateOrganizationCommunicationDetail from '../../hooks/useCreateOrganizationCommunicationDetail';

import styles from './styles.module.css';

function SetTimeForCall({ orgId, orgBranchId }) {
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
				<span className={styles.header_container_bold}>Account Created</span>
				Your Cogoport Account has been set up.
			</div>
			<div className={styles.icon_container}>
				<IcCFtick width="120px" height="120px" />
			</div>
			<div className={styles.text}>
				An agent might reach out to you over phone for business verification.
			</div>
			<div className={styles.text}>
				Please select your preferred time slot in a day when you are available for a call.
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
						FINISH
					</Button>
				</div>
			</div>
		</div>
	);
}

export default SetTimeForCall;
