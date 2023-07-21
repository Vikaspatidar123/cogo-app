import { useTranslation } from 'next-i18next';

import Header from '../../common/Header';

import Details from './Details';

function Main() {
	const { t } = useTranslation(['importExportControls']);
	return (
		<div>
			<Header title={t('importExportControls:main_title')} />
			<Details />
		</div>
	);
}
export default Main;
