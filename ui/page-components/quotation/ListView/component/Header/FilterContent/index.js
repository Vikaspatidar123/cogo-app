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

function FilterContent({ filters = {}, setFilters }) {
	const filterLength = Object.keys(filters).length;
	const updateStatusHandler = (value) => {
		setFilters((prev) => ({
			...prev,
			status: value,
		}));
	};

	const removeStatusHandler = () => {
		setFilters((prev) => {
			const { status, ...other } = prev;

			return {
				...other,
			};
		});
	};

	const calculateLength = () => {
		let n = 0;
		Object.keys(filters).forEach((ele) => {
			if (filters[ele]) {
				n += 1;
			}
		});
		return n;
	};

	return (
		<div className={styles.container}>
			<div className={styles.heading}>
				<div>
					<h3>Apply Filters</h3>
					{(filterLength > 1 || filters?.showExpired) && (
						<div className={styles.sub_header}>{`Selected Filters (${calculateLength()})`}</div>
					)}
				</div>
				{(filterLength > 1 || filters?.showExpired) && (
					<div
						className={styles.clear_btn}
						role="presentation"
						onClick={() => {
						// setChecked(false);
						// setExpireDay('');
							setFilters({
								showExpired: false,
							});
						}}
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
									onClick={() => updateStatusHandler(condition)}
								>
									<Icon
										width={15}
										height={15}
										fill={`${filters.status === condition ? '#fff' : '#6B6D81'}`}
									/>
									<p className={styles.text}>{name}</p>
								</div>
								{filters.status === condition && (
									<IcMCross
										fill="#fff"
										width={15}
										height={15}
										onClick={() => removeStatusHandler()}
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
						onChange={(e) => setFilters((prev) => ({
							...prev,
							date_range: e,
						}))}
					/>
				</div>
				<div className={styles.section}>
					<Checkbox
						label="Include expired quotations"
						checked={filters?.showExpired}
						onChange={(e) => setFilters((prev) => ({
							...prev,
							showExpired: e.target.checked,
						}))}
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
							onChange={(e) => setFilters((prev) => ({
								...prev, expiresIn: e,
							}))}
						/>
					</div>
					<div>days</div>
				</div>
			</div>
		</div>
	);
}
export default FilterContent;
