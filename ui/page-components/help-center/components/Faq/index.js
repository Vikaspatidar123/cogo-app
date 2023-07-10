/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react';

import RaiseTicket from '../../common/RaiseTicket';
import useGetQuestion from '../../hooks/useGetQuestion';

import FaqStructure from './FaqStructure';
import RecommendedFAQ from './RecommendedFAQ';
import styles from './styles.module.css';

import { useSelector } from '@/packages/store';
import Modals from '@/ui/commons/components/Header/Help/components/Modals';

function Faq() {
	const { query = {} } = useSelector((state) => state.general);
	const [modalData, setModalData] = useState({});

	const {
		questionData = {},
		getQuestion = () => {},
		loading = false,
	} = useGetQuestion();

	const {
		answers = [],
		question_abstract = '',
		query_name = '',
	} = questionData || {};

	useEffect(() => {
		getQuestion(query?.faq_id);
	}, [query]);

	return (
		<div className={styles.container}>
			<div className={styles.faq_container}>
				<FaqStructure
					questionAbstract={question_abstract}
					answers={answers}
					setModalData={setModalData}
					modalData={modalData}
					loading={loading}
					query={query}
					getQuestion={getQuestion}
				/>
				<RecommendedFAQ
					faqLoading={loading}
					queryName={query_name}
				/>
			</div>
			<RaiseTicket setModalData={setModalData} />
			<Modals modalData={modalData} setModalData={setModalData} />
		</div>
	);
}

export default Faq;
