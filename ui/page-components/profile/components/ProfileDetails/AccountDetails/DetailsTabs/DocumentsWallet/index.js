import MobileHeader from '../../../../MobileHeader';

import { useRouter } from '@/packages/next';
import Documents from '@/ui/page-components/documents';

function DocumentTab() {
	const { push } = useRouter();

	const onClickBackButton = () => {
		push('/settings');
	};

	return (
		<>
			<MobileHeader heading="Document Vault" onClickBackButton={onClickBackButton} />
			<Documents />
		</>
	);
}

export default DocumentTab;
