import { isEmpty } from '@cogoport/utils';
import { useTranslation } from 'next-i18next';

import Item from '../Item';
import Pagination from '../Item/Pagination';

import CardHeader from './CardHeader';
import styles from './styles.module.css';

function List({
	configs,
	apiData,
	loading,
	pageObj,
	refetchHsCode,
	headCode,
	headingToggle,
}) {
	const { t } = useTranslation(['common', 'tradePartner']);
	const list = loading ? [...Array(5).keys()] : apiData;

	return (
		<div>
			<CardHeader configs={configs} />

			{list?.map((data) => (
				<Item configs={configs} data={data} loading={loading} />
			))}
			{pageObj && apiData?.length > 0 && (
				<Pagination
					pageObj={pageObj}
					refetchHsCode={refetchHsCode}
					headCode={headCode}
					headingToggle={headingToggle}
				/>
			)}
			{!loading && isEmpty(apiData) && (
				<div className={styles.empty}>
					{t('hsClassification:hs_code_classification_empty_state_text_7')}
				</div>
			)}
		</div>
	);
}

export default List;
