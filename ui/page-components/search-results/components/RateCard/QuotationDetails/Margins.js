import React from 'react';
import useGetPermission from '@cogo/business-modules/hooks/useGetPermission';
import { Flex } from '@cogoport/front/components';
import isEmpty from '@cogo/utils/isEmpty';
import CC from '../../../helpers/condition-constants';
import { Space, Pill } from './styles';

const Margins = ({ margins = [] }) => {
	const { isConditionMatches } = useGetPermission();

	const salesMargin = (margins || []).filter(
		(item) => item?.margin_type === 'demand',
	);
	const supplyMargin = (margins || []).filter(
		(item) => item?.margin_type === 'supply',
	);
	const cogoMargin = (margins || []).filter(
		(item) => item?.margin_type === 'cogoport',
	);

	let label = '';
	let margin = '';
	const handleMargin = (item, type) => {
		if (type === 'demand') {
			label = '(Sales)';
		} else if (type === 'supply') {
			label = '(Supply)';
		} else if (type === 'cogoport') {
			label = '(Cogo)';
		}

		if (!isEmpty(item)) {
			const value = (item || [])[0];
			if (value?.type === 'percentage') {
				margin = `${(value?.value).toFixed(2)}% (${(value?.min_value).toFixed(
					2,
				)} - ${(value?.max_value).toFixed(2)})${label}`;
			} else {
				margin = `${(value?.value).toFixed(2)}${label}`;
			}
		} else {
			margin = `0 ${label}`;
		}

		return margin;
	};

	return (
		<Flex display="block">
			<Flex style={{ marginBottom: '8px' }}>
				{isConditionMatches(
					[...CC.SEE_ALL_MARGINS, ...CC.SEE_SALES_MARGIN],
					'or',
				) ? (
					<Space>
						+<Pill>{handleMargin(salesMargin, 'demand')}</Pill>
					</Space>
				) : null}

				{isConditionMatches(
					[...CC.SEE_ALL_MARGINS, ...CC.SEE_SUPPLY_MARGIN],
					'or',
				) ? (
					<Space>
						+<Pill>{handleMargin(supplyMargin, 'supply')}</Pill>
					</Space>
				) : null}
			</Flex>

			{isConditionMatches(CC.SEE_ALL_MARGINS, 'or') ? (
				<Space>
					+<Pill>{handleMargin(cogoMargin, 'cogoport')}</Pill>
				</Space>
			) : null}
		</Flex>
	);
};

export default Margins;
