import PaymentColumns from '../../configurations/payment-table-column';
import useGetPayments from '../../hooks/useGetPayments';
import Filters from '../Filters';
import List from '../List';

import styles from './styles.module.css';

function PaymentsTable({ selectedpayments, setSelectedPayments }) {
	const {
		paymentsData,
		paymentListLoading,
		setParams,
		params,
		setOrderBy,
		orderBy,
		setSearchValue,
		searchValue,
	} = useGetPayments();

	const handleChange = (val, setValue) => {
		setParams({ ...params, page: 1 });
		setValue(val);
	};

	const handleInputReset = () => {
		setParams({ ...params, page: 1 });
		setSearchValue('');
	};

	const handleCheckboxSelect = (val) => {
		const { id } = val || {};
		if ((selectedpayments || []).includes(id)) {
			let arr = [...selectedpayments] || [];
			arr = arr.filter((item) => item !== id);
			setSelectedPayments(arr);
		} else {
			setSelectedPayments([...selectedpayments, id]);
		}
	};

	return (
		<div className={styles.container}>
			<div className={styles.select_wrapper}>
				<div className={styles.label}>Please Select Payment</div>
				<div className={styles.wrap}>
					<Filters
						handleInputReset={handleInputReset}
						handleChange={handleChange}
						values={searchValue}
						setValues={setSearchValue}
						placeholder="Search by Payment Number"
					/>
				</div>
			</div>
			<List
				data={paymentsData}
				loading={paymentListLoading}
				setParams={setParams}
				params={params}
				setOrderBy={setOrderBy}
				orderBy={orderBy}
				fields={PaymentColumns}
				showPagination
				handleBoxSelect={handleCheckboxSelect}
				selectedpayments={selectedpayments}
			/>
		</div>
	);
}

export default PaymentsTable;
