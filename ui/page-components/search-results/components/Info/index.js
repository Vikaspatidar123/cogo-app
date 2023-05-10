import { Button, Modal } from '@cogoport/components';
import React, { useState } from 'react';

import formatMainServiceData from '../../utils/format-main-service-data';
import AdditionalServices from '../AdditionalServices';

import ContainerDetails from './ContainerDetails';
import Mapping from './icons-services-mapping';
import Loading from './loading';
import LocationDetails from './LocationDetails';
import styles from './styles.module.css';

import { useSelector } from '@/packages/store';
import { APP_EVENT, trackEvent } from '@/ui/page-components/discover_rates/common/analytics';
import SearchForm from '@/ui/page-components/discover_rates/common/SearchForm';

const NON_STANDALONE_SEERVICES = ['fcl_cfs'];

function Info({
	data = {},
	detail = {},
	setOpen = () => {},
	open = false,
	loading = false,
	importer_exporter_details = {},
	refetch = () => {},
	results_type = '',
	rates = [],
	possible_additional_services = [],
}) {
	const { query } = useSelector(({ general }) => general);

	const [editSearch, setEditSearch] = useState(false);

	const service_icon_mapping = Mapping[data?.search_type];

	if (loading) {
		return <Loading />;
	}

	const paddingXButton = data?.search_type === 'air_freight' ? 10 : 14;

	const searchForm = (
		<div className={styles.edit_container}>
			<SearchForm
				serviceDetails={data?.service_details}
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
				className="small result"
				detail={detail}
			/>

			<Button
				style={{
					marginBottom: paddingXButton,
				}}
				className={styles.cancel}
				themeType="secondary"
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
				<div className={styles.text}>{service_icon_mapping?.tag}</div>
				{data?.inco_term ? <div className={styles.pill}>{data?.inco_term}</div> : null}
			</div>

			<div className={styles.line} />
			<LocationDetails data={data} />
			<div className={styles.line} />
			<div className={styles.flex_row}>
				<ContainerDetails data={data} />

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

				{!NON_STANDALONE_SEERVICES.includes(data?.search_type)
				&& !query?.shipment_id
				&& results_type !== 'rfq' ? (
					<div
						className={styles.button_styled}
						role="presentation"
						onClick={() => {
							trackEvent(APP_EVENT.search_clicked_on_edit_search, {});

							setEditSearch(true);
						}}
					>
						<img
							src="https://cdn.cogoport.io/cms-prod/cogo_admin/vault/original/edit-button.svg"
							alt="edit"
							style={{ width: '3em', height: '3em', margin: 'auto' }}
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

			{open ? (
				<Modal show={open} onClose={() => setOpen(false)}>
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

export default Info;
