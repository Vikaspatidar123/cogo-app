import { Loader } from '@cogoport/components';

import useGetOrganizationCreditRequest from '../hooks/useGetOrganizationCreditRequest';

import Form from './Form';
import styles from './styles.module.css';

function ExportFactoring() {
	const {
		data:getCreditRequestResponse,
		loading = false,
		active = '',
		setActive = () => {},
		getOrganizationCreditRequest,
	} = useGetOrganizationCreditRequest();

	if (loading) {
		return (
			<div className={styles.loader}>
				<Loader />
			</div>
		);
	}
	return (
		active && (
			<div className={styles.wrapper} key={active}>
				<Form
					active={active}
					getCreditRequestResponse={getCreditRequestResponse}
					refetch={getOrganizationCreditRequest}
					loading={loading}
					setActive={setActive}
				/>
			</div>
		)
	);
}

export default ExportFactoring;
