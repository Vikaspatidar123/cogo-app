import { Button } from '@cogoport/components';

import Header from './Header';

import { useRouter } from '@/packages/next';
import PublicHeader from '@/ui/commons/components/PublicHeader';
import { TrackerDetails } from '@/ui/page-components/air-ocean-tracking';

function TrakingPage() {
	const { push } = useRouter();

	const renderFunction = <Button type="button" onClick={() => push('/login')}>Login to Account</Button>;

	return (
		<div>
			<PublicHeader renderFunction={renderFunction} />
			<Header />
			<TrackerDetails />

		</div>
	);
}

export default TrakingPage;
