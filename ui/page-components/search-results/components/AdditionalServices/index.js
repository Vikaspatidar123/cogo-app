import { Modal, Button, Select, Input, cl } from '@cogoport/components';
import { IcCTick, IcMPlus } from '@cogoport/icons-react';
import { startCase, isEmpty } from '@cogoport/utils';
import React, { useState } from 'react';

import useCreateAdditionalService from '../../hooks/useCreateAdditionalService';

import CargoInsurancePillContainer from './CargoInsurancePillContainer';
import DeleteConfirmation from './DeleteConfirmation';
import Forms from './Forms';
import {
	nonRemovableServices,
	nonRemovableServicesAir,
	serviceMappings,
} from './mappings';
import renderServices from './renderServices';
import { getServiceName } from './services';
import styles from './styles.module.css';

import { getCountryCode } from '@/ui/commons/utils/getCountryDetails';

function AdditionalServices({
	data = {},
	possible_additional_services = [],
	refetch = () => {},
	allowCargoInsurance = true,
	setOpenAddServiceModal = () => {},
	setShowCargoInsuranceIP = () => {},
	// view = '',
}) {
	// const className = view === 'checkout' ? '' : 'search';
	const {
		origin_country_id = '',
		destination_country_id = '',
		trade_type = '',
		user_id = '',
		checkout_id = '',
		spot_search_id = '',
		importer_exporter_id = '',
		importer_exporter = {},
	} = data || {};
	const [subsidiaryService, setSubsidiaryService] = useState('');
	const importer_exporter_country_code = getCountryCode({
		country_id:
            importer_exporter?.country_id || importer_exporter?.country?.id,
	});
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
			data?.service_type !== 'air_freight'
            && data?.service_type !== 'ftl_freight'
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
				onClick={() => {
					setShow(true);
					setDeleteService(service);
				}}
				disabled={loading}
				size="xs"
				themeType="accent"
				style={{
					border     : 'none',
					padding    : '0px',
					fontSize   : '30px',
					display    : 'flex',
					alignItems : 'center',
					height     : '20px',
				}}
				className={styles.cancel}
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
		<div className={cl`${styles.container} ${styles.className}`}>
			<div className={styles.services_wrap}>
				<div className={styles.text}>Additional services</div>
				<div style={{ maxHeight: '200px', overflow: 'auto' }}>
					{(uniq_services_list || []).map((service) => (
						<div className={styles.pill}>
							<div
								style={{
									display    : 'flex',
									maxWidth   : '94%',
									alignItems : 'center',
								}}
							>
								<div className={styles.active_service}>
									<img
										src="https://cdn.cogoport.io/cms-prod/cogo_admin/vault/original/Hangar.svg"
										alt="hangar"
										style={{ width: 14, height: 14 }}
									/>
								</div>
								<div className={styles.services}>
									{handleServiceName(service)}
								</div>
								<IcCTick
									style={{
										marginTop : '2px',
										width     : 20,
										height    : 20,
									}}
								/>
							</div>

							{handleServiceDelete(service)}
						</div>
					))}
				</div>

				{(remainingServicesToAdd || []).length > 0
                && data?.source !== 'upsell' ? (
	<>
		<div
			className={styles.line}
			style={{ margin: '8px 0px' }}
		/>
		<div style={{ marginBottom: 10 }}>Add more</div>

		<div
			style={{
				overflow  : 'auto',
				maxHeight : '350px',
			}}
		>
			<Input
				type="text"
				placeholder="Search...."
				onChange={(e) => handleSearch(e)}
				name="service"
				value={query}
			/>
			<div className={styles.add_service}>
				{(remainingServicesToAdd || []).map(
					(service) => (
						<div
							role="presentation"
							className={cl`${styles.pills} ${styles.inactive}`}
							onClick={() => handleAdd(service)}
							id={`search_results_additional_service_${service}`}
						>
							<div
								style={{
									maxWidth : '90%',
									display  : 'flex',
								}}
							>
								<img
									src="https://cdn.cogoport.io/cms-prod/cogo_admin/vault/original/Hangar.svg"
									alt="hangar"
									style={{
										width  : 14,
										height : 14,
									}}
								/>
								<div
									className={styles.services}
								>
									{detail?.[service]?.title}
								</div>
							</div>

							<IcMPlus
								className={styles.services_icon}
							/>
						</div>
					),
				)}
			</div>
		</div>
	</>
					) : null}

				<div className={styles.line} />
				<div>Subsidiary services</div>
				<Select
					name="subsidiary_service"
					onChange={(v) => setSubsidiaryService(v)}
					placeholder="Select..."
					value={subsidiaryService}
					options={subsidiaryServicesList}
					style={{ wadd_serviceidth: '250px' }}
				/>
				<div className={styles.add_button}>
					<Button
						onClick={handleSubsidiaryService}
						disabled={loading || isEmpty(subsidiaryService)}
						size="sm"
						themeType="accent"
						id="search_results_subsidiary_service_add"
					>
						{loading ? 'Adding...' : 'Add'}
					</Button>
				</div>
				<CargoInsurancePillContainer
					uniq_services_list={uniq_services_list}
					importer_exporter_country_code={importer_exporter_country_code}
					search_type={search_type}
					addCargoInsurance={addCargoInsurance}
					setAddCargoInsurance={setAddCargoInsurance}
					allowCargoInsurance={allowCargoInsurance}
					data={data}
					refetch={refetch}
					origin_country_id={origin_country_id}
					destination_country_id={destination_country_id}
					trade_type={trade_type}
					user_id={user_id}
					service_type={service_type}
					checkout_id={checkout_id}
					spot_search_id={spot_search_id}
					importer_exporter_id={importer_exporter_id || importer_exporter?.id}
					importer_exporter={importer_exporter}
					setOpenAddServiceModal={setOpenAddServiceModal}
					setShowCargoInsuranceIP={setShowCargoInsuranceIP}
				/>
			</div>

			{addService ? (
				<Modal
					show={!!addService}
					onClose={() => handleClose()}
					placement="top-right"
					size="sm"
					scroll={false}
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
					placement="top-right"
					size="sm"
				>
					<Modal.Body>
						<DeleteConfirmation
							deleteService={deleteService}
							setShow={setShow}
							setDeleteService={setDeleteService}
							loading={loading}
							setLoading={setLoading}
							servicesList={servicesList}
							data={data}
							refetch={refetch}
						/>
					</Modal.Body>
				</Modal>
			) : null}
		</div>
	);
}

export default AdditionalServices;
