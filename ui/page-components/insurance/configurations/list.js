import { Popover } from '@cogoport/components';
import { IcMArrowDown, IcMArrowUp, IcMOverflowDot } from '@cogoport/icons-react';
import { format } from '@cogoport/utils';

import CogoPolicyNo from '../components/ListView/CogoPolicyNo';
import Coverage from '../components/ListView/Coverage';
import paymentStatus from '../components/ListView/status';
import styles from '../components/ListView/styles.module.css';

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
			minWidth : 200,
			Header   : 'Policy ID',
			accessor : 'cogoPolicyNo',
			id       : 'cogoPolicyNo',
			Cell     : ({ row }) => <CogoPolicyNo itemData={row?.original} />,
		},
		{
			minWidth : 200,
			accessor : 'coverage',
			id       : 'coverage',
			Header   : 'Coverage',
			Cell     : ({ row }) => <Coverage itemData={row?.original} />,
		},
		{
			minWidth : 200,
			toolTip  : true,
			accessor : 'subCommodity',
			id       : 'subCommodity',
			Header   : 'Commodity',
		},
		{
			minWidth   : 200,
			sortingKey : 'TRANSIT_START_DATE',
			sorting    : true,
			accessor   : 'transitDate',
			id         : 'transitDate',
			Header     : () => (
				<div>
					Transit Start Date
					{sortType === 'ASC'
						? (
							<IcMArrowDown
								width={10}
								height={10}
								onClick={() => handleToggleChange({ sortingKey: 'TRANSIT_START_DATE' })}
								className={styles.icon}
							/>
						)
						: (
							<IcMArrowUp
								width={10}
								height={10}
								onClick={() => handleToggleChange({ sortingKey: 'TRANSIT_START_DATE' })}
								className={styles.icon}
							/>
						)}
				</div>
			),
			Cell: ({ row }) => format(row?.original?.transitDate, 'dd MMM yy'),
		},
		{
			minWidth   : 80,
			sortingKey : 'CREATED_AT',
			sorting    : true,
			accessor   : 'createdAt',
			id         : 'createdAt',
			Header     : () => (
				<div>
					Created Date
					{sortType === 'ASC'
						? (
							<IcMArrowDown
								width={10}
								height={10}
								onClick={() => handleToggleChange({ sortingKey: 'CREATED_AT' })}
								className={styles.icon}
							/>
						)
						: (
							<IcMArrowUp
								width={10}
								height={10}
								onClick={() => handleToggleChange({ sortingKey: 'CREATED_AT' })}
								className={styles.icon}
							/>
						)}
				</div>
			),
			Cell: ({ row }) => format(row?.original?.createdAt, 'dd MMM yy'),
		},
		{
			minWidth : 80,
			accessor : 'status',
			id       : 'status',
			Header   : 'Status',
			Cell     : ({ row }) => paymentStatus[row?.original?.status],
		},
		{
			minWidth : 80,
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
