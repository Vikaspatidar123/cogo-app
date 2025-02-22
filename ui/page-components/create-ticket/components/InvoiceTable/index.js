import { useTranslation } from 'next-i18next';

import getInvoiceCol from '../../configurations/invoice-table-columns';
import useGetSageArInvoices from '../../hooks/useGetSageArInvoices';
import Filters from '../Filters';
import List from '../List';

import styles from './styles.module.css';

function InvoiceTable({ setSelectedInvoices, selectedInvoices }) {
	const { t } = useTranslation(['createTicketPublic']);
	const fields = getInvoiceCol({ t });
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
				<div className={styles.label}>{t('createTicketPublic:invoice_title')}</div>
				<Filters
					handleChange={handleChange}
					setValues={setSearchQuery}
					values={searchQuery}
					placeholder={t('createTicketPublic:invoice_search_placeholder')}
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
				fields={fields}
				showPagination
				handleCheckboxSelect={handleCheckboxSelect}
				selectedInvoices={selectedInvoices}
			/>
		</div>
	);
}

export default InvoiceTable;
