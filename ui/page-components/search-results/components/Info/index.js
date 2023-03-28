import SearchForm from '@cogo/app-search/common/SearchForm';
import formatMainServiceData from '@cogo/app-search/utils/format-main-service-data';
import { APP_EVENT, trackEvent } from '@cogo/commons/analytics';
import { useSelector } from '@cogo/store';
import { Button, Modal } from '@cogoport/front/components';
import React, { useState, useEffect } from 'react';

import AdditionalServices from '../AdditionalServices';

import ContainerDetails from './ContainerDetails';
import Mapping from './icons-services-mapping';
import Loading from './loading';
import LocationDetails from './LocationDetails';
import {
	Container,
	Text,
	Pill,
	Line,
	ButtonWrap,
	ServiceWrap,
	FlexRow,
	ButtonStyled,
	AnimatedContainer,
	InfoWrapper,
	EditContainer,
	RatesCount,
	Count,
} from './styles';

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
		<EditContainer className={scope === 'app' ? 'app' : ''}>
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
		</EditContainer>
	);

	const details = (
		<Container
			className={scope === 'app' ? 'app' : ''}
			style={results_type === 'rfq' ? { position: 'relative' } : {}}
		>
			<ServiceWrap>
				<Text>{service_icon_mapping?.tag}</Text>
				{data?.inco_term ? <Pill>{data?.inco_term}</Pill> : null}
			</ServiceWrap>
			<Line style={isMobile ? { marginBottom: '10px' } : {}} />

			<LocationDetails data={data} />
			<Line style={isMobile ? { marginTop: '10px' } : {}} />

			<FlexRow>
				<ContainerDetails data={data} />

				{results_type === 'rfq' ? (
					<div style={{ display: 'flex' }}>
						{!isMobile ? <Line /> : <Line className="mobile" />}

						<RatesCount>
							<div style={{ color: '#828282', fontSize: '16px' }}>
								Rates Available
							</div>
							<Count>{(rates || []).length}</Count>
						</RatesCount>
					</div>
				) : null}

				{!NON_STANDALONE_SEERVICES.includes(data?.search_type)
				&& !query?.shipment_id
				&& results_type !== 'rfq' ? (
					<ButtonStyled
						onClick={() => {
							if (scope === 'app') {
								trackEvent(APP_EVENT.search_clicked_on_edit_search, {});
							}
							setEditSearch(true);
						}}
						className={`${isMobile && 'mobile-view'}`}
					>
						<img
							src="https://cdn.cogoport.io/cms-prod/cogo_admin/vault/original/edit-button.svg"
							alt="edit"
							style={{ width: '3em', height: '3em', margin: 'auto' }}
						/>
					</ButtonStyled>
					) : null}
			</FlexRow>
		</Container>
	);

	const handleAddServiceClick = () => {
		setOpen(true);
	};

	return (
		<>
			<InfoWrapper
				className={editSearch ? 'edit' : ''}
				style={results_type === 'rfq' ? { marginBottom: '0px' } : {}}
			>
				<AnimatedContainer>
					{!editSearch ? details : searchForm}
				</AnimatedContainer>
			</InfoWrapper>

			{results_type !== 'rfq' ? (
				<ButtonWrap>
					<Button onClick={handleAddServiceClick}>Add Services</Button>
				</ButtonWrap>
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
