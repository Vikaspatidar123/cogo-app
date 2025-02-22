import { Input, cl, Popover } from '@cogoport/components';
import { IcMSearchlight } from '@cogoport/icons-react';
import { useTranslation } from 'next-i18next';
import { useState } from 'react';

import useListFaqQuestions from '../../hooks/useListFaqQuestions';

import FaqsList from './FaqsList';
import styles from './styles.module.css';

const translationKey = 'helpCenter:search_faq_component';

function SearchFaq({ showTitle = true, setModalData = () => {} }) {
	const { t } = useTranslation(['helpCenter']);
	const [selectedQuery, setSelectedQuery] = useState('');
	const [showPopover, setShowPopover] = useState(false);

	const { faqListData = [], loading = false } = useListFaqQuestions({
		selectedQuery,
	});

	const handleOnChange = (val) => {
		setSelectedQuery(val);
		setShowPopover(!!val);
	};

	return (
		<div className={styles.container}>
			{showTitle && (
				<div className={styles.search_text}>{t(`${translationKey}_title`)}</div>
			)}

			<div
				className={cl`${
					showTitle ? styles.input_container : styles.title_container
				}`}
			>
				<Popover
					interactive
					caret={false}
					visible={showPopover}
					placement="bottom-start"
					className={styles.popover_container}
					onClickOutside={() => setShowPopover(false)}
					content={(
						<FaqsList
							faqListData={faqListData}
							setModalData={setModalData}
							setShowPopover={setShowPopover}
							loading={loading}
						/>
					)}
				>
					<Input
						size="md"
						value={selectedQuery}
						placeholder={t(`${translationKey}_search_placeholder`)}
						prefix={<IcMSearchlight className={styles.search_icon} />}
						onChange={handleOnChange}
					/>
				</Popover>
			</div>
		</div>
	);
}

export default SearchFaq;
