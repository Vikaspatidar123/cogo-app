import InvoiceColumns from '../../configurations/invoice-table-columns';
import useGetSageArInvoices from '../../hooks/useGetSageArInvoices';
import Filters from '../Filters';
import List from '../List';

import styles from './styles.module.css';

function InvoiceTable({ setSelectedInvoices, selectedInvoices }) {
	const {
		loading,
		setOrderBy,
		orderBy,
		data,
		params,
		setParams,
		setSearchQuery,
		searchQuery,
	} = useGetSageArInvoices();

	const handleCheckboxSelect = (val) => {
		const { invoice_id, invoice_document_url } = val || {};

		if (Object.keys(selectedInvoices || {}).includes(invoice_id)) {
			const copy = { ...selectedInvoices };
			delete copy?.[invoice_id];
			setSelectedInvoices(copy);
		} else {
			setSelectedInvoices({
				...selectedInvoices,
				[invoice_id]: invoice_document_url,
			});
		}
	};

	const handleChange = (val, setValue) => {
		setParams({ ...params, page: 1 });
		setValue(val);
	};

	const handleInputReset = () => {
		setParams({ ...params, page: 1 });
		setSearchQuery('');
	};

	return (
		<div className={styles.container}>
			<div className={styles.header}>
				<div className={styles.label}>Please Select Invoices</div>
				<Filters
					handleChange={handleChange}
					setValues={setSearchQuery}
					values={searchQuery}
					placeholder="Search by Invoice Number/SID"
					handleInputReset={handleInputReset}
				/>
			</div>
			<List
				data={data}
				loading={loading}
				setParams={setParams}
				params={params}
				setOrderBy={setOrderBy}
				orderBy={orderBy}
				fields={InvoiceColumns}
				showPagination
				handleCheckboxSelect={handleCheckboxSelect}
				selectedInvoices={selectedInvoices}
			/>
		</div>
	);
}

export default InvoiceTable;
