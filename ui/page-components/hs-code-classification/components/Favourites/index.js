import { Modal, Placeholder } from '@cogoport/components';
import { IcMDelete } from '@cogoport/icons-react';
import { useTranslation } from 'next-i18next';

import AddProductModal from '../AddProductModal';
import styles from '../styles.module.css';

function Favourites({
	openSelectedModal,
	setOpenSelectedModal,
	bookmarkData,
	refetchGetBookmark,
	refetchRemoveBookmark,
	loading,
}) {
	const { list = [] } = bookmarkData || {};
	const isBookmarkEmpty = list.length === 0;

	const { t } = useTranslation(['common', 'hsClassification']);

	const addLoader = (mobileWidth, desktopWidth) => (
		<div>
			<Placeholder width={mobileWidth} height="15px" className={styles.mobile} />
			<Placeholder className={styles.loader} height="15px" width={desktopWidth} />
		</div>
	);

	return (
		<Modal
			className={styles.ui_modal}
			show={openSelectedModal}
			onClose={() => setOpenSelectedModal(false)}
		>
			<Modal.Header className={`${styles.title} ${styles.favourites}`} title="Favourites" />
			<div className={styles.line} />
			<Modal.Body>
				{(isBookmarkEmpty && !loading)
					? (
						<div className={styles.no_data}>
							{t('hsClassification:hs_code_classification_favourite_text_1')}
						</div>
					)
					: (list || []).map((book) => (
						<div className={`${styles.card} ${styles.bookmark}`}>
							<div className={styles.bm}>
								<div className={styles.div_hs}>
									<div>
										{loading ? (
											addLoader('40px', '250px')
										) : (
											<div>
												<b>
													{t('hsClassification:hs_code_classification_favourite_text_2')}
												</b>
												-
												{book.hsCode}
											</div>
										)}
									</div>
									<div className={`${styles.icon_container} ${styles.svg}`}>
										<AddProductModal
											data={{ hsCode: book.hsCode, id: book.hsCodeId }}
											src="fav"
										/>
										<div
											className={`${styles.delete_icon} ${styles.svg}`}
											role="presentation"
											onClick={() => {
												refetchRemoveBookmark(
													false,
													book.hsCodeId,
													refetchGetBookmark,
													book.headingCode,
												);
											}}
										>
											<IcMDelete height={25} width={25} fill="#EE3425" />
										</div>
									</div>
								</div>

								<div className={styles.div_hs}>
									{loading ? (
										addLoader('40px', '250px')
									) : (
										<div>
											<b>{t('hsClassification:hs_code_classification_favourite_text_3')}</b>
											{' '}
											-
											{book.description}
										</div>
									)}
								</div>

								<div className={styles.div_section}>
									{loading ? (
										addLoader('40px', '400px')
									) : (
										<>
											<div className={styles.favourites_tag}>
												{t('hsClassification:hs_code_classification_favourite_text_4')}
												{' '}
												-
												{book.sectionCode}
											</div>
											&gt;
											<div className={styles.favourites_tag}>
												{t('hsClassification:hs_code_classification_favourite_text_5')}
												{' '}
												-
												{book.chapterCode}
											</div>
											&gt;
											<div className={styles.favourites_tag}>
												{t('hsClassification:hs_code_classification_favourite_text_6')}
												{' '}
												-
												{book.headingCode}
											</div>
											|
											<div className={styles.favourites_tag} style={{ color: '#9B86F6' }}>
												{t('hsClassification:hs_code_classification_favourite_text_7')}
												{' '}
												-
												<span>
													{' '}
													{book.countryName}
												</span>
											</div>
										</>
									)}
								</div>
							</div>
						</div>
					))}
			</Modal.Body>
		</Modal>
	);
}

export default Favourites;
