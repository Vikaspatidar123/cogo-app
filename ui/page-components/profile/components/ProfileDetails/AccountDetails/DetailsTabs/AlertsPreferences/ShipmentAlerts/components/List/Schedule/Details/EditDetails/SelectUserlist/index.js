import { Input } from '@cogoport/components';
import { IcMSearchlight } from '@cogoport/icons-react';

import styles from './styles.module.css';
import UserTable from './UserTable';

function SelectUserlist({ data, hookSetter, isLoading }) {
	const { setPageNumber, setQuery, query } = hookSetter || {};
	return (
		<div className={styles.container}>
			<div className={styles.header}>
				<div>Decide on Recipients who will receive the Status Report. All reports will be sent by Email. </div>
				<Input
					name="search"
					style={{ width: '300px' }}
					placeholder="Search by User Name or Email"
					size="sm"
					suffix={<IcMSearchlight style={{ marginRight: '10px' }} />}
					onChange={setQuery}
					value={query}
				/>
			</div>
			<UserTable data={data} setPageNumber={setPageNumber} isLoading={isLoading} />
		</div>
	);
}
export default SelectUserlist;
