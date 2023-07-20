import { useTranslation } from 'next-i18next';

import UploadDocument from '../UploadDocument';

import ServiceWiseHeading from './ServiceWiseHeading';
import styles from './styles.module.css';

import { useSelector } from '@/packages/store';
import getGeoConstants from '@/ui/commons/constants/geo';

const geo = getGeoConstants();

function Heading({
	setShow = () => {},
	documentDetails = {},
	addDocument = () => {},
	refetch = () => {},
	loading = false,
	setDocumentDetails = () => {},
	setServiceType = () => {},
	serviceType = '',
	setShowServiceList = () => {},
	filters = {},
}) {
	const { t } = useTranslation(['documents']);

	const { user_data } = useSelector(({ profile }) => ({
		user_data: profile || {},
	}));

	return (
		<div className={styles.header}>
			<div className={styles.title}>
				{t('documents:documents_heading')}
			</div>

			<UploadDocument
				setShow={setShow}
				documentDetails={documentDetails}
				addDocument={addDocument}
				loading={loading}
				setDocumentDetails={setDocumentDetails}
			/>

			{user_data?.organization?.country?.country_code === geo.country.code
				? (
					<ServiceWiseHeading
						setServiceType={setServiceType}
						serviceType={serviceType}
						refetch={refetch}
						setShowServiceList={setShowServiceList}
						filters={filters}
					/>
				) : null}
		</div>
	);
}

export default Heading;
