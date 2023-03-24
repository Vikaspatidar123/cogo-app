import { Modal } from '@cogoport/components';
import { useState } from 'react';

import useAddService from '../../hooks/useAddService';
import useRemoveService from '../../hooks/useRemoveService';
import ServiceIcon from '../ServiceIcon';

import AnimatedCheckbox from './AnimatedCheckbox';
import PromoCodeIcon from './PromoCodeIcon';
import ServiceForm from './ServiceForm';
import styles from './styles.module.css';

function SearchResultsServiceItem({
	service,
	summary,
	refetchResults,
	source = 'checkout',
	promoData = [],
}) {
	const [totalLoading, setTotalLoading] = useState(false);
	const [show, setShow] = useState(false);

	let isSelectDisabled =		service.service_type === summary.search_type
		|| service.service_type === summary?.primary_service;

	const tempServiceNames = [];
	if (
		summary.search_type === 'air_freight'
		|| summary?.primary_service === 'air_freight'
	) {
		if (summary?.service_details) {
			(Object.values(summary?.service_details || {}) || []).forEach(
				(element) => {
					let name = '';
					if (element?.terminal_charge_type === 'outbound') {
						name = 'export';
					} else if (element?.terminal_charge_type === 'inbound') {
						name = 'import';
					}
					tempServiceNames.push(`${name}_${element.service_type}`);
				},
			);
		} else if (summary?.services) {
			(Object.values(summary?.services || {}) || []).forEach((element) => {
				let name = '';
				if (element?.terminal_charge_type === 'outbound') {
					name = 'export';
				} else if (element?.terminal_charge_type === 'inbound') {
					name = 'import';
				}
				if (element?.terminal_charge_type) {
					tempServiceNames.push(`${name}_${element.service_type}`);
				}
			});
		}
	}

	if (tempServiceNames.includes(service.name)) {
		isSelectDisabled = true;
	}

	const { handleRemoveService } = useRemoveService(service, source);

	const { handleAddService } = useAddService(service, summary, source);

	const filteredPromoData = promoData.filter(
		(item) => item.service_type === service.service_type,
	);

	const onClickService = async (value) => {
		if (isSelectDisabled) {
			return;
		}
		setTotalLoading(true);
		try {
			if (value) {
				if (service.controls?.length > 0) {
					setShow(true);
				} else {
					await handleAddService();
					await refetchResults();
				}
			} else {
				await handleRemoveService();
				await refetchResults();
			}
			setTotalLoading(false);
		} catch {
			setTotalLoading(false);
		}
	};

	const handleClose = () => {
		setShow(false);
	};

	return (
		<div className={styles.container}>
			<div className={styles.main}>
				<AnimatedCheckbox
					className="primary lg"
					checked={service.isSelected}
					disabled={isSelectDisabled}
					loading={totalLoading}
					onChange={onClickService}
				/>

				<ServiceIcon service={service.service_type} />

				<div
					className={styles.title}
					role="presentation"
					onClick={() => onClickService((prevState) => !prevState)}
					disabled={isSelectDisabled}
				>
					{service.title}
				</div>
			</div>

			<Modal position="top-left" show={show} onClose={handleClose} width={300}>
				<ServiceForm
					show={show}
					handleClose={setShow}
					service={service}
					summary={summary}
					refetchResults={refetchResults}
					setTotalLoading={setTotalLoading}
					source={source}
				/>
			</Modal>

			<PromoCodeIcon
				filteredPromoData={filteredPromoData}
				service={service}
				isSelectDisabled={isSelectDisabled}
			/>
		</div>
	);
}

export default SearchResultsServiceItem;
