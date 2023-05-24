import { KycCampaignModal } from '../../common/KYC';
import SearchPage from '../SearchPage';

function BookSearch() {
	return (
		<div>
			<SearchPage />
			<KycCampaignModal trackAnalytics />
		</div>
	);
}
export default BookSearch;
