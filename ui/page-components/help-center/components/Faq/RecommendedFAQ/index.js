import { cl } from '@cogoport/components';
import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';

import FaqItem from '../../../common/FaqItem';
import useGetRecommendedFaqs from '../../../hooks/useGetRecommendedFaqs';

import styles from './styles.module.css';

const translationKey = 'helpCenter:faq_answer';

function RecommendedFAQ({
	queryName = '',
	faqLoading = false,
	isMobile = false,
}) {
	const { t } = useTranslation(['helpCenter']);

	const {
		getRecommendedFaqs = () => {},
		recommendedFaqs = {},
		recommendedLoading,
	} = useGetRecommendedFaqs();

	const { list = [] } = recommendedFaqs || {};

	const loading = recommendedLoading || faqLoading;

	useEffect(() => {
		if (queryName) {
			getRecommendedFaqs(queryName);
		}
	}, [queryName, getRecommendedFaqs]);

	return (
		<div
			className={cl`${styles.container} ${
				isMobile ? styles.mobile_container : ''
			}`}
		>
			<div className={styles.title}>
				{t(`${translationKey}_recommended_faqs`)}
			</div>
			<div className={styles.faqs_container}>
				{(loading ? [...Array(4).keys()] : list).map((itm) => (
					<FaqItem key={itm?.id || itm} faqData={itm} loading={loading} />
				))}
			</div>
		</div>
	);
}

export default RecommendedFAQ;
