import { Input, Checkbox, DateRangepicker, cl } from '@cogoport/components';
import { IcMCrossInCircle, IcMSend, IcMCross, IcMInvoices } from '@cogoport/icons-react';

import styles from './styles.module.css';

const filterTab = [
	{
		name      : 'Sent',
		Icon      : IcMSend,
		condition : 'SENT',
	},
	{
		name      : 'Drafted',
		Icon      : IcMInvoices,
		condition : 'DRAFTED',

	},
];

function FilterContent({ setGlobalFilter, globalFilter = {} }) {
	const { filters = {} } = globalFilter;

	const calculateLength = () => {
		let n = 0;
		Object.keys(filters).forEach((ele) => {
			if (filters[ele] && ele !== 'empty') {
				n += 1;
			}
		});
		return n;
	};
	const filterLength = calculateLength();

	const checkboxHandler = async (e) => {
		if (!e.target.checked) {
			setGlobalFilter((prev) => {
				const { filters: prevFilter } = prev;
				const { showExpired, ...rest } = prevFilter;
				return { ...prev, filters: { ...rest } };
			});
		} else {
			setGlobalFilter((prev) => ({
				...prev,
				filters: {
					...prev.filters,
					showExpired: true,
				},
			}));
		}
	};

	const clearFilterHandler = (key) => {
		if (key === 'all') {
			setGlobalFilter((prev) => ({
				...prev,
				page    : 1,
				filters : {},
			}));
		} else if (key === 'status') {
			setGlobalFilter((prev) => {
				const { filters: prevFilter } = prev;
				const { status, ...rest } = prevFilter;
				return { ...prev, page: 1, filters: { ...rest } };
			});
		}
	};

	const changeHandler = (key, value) => {
		setGlobalFilter((prev) => ({
			...prev,
			page    : 1,
			filters : { ...prev.filters, [key]: value },
		}));
	};

	const inputChangeHandler = (val) => {
		if (val === '') {
			changeHandler('expiresIn', undefined);
		} else {
			changeHandler('expiresIn', val);
		}
	};
	return (
		<div className={styles.container}>
			<div className={styles.heading}>
				<div>
					<h3>Apply Filters</h3>
					{(filterLength > 0) && (
						<div className={styles.sub_header}>{`Selected Filters (${filterLength})`}</div>
					)}
				</div>
				{(filterLength > 0) && (
					<div
						className={styles.clear_btn}
						role="presentation"
						onClick={() => clearFilterHandler('all')}
					>
						<div>Clear All</div>
						<IcMCrossInCircle width={17} height={17} />
					</div>
				)}
			</div>

			<div className={styles.filter_section}>
				<div className={styles.section}>
					<div className={styles.flex_box}>
						{filterTab.map(({ name, Icon, condition }) => (
							<div className={cl`${styles.col} ${styles.flex_box}
							${filters.status === condition && styles.selected}`}
							>
								<div
									role="presentation"
									className={cl`${styles.flex_box} ${styles.filter_tab}`}
									onClick={() => changeHandler('status', condition)}
								>
									<Icon
										width={15}
										height={15}
										fill={filters.status === condition ? '#fff' : '#6B6D81'}
									/>
									<p className={styles.text}>{name}</p>
								</div>
								{filters.status === condition && (
									<IcMCross
										fill="#fff"
										width={15}
										height={15}
										onClick={() => clearFilterHandler('status')}
									/>
								)}
							</div>
						))}
					</div>
				</div>
				<div className={styles.section}>
					<p className={styles.label}>Date Rage From-To</p>
					<DateRangepicker
						value={filters?.date_range}
						maxDate={new Date()}
						isPreviousDaysAllowed
						onChange={(v) => changeHandler('date_range', v)}
					/>
				</div>
				<div className={styles.section}>
					<Checkbox
						label="Include expired quotations"
						checked={filters?.showExpired}
						onChange={checkboxHandler}
					/>
				</div>
				<div className={cl`${styles.section} ${styles.expiring}`}>
					<div>Expiring in</div>
					<div className={styles.input_box}>
						<Input
							size="sm"
							placeholder=" "
							type="number"
							min={0}
							max={10}
							onChange={inputChangeHandler}
						/>
					</div>
					<div>days</div>
				</div>
			</div>
		</div>
	);
}
export default FilterContent;
