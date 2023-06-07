import { Button, Input, cl, Toast } from '@cogoport/components';
import { IcMSearchlight } from '@cogoport/icons-react';
import { isEmpty } from '@cogoport/utils';
import { useMemo, useState } from 'react';

import contactListConfig from '../../../../../../configuration/contactListConfig';
import useCreateDsr from '../../../../../../hooks/useCreateDsr';
import useGetContactList from '../../../../../../hooks/useGetContactList';

import styles from './styles.module.css';

// import Table from './Table';
import Table from '@/ui/page-components/air-ocean-tracking/common/Table';

function AllContact({ selectedContact, setSelectedContact, setIsSingleReport, setDsrId }) {
	const [inputValue, setInputValue] = useState('');
	const { data, loading, setPage } = useGetContactList();
	const { loading: createLoading, createDsr } = useCreateDsr();

	const { list = [] } = data || {};
	console.log(list, 'list');
	const filteredList = useMemo(() => {
		const inputValueLowerCase = inputValue.toLowerCase();
		return list.filter((item) => {
			const { name = '', email = '' } = item || {};
			const itemName = name ? name.toLowerCase() : '';
			const itemEmail = email ? email.toLowerCase() : '';
			return itemName.includes(inputValueLowerCase) || itemEmail.includes(inputValueLowerCase);
		});
	}, [inputValue, list]);

	const proceedHandler = async () => {
		if (isEmpty(selectedContact)) {
			Toast.warn('Please Select contact');
		} else {
			const resp = await createDsr({ contactId: selectedContact?.id });

			if (resp === null) return;
			setDsrId(resp);
			setIsSingleReport(true);
		}
	};

	return (
		<div className={styles.container}>
			<div className={styles.body}>
				<div className={cl`${styles.flex_box} ${styles.search_container}`}>
					<div className={styles.input_box}>
						<p>Select Contact</p>
						<Input
							size="sm"
							value={inputValue}
							onChange={setInputValue}
							placeholder="Enter or email"
							suffix={<IcMSearchlight />}
						/>
					</div>
					<Button themeType="secondary" disabled={createLoading}>Add New</Button>
				</div>
				{/* <Table
					data={data}
					loading={loading}
					list={filteredList}
					setPage={setPage}
					selectedContact={selectedContact}
					setSelectedContact={setSelectedContact}
				/> */}
				<Table
					title="Contacts"
					configs={contactListConfig}
					filteredList={filteredList}
					data={data}
					loading={loading}
					setPage={setPage}
					selectedContact={selectedContact}
					setSelectedContact={setSelectedContact}
				/>
			</div>
			<div className={styles.footer}>
				<Button onClick={proceedHandler} themeType="accent" loading={createLoading}>Next</Button>
			</div>
		</div>
	);
}

export default AllContact;
