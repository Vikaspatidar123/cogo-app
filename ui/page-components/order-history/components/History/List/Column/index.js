import { IcMArrowRotateDown } from '@cogoport/icons-react';
import { format } from '@cogoport/utils';

import RenderComponent from '../Item/RenderComponent';

import styles from './styles.module.css';

function columns({ sort, setSort }) {
	const handleOnchange = (item) => {
		setSort(() => {
			if (sort.sortBy !== item.key) {
				return {
					sortBy   : item.key,
					sortType : 'ASC',
				};
			}
			return {
				sortBy   : item.key,
				sortType : sort.sortType === 'DESC' ? 'ASC' : 'DESC',
			};
		});
	};

	return [
		{
			Header: (
				<div>
					Order Number
				</div>),
			accessor: (item) => (
				<div>{item.orderNumber}</div>
			),
			id: 'order_number',
		},
		{
			Header   : <div>Service Type</div>,
			accessor : (item) => (
				<div>{item.requestType}</div>
			),
			id: 'service_type',
		},
		{
			Header: (item) => (
				<div className={styles.flex}>
					Order Date
					<div className={styles.rotate_icon}>
						<IcMArrowRotateDown
							className={sort.sortType === 'ASC' ? 'rotate' : 'no-rotate'}
							onClick={() => handleOnchange(item)}
						/>
					</div>
				</div>
			),
			width    : 1,
			accessor : (item) => (
				<div>
					{format(item.orderDate, 'dd MMM yyyy')}
				</div>
			),
			id: 'order_date',
		},
		{
			Header: (
				<div>
					Status
				</div>),
			width    : 1,
			accessor : (item) => (
				<div>
					{item.status}
				</div>
			),
			id: 'status',
		},
		{
			Header   : <div>Payment Mode</div>,
			width    : 1,
			accessor : (item) => (
				<div>
					{item.paymentType}
				</div>
			),
			id: 'payment_mode',
		},
		{
			Header   : '',
			width    : 1,
			accessor : (item) => (
				item?.status === 'DATA_GENERATED' && (
					<div className={styles.dotcursor}>
						<RenderComponent itemData={item} />
					</div>
				)
			),
			id: '1',
		},
	];
}
export default columns;
