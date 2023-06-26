import { Button, Placeholder, cl } from '@cogoport/components';
import { IcMArrowBack } from '@cogoport/icons-react';

import SearchFaq from '../../../common/SearchFaq';
import useCreateFaqFeedback from '../../../hooks/useCreateFaqFeedback';
import useUpdateFaqFeedback from '../../../hooks/useUpdateFaqFeedback';

import styles from './styles.module.css';

import { useRouter } from '@/packages/next';

function FaqStructure({
	questionAbstract = '',
	answers = [],
	setModalData = () => {},
	loading = false,
	isMobile = false,
	getQuestion = () => {},
	query,
}) {
	const router = useRouter();

	const { submitFaqFeedback, feedbackLoading } = useCreateFaqFeedback({
		getQuestion,
		query,
	});

	const { updateFaqFeedback, updateLoading } = useUpdateFaqFeedback({
		getQuestion,
		query,
	});

	const {
		answer = '',
		id: answerId = '',
		faq_feedbacks = [],
	} = answers?.[0] || {};

	const recentFeedback = faq_feedbacks?.[faq_feedbacks.length - 1] || {};

	const { is_positive: isPositiveReview, id: feedbackID = '' } =		recentFeedback || {};

	const handleNavigation = () => {
		const hasBackPath = window.history.length > 1;

		if (hasBackPath) {
			router.back();
		} else {
			router.push('/help-center');
		}
	};

	const handleClick = (val) => {
		if (!feedbackID) {
			submitFaqFeedback({ answerId, isPositive: val });
			return;
		}
		updateFaqFeedback({ answerId, isPositive: val, feedbackID });
	};

	if ((!questionAbstract || !answer) && !loading) {
		return (
			<div
				className={cl`${styles.left_container} ${
					isMobile ? styles.mobile_left_container : ''
				}`}
			>
				<SearchFaq
					showTitle={false}
					setModalData={setModalData}
					key={loading}
				/>
				<div className={styles.empty_container}>
					{questionAbstract
						? `There is no answer for the question ${questionAbstract}`
						: 'Question Does\'nt exist.'}
				</div>
			</div>
		);
	}

	return (
		<div
			className={cl`${styles.left_container} ${
				isMobile ? styles.mobile_left_container : ''
			}`}
		>
			<SearchFaq showTitle={false} setModalData={setModalData} key={loading} />
			<div
				className={cl`${styles.faq_container} ${
					isMobile ? styles.mobile_faq_container : ''
				}`}
			>
				<IcMArrowBack className={styles.back_icon} onClick={handleNavigation} />
				<div className={styles.faq}>
					<div className={styles.title}>
						{loading ? (
							<Placeholder height="40px" width="95%" />
						) : (
							questionAbstract
						)}
					</div>
					<div className={styles.answer}>
						{loading ? (
							[...Array(5).keys()].map((itm) => (
								<Placeholder
									key={itm}
									height="30px"
									width="95%"
									className={styles.skeleton_loader}
								/>
							))
						) : (
							<div dangerouslySetInnerHTML={{ __html: answer }} />
						)}
					</div>
				</div>
			</div>
			<div className={styles.feedback_styles}>
				<div className={styles.feedback_label}>
					Was this helpful for you?
				</div>
				<div className={styles.feedback_buttons}>
					<Button
						size="md"
						themeType="secondary"
						className={
							feedbackID && (isPositiveReview ? '' : styles.hover_styles)
						}
						disabled={loading || feedbackLoading || updateLoading}
						onClick={() => handleClick(false)}
					>
						No
					</Button>
					<Button
						size="md"
						themeType="secondary"
						className={
							feedbackID && (isPositiveReview ? styles.hover_styles : '')
						}
						disabled={loading || feedbackLoading || updateLoading}
						onClick={() => handleClick(true)}
					>
						Yes
					</Button>
				</div>
			</div>
		</div>
	);
}

export default FaqStructure;
