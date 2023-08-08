import { useTranslation } from 'next-i18next';

import MobileHeader from '../../../../MobileHeader';

import { useRouter } from '@/packages/next';
import Documents from '@/ui/page-components/documents';

function DocumentTab() {
	const { push } = useRouter();

	const { t } = useTranslation(['settings']);

	const onClickBackButton = () => {
		push('/settings');
	};

	return (
		<>
			<MobileHeader
				heading={t('settings:heading_title_documents_section')}
				onClickBackButton={onClickBackButton}
			/>
			<Documents />
		</>
	);
}

export default DocumentTab;
