import { Tooltip } from '@cogoport/components';

import formatAmount from '@/ui/commons/utils/formatAmount';

export const tableFunction = {
	renderName: (key, list) => {
		const name = list[key];
		const length = key === 'name' ? 10 : 15;
		if (name?.length > length) {
			return (
				<Tooltip placement="top" content={name}>
					<div>{`${name.substring(0, length)}...`}</div>
				</Tooltip>
			);
		}
		return name || '---';
	},
	renderPrice: (key, list) => {
		const { currency } = list;
		const amount = list[key];
		return formatAmount(amount, currency);
	},
};
