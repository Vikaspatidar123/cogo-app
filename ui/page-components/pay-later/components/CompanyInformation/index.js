import { Loader } from '@cogoport/components';

import useGetCompanyFinanceData from '../../hooks/useGetCompanyFinanceData';

import CompanyDetails from './CompanyDetails';
import DirectorDetails from './DirectorDetails';
import styles from './styles.module.css';

function CompanyInformation({ getCreditRequestResponse = {}, refetch = () => {} }) {
	const { data, loading } = useGetCompanyFinanceData({ id: getCreditRequestResponse?.id });

	if (loading || !data) {
		return (
			<div className={styles.loader}>
				<Loader />
			</div>
		);
	}
	return (
		<div>
			<CompanyDetails data={data} />
			<DirectorDetails data={data} getCreditRequestResponse={getCreditRequestResponse} refetch={refetch} />
		</div>
	);
}

export default CompanyInformation;
