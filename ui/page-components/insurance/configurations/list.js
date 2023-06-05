import { Popover } from '@cogoport/components';
import { IcMArrowDown, IcMArrowUp, IcMOverflowDot } from '@cogoport/icons-react';
import { format } from '@cogoport/utils';

import Coverage from '../components/ListView/Coverage';
import paymentStatus from '../components/ListView/status';

const listConfig = ({ setSort, sort, Content }) => {
	const { sortType = 'DESC' } = sort || {};

	const handleToggleChange = ({ sortingKey }) => {
		setSort((prev) => ({
			...prev,
			sortBy   : sortingKey,
			sortType : sortType === 'DESC' ? 'ASC' : 'DESC',
		}));
	};

	const fields = [
		{
			span     : 2,
			Header   : 'Policy ID',
			accessor : 'cogoPolicyNo',
			id       : 'cogoPolicyNo',
		},
		{
			span     : 4,
			accessor : 'coverage',
			id       : 'coverage',
			Header   : 'Coverage',
			Cell     : ({ row }) => <Coverage itemData={row?.original} />,
		},
		{
			span     : 3,
			toolTip  : true,
			accessor : 'subCommodity',
			id       : 'subCommodity',
			Header   : 'Commodity',
		},
		{
			span       : 1,
			sortingKey : 'TRANSIT_START_DATE',
			sorting    : true,
			accessor   : 'transitDate',
			id         : 'transitDate',
			Header     : () => (
				<div>
					Transit Start Date
					{sortType === 'ASC'
						? <IcMArrowDown onClick={() => handleToggleChange({ sortingKey: 'TRANSIT_START_DATE' })} />
						: <IcMArrowUp onClick={() => handleToggleChange({ sortingKey: 'TRANSIT_START_DATE' })} />}
				</div>
			),
			Cell: ({ row }) => format(row?.original?.transitDate, 'dd MMM yy'),
		},
		{
			span       : 1,
			sortingKey : 'CREATED_AT',
			sorting    : true,
			accessor   : 'createdAt',
			id         : 'createdAt',
			Header     : () => (
				<div>
					Created Date
					{sortType === 'ASC'
						? <IcMArrowDown onClick={() => handleToggleChange({ sortingKey: 'CREATED_AT' })} />
						: <IcMArrowUp onClick={() => handleToggleChange({ sortingKey: 'CREATED_AT' })} />}
				</div>
			),
			Cell: ({ row }) => format(row?.original?.createdAt, 'dd MMM yy'),
		},
		{
			span     : 2,
			accessor : 'status',
			id       : 'status',
			Header   : 'Status',
			Cell     : ({ row }) => paymentStatus[row?.original?.status],
		},
		{
			width    : '10%',
			span     : 1,
			Header   : '',
			accessor : 'icon',
			id       : 'icon',
			Cell     : ({ row }) => (
				<Popover
					theme="light"
					interactive
					trigger="click"
					content={(
						<Content
							itemData={row?.original}
						/>
					)}
				>
					<IcMOverflowDot />
				</Popover>
			),
		},
	];
	return fields;
};

export default listConfig;
