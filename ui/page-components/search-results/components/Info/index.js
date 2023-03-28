import SearchForm from '@cogo/app-search/common/SearchForm';
import formatMainServiceData from '@cogo/app-search/utils/format-main-service-data';
import { Button, Modal } from '@cogoport/components';
import React, { useState, useEffect } from 'react';

import AdditionalServices from '../AdditionalServices';

import ContainerDetails from './ContainerDetails';
import Mapping from './icons-services-mapping';
import Loading from './loading';
import LocationDetails from './LocationDetails';
import styles from './styles.module.css';

import { useSelector } from '@/packages/store';
import { APP_EVENT, trackEvent } from '@/ui/page-components/discover_rates/common/analytics';

const NON_STANDALONE_SEERVICES = ['fcl_cfs'];

function Info({
	data = {},
	detail = {},
	setOpen = () => {},
	open = false,
	isMobile = false,
	loading = false,
	importer_exporter_details = {},
	setShowEdit = () => {},
	refetch = () => {},
	results_type = '',
	rates = [],
	possible_additional_services = [],
}) {
	const { scope, query } = useSelector(({ general }) => general);

	const [editSearch, setEditSearch] = useState(false);

	const service_icon_mapping = Mapping[data?.search_type];

	useEffect(() => {
		setShowEdit(editSearch);
	}, [editSearch]);

	if (loading) {
		return <Loading isMobile={isMobile} scope={scope} />;
	}

	const paddingXButton = data?.search_type === 'air_freight' ? 10 : 4;

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
					marginBottom : isMobile ? 0 : paddingXButton,
					background   : 'white',
					color        : 'black',
					fontSize     : 18,
					padding      : '6px 10px',
					height       : 36,
					marginLeft   : 8,
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
					<Button
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
					</Button>
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

			{open && isMobile ? (
				<Modal show={open} onClose={() => setOpen(false)} width={330}>
					<AdditionalServices
						data={data}
						isMobile={isMobile}
						refetch={refetch}
						possible_additional_services={possible_additional_services}
					/>
				</Modal>
			) : null}
		</>
	);
}

export default Info;
