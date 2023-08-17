import { cl } from '@cogoport/components';
import { IcCFtick } from '@cogoport/icons-react';
import { startCase } from '@cogoport/utils';
import React, { useEffect, useState } from 'react';

import getPromotion from '../../utils/getPromotion';

import CogoAssuredSchedule from './CogoAssuredSchedule';
import DetentionDemurrage from './DetentionDemurrage';
import HaulageText from './HaulageText';
import Promocode from './Promocode';
import Quotation from './Quotation';
import QuotationDetails from './QuotationDetails';
import Route from './Route';
import ScheduleDetails from './ScheduleDetails';
import styles from './styles.module.css';
import AirTags from './Tags/AirTags';
import { FclTags } from './Tags/FclTags';

import { useSelector } from '@/packages/store';
import GLOBAL_CONSTANTS from '@/ui/commons/constants/globals';
import formatDate from '@/ui/commons/utils/formatDate';

const RATE_SOURCE_MAPPING = {
	spot_rates            : 'System Rate',
	spot_negotiation_rate : 'Enquiry Reverted Rate',
	predicted             : 'Predicted Rate',
	cogo_assured_rate     : 'Assured',
};

const detailsToShow = (data, details) => {
	const detailsData = [
		{
			value:
			data?.transit_time
			&& ['air_freight', 'lcl_freight'].includes(data?.service_type)
				? `Transit Time - ${data?.transit_time || 0} ${
					['lcl_freight'].includes(data?.service_type) ? 'Days' : 'Hours'
				}  `
				: null,
		},

		{
			value:
				details?.chargeable_weight
				&& ['air_freight'].includes(data?.service_type)
					? `Chargeable weight - ${details?.chargeable_weight || 0}kgs`
					: null,
		},

		{
			value:
				(data?.origin_storage?.free_limit
				|| data?.origin_storage?.free_limit === 0)
				&& ['air_freight', 'lcl_freight'].includes(data?.service_type)
					? `${
						data?.origin_storage?.free_limit || 0
					} free origin storage hours `
					: null,
		},

		{
			value:
			(data?.destination_storage?.free_limit
			|| data?.destination_storage?.free_limit === 0)
			&& ['air_freight', 'lcl_freight'].includes(data?.service_type)
				? `${
					data?.destination_storage?.free_limit || 0
				} free destination storage ${
					data?.service_type === 'air_freight' ? 'hours' : 'days'
				}`
				: null,
		},

		{
			value:
				data?.operation_type && ['air_freight'].includes(data?.service_type)
					? `Operation Type - ${data?.operation_type || ''}`
					: null,
		},
	];

	return detailsData
		.map((item) => (item?.value ? (
			<div
				style={{
					display    : 'flex',
					alignItems : 'center',
					width      : '40%',
					margin     : '4px',
				}}
			>
				<IcCFtick style={{ fontSize: '16px', color: 'red' }} />
				<div className={styles.extra_details}>{item?.value}</div>
			</div>
		) : null))
		.filter((item) => !!item);
};

const tagsToShow = (data) => data?.tags
	?.map((item) => (item ? (
		<div
			style={{
				display    : 'flex',
				alignItems : 'center',
				width      : '40%',
				margin     : '4px',
			}}
		>
			<IcCFtick style={{ fontSize: '16px' }} />

			<div className={styles.extra_details}>{item}</div>
		</div>
	) : null))
	.filter((item) => !!item);

