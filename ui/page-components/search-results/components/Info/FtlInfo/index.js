import { Modal, Button } from '@cogoport/components';
import { IcMFtrailorFull } from '@cogoport/icons-react';
import React, { useState } from 'react';

import AdditionalServices from '../../AdditionalServices';
import Loading from '../loading';
import LocationDetails from '../LocationDetails';

import ContainerDetails from './ContainerDetails';
import styles from './styles.module.css';

import TruckingTouchPoints from '@/packages/forms/Business/TruckingTouchPoints';
import { useSelector } from '@/packages/store';
import GLOBAL_CONSTANTS from '@/ui/commons/constants/globals';
import formatDate from '@/ui/commons/utils/formatDate';
import { APP_EVENT, trackEvent } from '@/ui/page-components/discover_rates/common/analytics';
import SearchForm from '@/ui/page-components/discover_rates/common/SearchForm';
import formatMainServiceData from '@/ui/page-components/discover_rates/utils/format-main-service-data';

const SEARCH_TYPE_MAPPING = {
	ftl_freight : 'FTL',
	ltl_freight : 'LTL',
};

const NON_STANDALONE_SEERVICES = ['fcl_cfs'];

function FtlInfo({
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
	const { query } = useSelector(({ general }) => general);
	const { touch_points = {} } = searchData || {};
	const { primary_service = {} } = touch_points || {};
	const { enroute = [] } = primary_service || {};

	const [editSearch, setEditSearch] = useState(false);

	const { detail = {} } = searchData || {};

	if (loading) {
		return <Loading />;
	}

	const searchForm = (
		<div className={styles.edit_container}>
			<SearchForm
				mode={data.search_type}
				onPush={() => setEditSearch(false)}
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
				style={{
					background : 'white',
					color      : 'black',
					fontSize   : 18,
					padding    : 10,
					height     : 34,
					marginLeft : 8,
					display    : 'flex',
					alignItems : 'center',
				}}
				onClick={() => setEditSearch(false)}
			>
				X
			</Button>
		</div>
	);

	const details = (
		<div
			className={styles.container}
			style={results_type === 'rfq' ? { position: 'relative' } : {}}
		>
			<div className={styles.service_wrap}>
				<IcMFtrailorFull color="#81C0AF" width={42} height={42} />

				<div className={styles.service_type_text}>
					{SEARCH_TYPE_MAPPING[data.search_type]}
				</div>

				{data?.inco_term ? <div className={styles.pill}>{data?.inco_term}</div> : null}
			</div>

			<LocationDetails data={data} />

			{data?.search_type === 'ftl_freight' && enroute.length ? (
				<>
					<div className={styles.line} />
					<TruckingTouchPoints touchPoints={enroute} />
				</>
			) : null}

			<div className={styles.line} />
			<div className={styles.date}>
				<div>
					(
					{formatDate({
						date       : detail.cargo_readiness_date,
						dateFormat : GLOBAL_CONSTANTS.formats.date['dd MMM yyyy'],
						formatType : 'date',
					})}
					)
				</div>
			</div>

			<div className={styles.flex_row}>
				<ContainerDetails searchData={searchData} data={data} />
				{results_type === 'rfq' ? (
					<div style={{ display: 'flex' }}>
						<div className={styles.Line} />

						<div className={styles.rates_count}>
							<div style={{ color: '#828282', fontSize: '16px' }}>
								Rates Available
							</div>
							<div className={styles.count}>{(rates || []).length}</div>
						</div>
					</div>
				) : null}

				{!NON_STANDALONE_SEERVICES.includes(data?.search_type)
				&& !query?.shipment_id
				&& results_type !== 'rfq' ? (
					<div
						role="presentation"
						className={styles.btn_container}
						onClick={() => {
							trackEvent(APP_EVENT.search_clicked_on_edit_search, {});

							setEditSearch(true);
						}}
					>
						<img
							src="https://cdn.cogoport.io/cms-prod/cogo_admin/vault/original/edit-button.svg"
							alt="edit"
							style={{ width: '2em', height: '2em', margin: 'auto' }}
						/>
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
					<Button onClick={handleAddServiceClick}>Add Services</Button>
				</div>
			) : null}

			{open && (
				<Modal show={open} onClose={() => setOpen(false)} width={330}>
					<AdditionalServices
						data={data}
						refetch={refetch}
						possible_additional_services={possible_additional_services}
					/>
				</Modal>
			)}
		</>
	);
}

export default FtlInfo;
