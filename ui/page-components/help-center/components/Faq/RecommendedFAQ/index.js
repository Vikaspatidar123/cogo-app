import { useTranslation } from 'next-i18next';
import React, { useEffect } from 'react';

import FaqItem from '../../../common/FaqItem';
import useGetRecommendedFaqs from '../../../hooks/useGetRecommendedFaqs';

import styles from './styles.module.css';

const translationKey = 'helpCenter:faq_answer';

const EMPTY_ARR = [...Array(4).keys()];

function RecommendedFAQ({
	queryName = '',
	faqLoading = false,
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
		<div className={styles.container}>
			<div className={styles.title}>
				{t(`${translationKey}_recommended_faqs`)}
			</div>
			<div className={styles.faqs_container}>
				{(loading ? EMPTY_ARR : list).map((itm) => (
					<FaqItem key={itm?.id || itm} faqData={itm} loading={loading} />
				))}
			</div>
		</div>
	);
}

export default RecommendedFAQ;
