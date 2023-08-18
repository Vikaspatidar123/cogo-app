import { Modal, Button } from '@cogoport/components';
import { IcMPortArrow } from '@cogoport/icons-react';
import { startCase, upperCase } from '@cogoport/utils';
import React from 'react';

import { getUnit, getServiceUnit } from '../../../../../utils/get-unit';

import styles from './styles.module.css';

import { useRouter } from '@/packages/next';
import GLOBAL_CONSTANTS from '@/ui/commons/constants/globals';
import formatDate from '@/ui/commons/utils/formatDate';

function PriceLockedModal({
	priceLocked,
	setPriceLocked,
	contractData,
	details,
}) {
	const {
		max_containers_count = 0,
		max_volume = 0,
		max_weight = 0,
		validity_start = '',
		validity_end = '',
		search_type,
	} = contractData || {};

	const {
		destination_port = {},
		origin_port = {},
		container_size = '',
		container_type = '',
		commodity = '',
		origin_country = {},
		destination_country = {},
		destination_airport = {},
		origin_airport = {},
		volume,
		weight,
		inco_term,
		trade_type,
	} = details || {};
	const { push } = useRouter();
	const redirectToContract = () => {
		push('/contract-management?activetab=pending_approval');
	};
	return (
		<Modal
			show={priceLocked}
			onClose={() => setPriceLocked(false)}
			onOuterClick={() => setPriceLocked(false)}
		>
			<Modal.Header title="Price locked requested" />
			<Modal.Body>
				<div className={styles.port_pair}>
					<div className={styles.port}>
						<div>
							{origin_port?.name || origin_airport?.name}
							<span>
								(
								{origin_port?.port_code
                                    || origin_airport?.port_code}
								)
								{' '}
							</span>
						</div>

						<div>{origin_country?.name}</div>
					</div>
					<IcMPortArrow />
					<div className={`${styles.port} ${styles.destination}`}>
						<div>
							{destination_port?.name
                                || destination_airport?.name}
							<span>
								(
								{destination_port?.port_code
                                    || destination_airport?.port_code}
								)
							</span>
						</div>
						<div>{destination_country?.name}</div>
					</div>
				</div>

				<div className={styles.detail}>
					Total
					{' '}
					{startCase(getUnit(search_type))}
					{' '}
					Requested :
					<span className="sub-content">
						{max_containers_count || max_volume || max_weight}
						{' '}
						{getServiceUnit(search_type)}
					</span>
				</div>
				<div className={styles.detail}>
					Contract Validity :
					<span className="sub-content">
						{formatDate({
							date       : validity_start,
							dateFormat : GLOBAL_CONSTANTS.formats.date['dd MMM'],
							formatType : 'date',
						})}
						{' '}
						to
						{' '}
						{formatDate({
							date       : validity_end,
							dateFormat : GLOBAL_CONSTANTS.formats.date['dd MMM'],
							formatType : 'date',
						})}
					</span>
				</div>
				{commodity && (
					<div className={styles.tag}>{startCase(commodity)}</div>
				)}
				{container_type && (
					<div className={styles.tag}>
						{startCase(container_type)}
					</div>
				)}
				{container_size && (
					<div className={styles.tag}>
						{container_size}
						FT
					</div>
				)}
				{volume && (
					<div className={styles.tag}>
						VOL:
						{volume}
						CBM
					</div>
				)}
				{weight && (
					<div className={styles.tag}>
						WT:
						{weight}
						KGS
					</div>
				)}
				{inco_term && (
					<div className={styles.tag}>{upperCase(inco_term)}</div>
				)}
				{trade_type && (
					<div className={styles.tag}>{startCase(trade_type)}</div>
				)}

				<div className={styles.note}>
					*Your contract will be live soon. Check the status of
					Contracts in manage contracts section
				</div>
			</Modal.Body>
			<Modal.Footer>
				<Button
					size="md"
					themeType="secondary"
					onClick={redirectToContract}
				>
					Go to contract
				</Button>

			</Modal.Footer>
		</Modal>
	);
}

export default PriceLockedModal;
