import { useScope } from '@cogo/commons/hooks';
import GLOBAL_CONSTANTS from '@cogo/globalization/constants/globals.json';
import formatDate from '@cogo/globalization/utils/formatDate';
import { useRouter } from '@cogo/next';
import { useSelector } from '@cogo/store';
import Button from '@cogoport/front/components/admin/Button';
import { startCase, upperCase } from '@cogoport/front/utils';
import React from 'react';

import { getUnit, getServiceUnit } from '../../../../../utils/get-unit';

import {
	ModalWrapper,
	TitleBg,
	Title,
	Heading,
	PortPair,
	PortArrow,
	Port,
	Detail,
	Tag,
	Note,
	Footer,
	CloseIcon,
	CloseModal,
} from './styles';

function PriceLockedModal({
	priceLocked,
	setPriceLocked,
	contractData,
	details,
}) {
	const { scope } = useScope();
	const { push } = useRouter();
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

	const { permissionsNavigations } = useSelector(({ profile }) => ({
		permissionsNavigations: profile.permissions_navigations,
	}));

	const showContracts =		scope === 'partner'
		? Object.keys(permissionsNavigations).includes(
			'contract_rates-international_contracts',
			  )
		: true;

	const redirectToContract = () => {
		if (scope === 'partner') {
			push(
				'/contract-rates/dashboard/[active_tab]',
				'/contract-rates/dashboard/pending_approval',
			);
		} else if (scope === 'app') {
			push('/contract-management?activetab=pending_approval');
		}
	};
	return (
		<ModalWrapper show={priceLocked} className="secondary md">
			<CloseModal>
				<CloseIcon onClick={() => setPriceLocked(false)} />
			</CloseModal>
			<Heading>
				<Title>
					<span>Price locked requested</span>
					<TitleBg />
				</Title>
			</Heading>

			<PortPair>
				<Port>
					<div>
						{origin_port?.name || origin_airport?.name}
						<span>
							(
							{origin_port?.port_code || origin_airport?.port_code}
							)
							{' '}
						</span>
					</div>

					<div>{origin_country?.name}</div>
				</Port>
				<PortArrow />
				<Port destination>
					<div>
						{destination_port?.name || destination_airport?.name}
						<span>
							(
							{destination_port?.port_code || destination_airport?.port_code}
							)
						</span>
					</div>
					<div>{destination_country?.name}</div>
				</Port>
			</PortPair>

			<Detail>
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
			</Detail>
			<Detail>
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
			</Detail>
			{commodity && <Tag>{startCase(commodity)}</Tag>}
			{container_type && <Tag>{startCase(container_type)}</Tag>}
			{container_size && (
				<Tag>
					{container_size}
					FT
				</Tag>
			)}
			{volume && (
				<Tag>
					VOL:
					{volume}
					CBM
				</Tag>
			)}
			{weight && (
				<Tag>
					WT:
					{weight}
					KGS
				</Tag>
			)}
			{inco_term && <Tag>{upperCase(inco_term)}</Tag>}
			{trade_type && <Tag>{startCase(trade_type)}</Tag>}

			<Note>
				*Your contract will be live soon. Check the status of Contracts in
				manage contracts section
			</Note>

			<Footer>
				{showContracts ? (
					<Button className="primary md " onClick={redirectToContract}>
						Go to contract
					</Button>
				) : (
					<Button className="primary md " onClick={() => setPriceLocked(false)}>
						Close
					</Button>
				)}
			</Footer>
		</ModalWrapper>
	);
}

export default PriceLockedModal;
