import React, { useState, useEffect } from 'react';
import { useSelector } from '@cogo/store';
import { Button, Modal, ToolTip } from '@cogoport/front/components/admin';
import SearchForm from '@cogo/app-search/common/SearchForm';
import formatMainServiceData from '@cogo/app-search/utils/format-main-service-data';
import { APP_EVENT, trackEvent } from '@cogo/commons/analytics';
import { get, startCase } from '@cogoport/front/utils';
import { IcCFhaulage, IcMFtrailorFull } from '@cogoport/icons-react';
import formatDate from '@cogo/globalization/utils/formatDate';
import GLOBAL_CONSTANTS from '@cogo/globalization/constants/globals.json';
import LocationDetails from './LocationDetails';
import AdditionalServices from '../../AdditionalServices';
import Loading from '../loading';
import ContainerDetails from './ContainerDetails';
import {
	Container,
	Pill,
	Line,
	ButtonWrap,
	ServiceWrap,
	FlexRow,
	StyledButton,
	AnimatedContainer,
	InfoWrapper,
	EditContainer,
	RatesCount,
	Count,
	FreightDetailsDiv,
	ServiceTypeText,
	FreightDetailsText,
	FreightDetails,
	EditButton,
	ButtonBorder,
	CancelButton,
} from './styles';

const NON_STANDALONE_SERVICES = ['fcl_cfs'];

const SEARCH_TYPE_DETAILS_MAPPING = {
	trailer_freight: {
		icon: <IcMFtrailorFull color="#8fbdb1" />,
		label: 'Trailer',
	},
	rail_domestic_freight: {
		icon: <IcCFhaulage />,
		label: 'Rail',
	},
};

const TrailerFreightInfo = ({
	data = {},
	setOpen = () => {},
	open = false,
	isMobile = false,
	loading = false,
	importer_exporter_details = {},
	setShowEdit = () => {},
	searchData = {},
	refetch = () => {},
	results_type = '',
	rates = [],
	possible_additional_services = [],
}) => {
	const { scope, query } = useSelector(({ general }) => general);

	const [editSearch, setEditSearch] = useState(false);

	const { service_type } = data || {};

	const { detail = {} } = searchData || {};
	const {
		service_details = {},
		cargo_readiness_date = '',
		container_load_type = '',
	} = detail || {};

	useEffect(() => {
		setShowEdit(editSearch);
	}, [editSearch]);

	if (loading) {
		return <Loading isMobile={isMobile} scope={scope} />;
	}

	const searchForm = (
		<EditContainer className={scope === 'app' ? 'app' : ''}>
			<SearchForm
				mode={data.search_type}
				onPush={() => setEditSearch(false)}
				serviceDetails={data?.service_details}
				extraParams={{
					importer_exporter_id: importer_exporter_details.id,
					importer_exporter_name: importer_exporter_details.name,
					importer_exporter_branch_id: importer_exporter_details?.branch_id,
					user_id: importer_exporter_details?.user_id,
				}}
				data={formatMainServiceData(
					data?.search_type,
					Object.values(data?.service_details || {}),
				)}
				isEdit
				searchData={searchData}
				className="small result"
			/>

			<CancelButton
				service_type={service_type}
				type="button"
				onClick={() => setEditSearch(false)}
			>
				X
			</CancelButton>
		</EditContainer>
	);

	const CargoDate = ({ type = '' }) => {
		return (
			<>
				<FreightDetailsText type={type}>Cargo Ready Date</FreightDetailsText>
				<FreightDetails>
					{formatDate({
						date: cargo_readiness_date,
						dateFormat: GLOBAL_CONSTANTS.formats.date['dd MMM yyyy'],
						formatType: 'date',
					})}
				</FreightDetails>
			</>
		);
	};

	const ShipmentType = ({ type = '' }) => {
		return (
			<>
				<FreightDetailsText type={type}>Type of Shipment </FreightDetailsText>
				<FreightDetails>{startCase(container_load_type)}</FreightDetails>
			</>
		);
	};

	const details = (
		<Container
			className={scope === 'app' ? 'app' : ''}
			style={results_type === 'rfq' ? { position: 'relative' } : {}}
		>
			<ServiceWrap>
				{get(SEARCH_TYPE_DETAILS_MAPPING, `[${data.search_type}].icon`)}

				<ServiceTypeText search_type={data.search_type}>
					{SEARCH_TYPE_DETAILS_MAPPING[data?.search_type].label}
				</ServiceTypeText>

				{data?.inco_term ? <Pill>{data?.inco_term}</Pill> : null}
			</ServiceWrap>

			<LocationDetails data={data} />

			<FreightDetailsDiv>
				<ToolTip
					theme="light"
					animation="shift-away"
					interactive
					content={<CargoDate type="tool_tip" />}
				>
					<div>
						<CargoDate />
					</div>
				</ToolTip>
			</FreightDetailsDiv>

			{service_type === 'rail_domestic_freight' && (
				<FreightDetailsDiv>
					<ToolTip
						theme="light"
						interactive
						animation="shift-away"
						content={<ShipmentType type="tool_tip" />}
					>
						<div>
							<ShipmentType />
						</div>
					</ToolTip>
				</FreightDetailsDiv>
			)}

			<FlexRow>
				<ContainerDetails
					data={data}
					service_type={service_type}
					service_details={service_details}
				/>

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

				{!NON_STANDALONE_SERVICES.includes(data?.search_type) &&
				!query?.shipment_id &&
				results_type !== 'rfq' ? (
					<StyledButton
						onClick={() => {
							if (scope === 'app') {
								trackEvent(APP_EVENT.search_clicked_on_edit_search, {});
							}
							setEditSearch(true);
						}}
					>
						<ButtonBorder>
							<EditButton />
						</ButtonBorder>
					</StyledButton>
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
					<Button type="button" onClick={handleAddServiceClick}>
						Add Services
					</Button>
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
};

export default TrailerFreightInfo;
