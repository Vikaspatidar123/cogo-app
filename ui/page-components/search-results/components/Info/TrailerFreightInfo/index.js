import { cl, Button, Tooltip, Modal } from '@cogoport/components';
import { IcCFhaulage, IcMFtrailorFull, IcMEdit } from '@cogoport/icons-react';
import { getByKey, startCase } from '@cogoport/utils';
import React, { useState } from 'react';

import formatMainServiceData from '../../../utils/format-main-service-data';
import AdditionalServices from '../../AdditionalServices';
import Loading from '../loading';

import ContainerDetails from './ContainerDetails';
import LocationDetails from './LocationDetails';
import styles from './styles.module.css';

import { useSelector } from '@/packages/store';
import { APP_EVENT, trackEvent } from '@/ui/commons/constants/analytics';
import GLOBAL_CONSTANTS from '@/ui/commons/constants/globals';
import formatDate from '@/ui/commons/utils/formatDate';
import SearchForm from '@/ui/page-components/discover_rates/common/SearchForm';

const NON_STANDALONE_SERVICES = ['fcl_cfs'];

const SEARCH_TYPE_DETAILS_MAPPING = {
	trailer_freight: {
		icon  : <IcMFtrailorFull color="#8fbdb1" />,
		label : 'Trailer',
	},
	rail_domestic_freight: {
		icon  : <IcCFhaulage />,
		label : 'Rail',
	},
};

function TrailerFreightInfo({
	data = {},
	setOpen = () => {},
	open = false,
	loading = false,
	importer_exporter_details = {},
	searchData = {},
	refetch = () => {},
	results_type = '',
	rates = [],
	possible_additional_services = [],
}) {
	const { scope, query } = useSelector(({ general }) => general);

	const [editSearch, setEditSearch] = useState(false);

	const { service_type } = data || {};

	const { detail = {} } = searchData || {};
	const {
		service_details = {},
		cargo_readiness_date = '',
		container_load_type = '',
	} = detail || {};

	if (loading) {
		return <Loading />;
	}

	const searchForm = (
		<div className={styles.edit_container}>
			<SearchForm
				mode={data.search_type}
				onPush={() => setEditSearch(false)}
				serviceDetails={data?.service_details}
				extraParams={{
					importer_exporter_id        : importer_exporter_details.id,
					importer_exporter_name      : importer_exporter_details.name,
					importer_exporter_branch_id : importer_exporter_details?.branch_id,
					user_id                     : importer_exporter_details?.user_id,
				}}
				data={formatMainServiceData(
					data?.search_type,
					Object.values(data?.service_details || {}),
				)}
				isEdit
				searchData={searchData}
				className="small result"
			/>

			<Button
				service_type={service_type}
				themeType="secondary"
				onClick={() => setEditSearch(false)}
			>
				X
			</Button>
		</div>
	);

	function CargoDate({ type = '' }) {
		return (
			<>
				<div className={styles.freight_details_text} type={type}>Cargo Ready Date</div>
				<div className={styles.freight_details}>
					{/* {formatDate({
						date       : cargo_readiness_date,
						dateFormat : GLOBAL_CONSTANTS.formats.date['dd MMM yyyy'],
						formatType : 'date',
					})} */}
					{formatDate(cargo_readiness_date, GLOBAL_CONSTANTS.formats.date['dd MMM yyyy'])}
				</div>
			</>
		);
	}

	function ShipmentType({ type = '' }) {
		return (
			<>
				<div className={styles.freight_details_text} type={type}>Type of Shipment </div>
				<div className={styles.freight_details}>{startCase(container_load_type)}</div>
			</>
		);
	}

	const details = (
		<div
			className={styles.container}
			style={results_type === 'rfq' ? { position: 'relative' } : {}}
		>
			<div className={styles.service_wrap}>
				{getByKey(SEARCH_TYPE_DETAILS_MAPPING, `[${data.search_type}].icon`)}

				<div className={cl`${styles.service_type_text} 
				${data.search_type === 'trailer_freight' ? styles.trailer_color : ''}`}
				>
					{SEARCH_TYPE_DETAILS_MAPPING[data?.search_type].label}
				</div>

				{data?.inco_term ? <div className={styles.pill}>{data?.inco_term}</div> : null}
			</div>

			<LocationDetails data={data} />

			<div className={styles.freight_details_div}>
				<Tooltip
					placement="bottom"
					interactive
					content={<CargoDate type="tool_tip" />}
				>
					<div>
						<CargoDate />
					</div>
				</Tooltip>
			</div>

			{service_type === 'rail_domestic_freight' && (
				<div className={styles.freight_details_div}>
					<Tooltip
						placement="bottom"
						interactive
						content={<ShipmentType type="tool_tip" />}
					>
						<div>
							<ShipmentType />
						</div>
					</Tooltip>
				</div>
			)}

			<div className={styles.flex_row}>
				<ContainerDetails
					data={data}
					service_type={service_type}
					service_details={service_details}
				/>

				{results_type === 'rfq' ? (
					<div style={{ display: 'flex' }}>
						<div className={styles.line} />

						<div className={styles.rates_count}>
							<div style={{ color: '#828282', fontSize: '16px' }}>
								Rates Available
							</div>
							<div className={styles.count}>{(rates || []).length}</div>
						</div>
					</div>
				) : null}

				{!NON_STANDALONE_SERVICES.includes(data?.search_type)
				&& !query?.shipment_id
				&& results_type !== 'rfq' ? (
					<div
						role="presentation"
						className={styles.btn_container}
						onClick={() => {
							if (scope === 'app') {
								trackEvent(APP_EVENT.search_clicked_on_edit_search, {});
							}
							setEditSearch(true);
						}}
					>
						<div className={styles.button_border}>
							{/* <EditButton /> */}
							<IcMEdit className={styles.edit_icon} />
						</div>
					</div>
					) : null}
			</div>
		</div>
	);

	const handleAddServiceClick = () => {
		setOpen(true);
	};

	return (
		<>
			<div
				className={`${styles.info_wrapper} ${editSearch ? 'edit' : ''}`}
				style={results_type === 'rfq' ? { marginBottom: '0px' } : {}}
			>
				<div className={styles.animated_container}>
					{!editSearch ? details : searchForm}
				</div>
			</div>

			{results_type !== 'rfq' ? (
				<div className={styles.button_wrap}>
					<Button type="button" onClick={handleAddServiceClick}>
						Add Services
					</Button>
				</div>
			) : null}

			{open ? (
				<Modal show={open} onClose={() => setOpen(false)} width={330}>
					<AdditionalServices
						data={data}
						refetch={refetch}
						possible_additional_services={possible_additional_services}
					/>
				</Modal>
			) : null}
		</>
	);
}

export default TrailerFreightInfo;
