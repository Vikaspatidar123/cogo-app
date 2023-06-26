import { IcMFaq } from '@cogoport/icons-react';
import { isEmpty } from '@cogoport/utils';

import FaqQuestions from '../../../../../common/FaqQuestions';
import useListFaqQuestions from '../../../../../hooks/useListFaqQuestion';

import FaqListLoader from './FaqListLoader';
import styles from './styles.module.css';

function FaqList({ selectedQuery = '' }) {
	const { faqListData = {}, loading = false } = useListFaqQuestions({
		selectedQuery,
	});
	const { list = [] } = faqListData || {};

	if (isEmpty(list || []) && !loading) {
		return (
			<div className={styles.icon_container}>
				<IcMFaq className={styles.icmflag_icon} />
			</div>
		);
	}

	return (
		<div className={styles.container}>
			{loading ? <FaqListLoader /> : <FaqQuestions data={list} />}
		</div>
	);
}

export default FaqList;
