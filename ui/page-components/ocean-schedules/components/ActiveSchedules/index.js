import { Pagination, Button, Popover } from '@cogoport/components';
import { IcMArrowBack, IcMPortArrow, IcMFilter } from '@cogoport/icons-react';
import { isEmpty } from '@cogoport/utils';
import { useTranslation } from 'next-i18next';
import React, { useState } from 'react';

import Loading from '../../common/Loading';
import Map from '../../common/Map';
import useFetchScheduleDetails from '../../hooks/useFetchScheduleDetails';
import useGetHandel from '../../hooks/useGetHandel';
import NoSchedulesCard from '../NoSchedulesCard';

import ActiveScheduleCard from './ActiveScheduleCard';
import Filter from './Filter';
import Navigation from './Navigation';
import styles from './styles.module.css';

import { useRouter } from '@/packages/next';
import CustomerSatisfaction from '@/ui/commons/components/CustomerSatisfaction';

const PAGE_LIMIT = 6;
const DEFAULT_CURRENT_PAGE = 0;
function ActiveSchedules() {
	const { query, push } = useRouter();
	const { t } = useTranslation(['oceanSchedule']);
	const { id } = query || {};

	const [currentPage, setCurrentPage] = useState(DEFAULT_CURRENT_PAGE);

	const {
		setFilters, scheduleDetails,
		setCarrierList, carrierList,
		filterFetchLoading,
	} = useFetchScheduleDetails({
		pageLimit: PAGE_LIMIT,
		id,
		currentPage,
	});
	const {
		handleCheckList,
		clearAllHandler,
		onChange, durationValue,
		setArrivalDate, arrivalDate,
		setDepartureDate,
		departureDate,
		setVisible,
		visible,
	} = useGetHandel({
		setFilters,
		setCarrierList,
		setCurrentPage,
		carrierList,
	});
	const { origin_port = {}, destination_port = {}, schedules = {} } = scheduleDetails || {};
	const handleBack = () => {
		push('/saas/ocean-schedules');
	};

	return (
		<div className={styles.container}>
			<div className={styles.header}>
				<IcMArrowBack
					fill="#000000"
					width="1.2rem"
					height="1.2rem"
					style={{ cursor: 'pointer' }}
					onClick={handleBack}
				/>
				<div className={styles.header_text}>
					{origin_port?.name || 'Origin'}
				</div>
				<div className={styles.icon_container}>
					<IcMPortArrow fill="#88CAD1" width="1.5rem" height="1.5rem" />
				</div>
				<div className={styles.header_text}>
					{destination_port?.name || 'Destination'}
				</div>
			</div>
			<CustomerSatisfaction position="flex-end" details={{ id }} serviceName="ocean_schedules" />
			<div className={styles.map_container}>
				<Map
					portDetails={scheduleDetails}
					transportMode="OCEAN"
					width="100%"
				/>
			</div>
			<div className={styles.middle_container}>
				<div className={styles.middle_text_container}>
					{t('oceanSchedule:active_schedules_text')}
				</div>
				<Popover
					placement="bottom"
					visible={visible}
					render={(
						<Filter
							carrierList={carrierList}
							setFilters={setFilters}
							scheduleDetails={scheduleDetails}
							durationValue={durationValue}
							onChange={onChange}
							clearAllHandler={clearAllHandler}
							handleCheckList={handleCheckList}
							setArrivalDate={setArrivalDate}
							setDepartureDate={setDepartureDate}
							departureDate={departureDate}
							arrivalDate={arrivalDate}
						/>
					)}
				>
					<div>
						<Button
							themeType="accent"
							type="button"
							className={styles.button}
							onClick={() => setVisible(!visible)}
						>
							{t('oceanSchedule:filter_text')}
							<IcMFilter />
						</Button>
					</div>
				</Popover>
			</div>

			<div className={styles.container_box}>
				<div className={styles.filter}>
					<Navigation
						departureDate={departureDate}
						setDepartureDate={setDepartureDate}
						arrivalDate={arrivalDate}
						setArrivalDate={setArrivalDate}
						carrierList={carrierList}
						handleCheckList={handleCheckList}
						durationValue={durationValue}
						onChange={onChange}
						setFilters={setFilters}
						clearAllHandler={clearAllHandler}
					/>
				</div>
				<div className={styles.active_schedules}>
					{filterFetchLoading && (
						<div className={styles.card}>
							<Loading />
						</div>
					)}
					{!filterFetchLoading && !isEmpty(schedules?.list)
						? schedules?.list.map((item) => (
							<ActiveScheduleCard
								key={item.shipping_line_id}
								schedule={item}
								scheduleDetails={scheduleDetails}
							/>
						)) : <NoSchedulesCard loading={filterFetchLoading} />}

				</div>
			</div>
			{!isEmpty(schedules?.list) && (
				<div className={styles.pagination_container}>
					<Pagination
						type="number"
						currentPage={currentPage}
						totalItems={schedules?.total_count}
						pageSize={PAGE_LIMIT}
						onPageChange={setCurrentPage}
					/>
				</div>
			)}
		</div>
	);
}

export default ActiveSchedules;
