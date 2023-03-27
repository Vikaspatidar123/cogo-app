import React, { useState } from 'react';
import { useSelector } from '@cogo/store';
import { Flex, Modal, Button, Select, Input } from '@cogoport/front/components';
import startCase from '@cogo/utils/startCase';
import { IcCTick, IcACarriageInsurancePaidTo } from '@cogoport/icons-react';
import Forms from './Forms';
import { getServiceName } from './services';
import {
	nonRemovableServices,
	nonRemovableServicesAir,
	serviceMappings,
} from './mappings';
import DeleteConfirmation from './DeleteConfirmation';
import renderServices from './renderServices';
import useCreateAdditionalService from '../../hooks/useCreateAdditionalService';
import {
	Container,
	Text,
	ServicesWrap,
	Services,
	Pill,
	ServicesIcon,
	ActiveService,
	Line,
} from './styles';
import CargoInsurance from '../../commons/CargoInsurance';

function AdditionalServices({
	data = {},
	possible_additional_services = [],
	refetch = () => {},
	view = '',
}) {
	const { scope, isMobile } = useSelector(({ general }) => ({
		scope: general?.scope,
		isMobile: general?.isMobile,
	}));

	const {
		origin_country_id = '',
		destination_country_id = '',
		trade_type = '',
		user_id = '',
		checkout_id = '',
		spot_search_id = '',
		importer_exporter_id = '',
	} = data || {};

	const className = view === 'checkout' ? '' : 'search';
	const [subsidiaryService, setSubsidiaryService] = useState('');

	const {
		handleAdd,
		handleClose,
		handleSearch,
		handleSubsidiaryService,
		subsidiaryServicesList,
		remainingServicesToAdd,
		addService,
		query,
		loading,
		setLoading,
		deleteService,
		setDeleteService,
		show,
		setShow,
		uniq_services_list,
		detail,
		search_type,
		service_type,
		servicesList,
		addCargoInsurance,
		setAddCargoInsurance,
	} = useCreateAdditionalService({
		possible_additional_services,
		scope,
		renderServices,
		data,
		serviceMappings,
		getServiceName,
		refetch,
		subsidiaryService,
		setSubsidiaryService,
	});

	const handleServiceDelete = (service) => {
		const serviceName = service.split(':');

		if (
			data?.service_type !== 'air_freight' &&
			data?.service_type !== 'ftl_freight'
		) {
			if (
				(nonRemovableServices || []).includes(
					serviceName[1] ? serviceName[1] : serviceName[0],
				)
			) {
				return null;
			}

			if (data?.search_type === serviceName[1]) {
				return null;
			}
		} else {
			if ((nonRemovableServicesAir || []).includes(serviceName[0])) {
				return null;
			}

			if (data?.search_type === serviceName[0]) {
				return null;
			}
		}
		if (data?.service_type === 'air_freight_local') {
			return null;
		}

		return (
			<Button
				ghost
				onClick={() => {
					setShow(true);
					setDeleteService(service);
				}}
				disabled={loading}
				style={{
					border: 'none',
					padding: '0px',
					fontSize: '30px',
					display: 'flex',
					alignItems: 'center',
					height: '20px',
				}}
				id="search_results_additional_service_delete"
			>
				-
			</Button>
		);
	};

	const handleServiceName = (service) => {
		const splitName = service.split(':');
		if (splitName[2]) {
			return `${startCase(splitName[0])} ${splitName[1]} (${startCase(
				splitName[2],
			)})`;
		}
		return startCase(service);
	};

	return (
		<Container className={scope === 'app' ? 'app' : className}>
			<ServicesWrap scope={scope}>
				<Text>Additional services</Text>
				<div style={{ maxHeight: '200px', overflow: 'auto' }}>
					{(uniq_services_list || []).map((service) => (
						<Pill>
							<Flex style={{ maxWidth: '90%', alignItems: 'center' }}>
								<ActiveService>
									<img
										src="https://cdn.cogoport.io/cms-prod/cogo_admin/vault/original/Hangar.svg"
										alt="hangar"
										style={{ width: 14, height: 14 }}
									/>
								</ActiveService>
								<Services>{handleServiceName(service)}</Services>
								<IcCTick style={{ marginTop: '2px', width: 20, height: 20 }} />
							</Flex>

							{handleServiceDelete(service)}
						</Pill>
					))}
				</div>

				{(remainingServicesToAdd || []).length > 0 &&
				data?.source !== 'upsell' ? (
					<>
						<Line style={{ margin: '8px 0px' }} />
						<Text style={{ marginBottom: 10 }}>Add more</Text>

						<div
							style={{
								overflow: 'auto',
								maxHeight: '350px',
								padding: isMobile ? '0px 4px' : '',
							}}
						>
							<Input
								type="text"
								placeholder="Search...."
								onChange={(e) => handleSearch(e.target.value)}
								name="service"
								value={query}
							/>

							{(remainingServicesToAdd || []).map((service) => (
								<Pill
									className="inactive"
									onClick={() => handleAdd(service)}
									id={`search_results_additional_service_${service}`}
								>
									<Flex style={{ maxWidth: '90%' }}>
										<img
											src="https://cdn.cogoport.io/cms-prod/cogo_admin/vault/original/Hangar.svg"
											alt="hangar"
											style={{ width: 14, height: 14 }}
										/>
										<Services>{detail?.[service]?.title}</Services>
									</Flex>

									<ServicesIcon className="add"> + </ServicesIcon>
								</Pill>
							))}
						</div>
					</>
				) : null}

				<Line />
				<Text>Subsidiary services</Text>
				<Select
					name="subsidiary_service"
					onChange={(v) => setSubsidiaryService(v)}
					placeholder="Select..."
					value={subsidiaryService}
					options={subsidiaryServicesList}
				/>

				<Button
					style={{ marginTop: '10px' }}
					onClick={handleSubsidiaryService}
					disabled={loading}
					id="search_results_subsidiary_service_add"
				>
					{loading ? 'Adding...' : 'Add'}
				</Button>

				{!uniq_services_list.includes('cargo_insurance') &&
				[
					'fcl_freight',
					'lcl_freight',
					'air_freight',
					'ftl_freight',
					'ltl_freight',
					'air_domestic',
				].includes(search_type) ? (
					<>
						<Line style={{ marginTop: '8px' }} />

						<Text style={{ marginBottom: '8px' }}>Cargo Insurance</Text>

						<Pill
							className="inactive"
							onClick={() => setAddCargoInsurance(true)}
							id="search_results_additional_service_cargo_insurance"
						>
							<Flex style={{ maxWidth: '90%' }}>
								<IcACarriageInsurancePaidTo />
								<Services>Cargo Insurance</Services>
							</Flex>

							<ServicesIcon className="add"> + </ServicesIcon>
						</Pill>
					</>
				) : null}
			</ServicesWrap>

			{addService ? (
				<Modal
					show={!!addService}
					onClose={() => handleClose()}
					position="top-right"
					width={300}
				>
					<Forms
						onClose={() => handleClose()}
						addService={addService}
						data={data}
						search_type={search_type || service_type}
						services={servicesList}
						refetch={refetch}
						detail={detail}
					/>
				</Modal>
			) : null}

			{show ? (
				<Modal
					show={show}
					onClose={() => setShow(false)}
					position="top-right"
					width={330}
				>
					<DeleteConfirmation
						deleteService={deleteService}
						setShow={setShow}
						setDeleteService={setDeleteService}
						loading={loading}
						setLoading={setLoading}
						servicesList={servicesList}
						data={data}
						refetch={refetch}
						scope={scope}
					/>
				</Modal>
			) : null}

			{addCargoInsurance ? (
				<Modal
					show={addCargoInsurance}
					onClose={() => setAddCargoInsurance(false)}
					position="top-right"
					width={350}
				>
					<CargoInsurance
						setAddCargoInsurance={setAddCargoInsurance}
						data={data}
						refetch={refetch}
						origin_country_id={origin_country_id}
						destination_country_id={destination_country_id}
						trade_type={trade_type}
						user_id={user_id}
						service_type={service_type}
						checkout_id={checkout_id}
						spot_search_id={spot_search_id}
						importer_exporter_id={importer_exporter_id}
					/>
				</Modal>
			) : null}
		</Container>
	);
}

export default AdditionalServices;
