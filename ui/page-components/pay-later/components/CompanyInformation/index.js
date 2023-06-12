import useGetCompanyFinanceData from '../../hooks/useGetCompanyFinanceData';

import CompanyDetails from './CompanyDetails';
import DirectorDetails from './DirectorDetails';

function CompanyInformation({ getCreditRequestResponse = {} }) {
	const { data } = useGetCompanyFinanceData({ id: getCreditRequestResponse?.id });
	console.log('🚀 ~ file: index.js:8 ~ CompanyInformation ~ data:', data);
	return (
		<div>
			<CompanyDetails />
			<DirectorDetails />
		</div>
	);
}

export default CompanyInformation;
