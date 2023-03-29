import React from 'react';

import styles from './styles.module.css';

function HaulageText({
	details,
	isOriginHaulageRates,
	isDestinationHaulageRates,
}) {
	const originIcd =		details?.trade_type === 'export'
		? details?.origin_port?.is_icd || details?.port?.is_icd
		: details?.origin_port?.is_icd;
	const destinationIcd =		details?.trade_type === 'import'
		? details?.destination_port?.is_icd || details?.port?.is_icd
		: details?.destination_port?.is_icd;
	if (!originIcd && !destinationIcd) {
		return null;
	}

	const isHaulageAdded = details?.services.includes('haulage_freight');

	let text = '';

	if (isOriginHaulageRates || isDestinationHaulageRates) {
		if (isOriginHaulageRates) {
			text = (
				<>
					Rate shown
					{' '}
					<span className="bold">includes Haulage</span>
					{' '}
					between
					{' '}
					<span className="bold">ICD --&gt; Seaport at origin</span>
				</>
			);
		}
		if (isDestinationHaulageRates) {
			text = (
				<>
					Rate shown
					{' '}
					<span className="bold">includes Haulage</span>
					{' '}
					between
					{' '}
					<span className="bold">Seaport --&gt; ICD at destination</span>
				</>
			);
		}
		if (!isOriginHaulageRates && isDestinationHaulageRates) {
			text = (
				<>
					Rate shown
					{' '}
					<span className="bold">includes Haulage</span>
					{' '}
					between
					{' '}
					<span className="bold">ICD --&gt; Seaport at origin</span>
					{' '}
					&
					{' '}
					<span className="bold">Seaport --&gt; ICD at destination</span>
				</>
			);
		}
	}
	if (!isOriginHaulageRates && !isDestinationHaulageRates) {
		text = (
			<>
				Rate shown
				{' '}
				<span className="bold">includes only ocean freight</span>
				{' '}
				between seaports. Rate for Haulage between Seaport and ICD is
				unavailable
			</>
		);
	}
	if (!isHaulageAdded) {
		text = (
			<>
				Rate shown
				{' '}
				<span className="bold">includes only ocean freight</span>
				{' '}
				between seaports, does not include Haulage between Seaport and ICD
			</>
		);
	}

	return (
		<div className={styles.haulage_service_div}>
			<div className={styles.haulage_service}>{text}</div>
		</div>
	);
}

export default HaulageText;