function RateCard(props) {
	const { partnerId } = useSelector(({ general, profile }) => ({
		scope     : general?.scope,
		isMobile  : general?.isMobile,
		partnerId : profile?.partner?.id,
	}));

	const {
		data = {},
		setState = () => {},
		state,
		details = {},
		refetch = () => {},
		enquiry_page = false,
		results_type = '',
		searchData = {},
		id,
		scheduleList,
		selectAssuredSchedule,
	} = props;
	const [open, setOpen] = useState(false);
	const [show, setShow] = useState(false);
	const [viewSchedules, setViewSchedules] = useState(false);
	const [activeTab, setActiveTab] = useState('origin');
	const [scheduleId, setScheduleId] = useState('');
	const scheduleData = scheduleList?.filter(
		(x) => x.shipping_line_id === scheduleId,
	);
	const isOriginHaulageRates = !!Object.values(data?.service_rates).find(
		(service) => service?.is_rate_available
      && service?.service_type === 'haulage_freight'
      && service?.trade_type === 'export',
	);
	const isDestinationHaulageRates = !!Object.values(data?.service_rates).find(
		(service) => service?.is_rate_available
      && service?.service_type === 'haulage_freight'
      && service?.trade_type === 'import',
	);
	const showSchedules = () => {
		if (data?.source !== 'cogo_assured_rate') {
			if (!data?.departure && !data?.arrival) {
				return null;
			}

			return (
				<div className={styles.schedules}>
					<div className={styles.schedule_tag}>
						Schedule
						{['fake', 'predicted'].includes(data?.schedule_source) ? ' - Estimated' : null}
					</div>
					<div className={styles.schedule_date}>
						{data?.service_type === 'fcl_freight' ? <>(ETD)</> : null}
						<div className={styles.dates}>
							{formatDate({
								date       : data?.departure,
								dateFormat : GLOBAL_CONSTANTS.formats.date['dd MMM yyyy'],
								formatType : 'date',
							})}
						</div>
						<div className={styles.line} />
						<div className={styles.dates}>
							{formatDate({
								date       : data?.arrival,
								dateFormat : GLOBAL_CONSTANTS.formats.date['dd MMM yyyy'],
								formatType : 'date',
							})}
						</div>
						{data?.service_type === 'fcl_freight' ? <>(ETA)</> : null}
					</div>
					{data?.service_type === 'fcl_freight' && data?.transit_time ? (
						<div className={styles.fcl_transit_time}>
							Transit Time :
							{' '}
							{data?.transit_time}
							{' '}
							Days
						</div>
					) : null}
				</div>
			);
		}
		return (
			<>
				<CogoAssuredSchedule
					rate={data}
					selectAssuredSchedule={selectAssuredSchedule}
				/>
				<div className={styles.cogo_assured_tags}>{tagsToShow(data)}</div>
			</>
		);
	};
	useEffect(() => {
		setScheduleId(data.shipping_line?.id);
	}, [data]);

	return (
		<div
			className={styles.container}
			style={
        results_type === 'rfq' ? { width: '100%', marginLeft: '10px' } : {}
      }
			id={id}
		>
			<div className={styles.card}>
				<div className={styles.rate}>
					<div style={{ display: 'flex', justifyContent: 'space-between' }}>
						<div style={{ display: 'flex' }}>
							{data?.source === 'cogo_assured_rate' ? (
								<div className={styles.cogo_assured_icon}>
									<img
										// eslint-disable-next-line max-len
										src="https://cdn.cogoport.io/cms-prod/cogo_partner/vault/original/cogoassured-logo.svg"
										alt="approve"
									/>
								</div>
							) : (
								<div
									className={cl`${styles[data.source]} ${styles.cogo_assured}`}
								>
									<text className={cl`${styles[data?.source]} ${styles.text}`}>
										{RATE_SOURCE_MAPPING[data?.source] || 'System Rates'}
									</text>
								</div>
							)}

							{['air_freight', 'fcl_freight'].includes(data?.service_type) && data?.cogo_entity_id
							&& partnerId !== data?.cogo_entity_id
								? <div className={styles.cogo_universe}>via Cogo Universe </div> : null}
						</div>

						{data?.service_type === 'haulage_freight' ? (
							<div className={cl`${styles.wrapper} ${styles.payment_term}`}>
								<div className={styles.text}>
									{startCase(data?.haulage_type)}
								</div>
							</div>
						) : null}

						{data?.service_type === 'fcl_freight' ? (
							<FclTags data={data} />
						) : null}

						{data?.service_type === 'air_freight' ? (
							<AirTags data={data} />
						) : null}
					</div>

					<Route
						data={data}
						details={details}
						results_type={results_type}
						isOriginHaulageRates={isOriginHaulageRates}
						isDestinationHaulageRates={isDestinationHaulageRates}
					/>

					{showSchedules()}

					<HaulageText
						data={data}
						details={details}
						isOriginHaulageRates={isOriginHaulageRates}
						isDestinationHaulageRates={isDestinationHaulageRates}
					/>

					<Promocode promotion={getPromotion({ promocodes: data?.promocode })} />

					{detailsToShow(data, details)?.length > 0 ? (
						<>
							<div
								className={cl`${styles.line_vrt} ${styles.horizontal}`}
							/>

							<div
								style={{
									display  : 'flex',
									padding  : '10px 30px',
									flexWrap : 'wrap',
								}}
							>
								{detailsToShow(data, details)}
								{tagsToShow(data)}
							</div>

							{results_type === 'rfq' && (
								<div
									className={cl`${styles.line_vrt} ${styles.styles.horizontal}`}
									style={{ marginTop: '0px' }}
								/>
							)}
						</>
					) : null}

				</div>

				<div className={styles.line_vrt} />
				<Quotation
					data={data}
					state={state}
					setState={setState}
					setOpen={setOpen}
					open={open}
					refetch={refetch}
					enquiry_page={enquiry_page}
					details={details}
					results_type={results_type}
					spot_search_id={details?.id}
					id={id}
					viewSchedules={viewSchedules}
					setViewSchedules={setViewSchedules}
					isConfirmed={false}
					setScheduleId={setScheduleId}
					scheduleData={scheduleData}
				/>

			</div>

			{open && (
				<div
					className={styles.animated_container}
					type={open ? 'enter' : 'exit'}
				>
					<QuotationDetails
						searchData={searchData}
						details={details}
						data={data}
						id={id}
						isConfirmed={false}
					/>
				</div>
			)}

			{viewSchedules && (
				<div
					className={styles.animated_container}
					type={viewSchedules ? 'enter' : 'exit'}
				>
					{(scheduleData || []).map((x) => (
						<ScheduleDetails list={x.schedules} />
					))}
				</div>
			)}

			{data?.service_type === 'fcl_freight' ? (
				<DetentionDemurrage
					show={show}
					setShow={setShow}
					activeTab={activeTab}
					setActiveTab={setActiveTab}
					refetch={refetch}
					{...props}
				/>
			) : null}
		</div>
	);
}

export default RateCard;
