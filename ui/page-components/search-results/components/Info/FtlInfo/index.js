import React, { useState, useEffect } from 'react';
import { useSelector } from '@cogo/store';
import { Button, Modal } from '@cogoport/front/components';
import SearchForm from '@cogo/app-search/common/SearchForm';
import formatMainServiceData from '@cogo/app-search/utils/format-main-service-data';
import { APP_EVENT, trackEvent } from '@cogo/commons/analytics';
import TruckingTouchPoints from '@cogo/business-modules/components/TruckingTouchPoints';
import formatDate from '@cogo/globalization/utils/formatDate';
import GLOBAL_CONSTANTS from '@cogo/globalization/constants/globals.json';
import { IcMFtrailorFull } from '@cogoport/icons-react';
import LocationDetails from '../LocationDetails';
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
	ButtonStyled,
	AnimatedContainer,
	InfoWrapper,
	EditContainer,
	RatesCount,
	Count,
	Date,
	ServiceTypeText,
} from './styles';

const SEARCH_TYPE_MAPPING = {
	ftl_freight: 'FTL',
	ltl_freight: 'LTL',
};

const NON_STANDALONE_SEERVICES = ['fcl_cfs'];

const FtlInfo = ({
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
	const { touch_points = {} } = searchData || {};
	const { primary_service = {} } = touch_points || {};
	const { enroute = [] } = primary_service || {};

	const [editSearch, setEditSearch] = useState(false);

	const { detail = {} } = searchData || {};

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

			<Button
				style={{
					background: 'white',
					color: 'black',
					fontSize: 18,
					padding: 10,
					height: 34,
					marginLeft: 8,
					display: 'Flex',
					alignItems: 'center',
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
				<IcMFtrailorFull color="#81C0AF" width={42} height={42} />

				<ServiceTypeText>
					{SEARCH_TYPE_MAPPING[data.search_type]}
				</ServiceTypeText>

				{data?.inco_term ? <Pill>{data?.inco_term}</Pill> : null}
			</ServiceWrap>

			<LocationDetails data={data} />

			{data?.search_type === 'ftl_freight' && enroute.length ? (
				<>
					{!isMobile ? <Line /> : <Line className="mobile" />}
					<TruckingTouchPoints touchPoints={enroute} />
				</>
			) : null}
			{!isMobile ? <Line /> : <Line className="mobile" />}
			<Date>
				<div>
					(
					{formatDate({
						date: detail.cargo_readiness_date,
						dateFormat: GLOBAL_CONSTANTS.formats.date['dd MMM yyyy'],
						formatType: 'date',
					})}
					)
				</div>
			</Date>

			<FlexRow>
				<ContainerDetails searchData={searchData} data={data} />
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

				{!NON_STANDALONE_SEERVICES.includes(data?.search_type) &&
				!query?.shipment_id &&
				results_type !== 'rfq' ? (
					<ButtonStyled
						onClick={() => {
							if (scope === 'app') {
								trackEvent(APP_EVENT.search_clicked_on_edit_search, {});
							}
							setEditSearch(true);
						}}
					>
						<img
							src="https://cdn.cogoport.io/cms-prod/cogo_admin/vault/original/edit-button.svg"
							alt="edit"
							style={{ width: '2em', height: '2em', margin: 'auto' }}
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
};

export default FtlInfo;
