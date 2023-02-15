// import Skeleton from '@cogoport/front/components/admin/Skeleton';
import { Modal } from '@cogoport/components';
import { IcMDelete } from '@cogoport/icons-react';

// import { useSaasState } from '../../../../common/context';
import AddProductModal from '../AddProductModal';
// import {
// 	Card,
// 	DivHs,
// 	DivSection,
// 	NoData,
// 	Title,
// 	ModalView,
// 	Line,
// 	FavouritesTag,
// } from '../styles';

import styles from '../styles.module.css';

function Favourites({
	openSelectedModal,
	setOpenSelectedModal,
	bookmarkData,
	refetchGetBookmark,
	refetchRemoveBookmark,
	loading,
}) {
	// const { isMobile } = useSaasState();
	const { list = [] } = bookmarkData || {};
	const isBookmarkEmpty = list.length === 0;

	const addLoader = (mobileWidth, desktopWidth) => '..Loading';
	// if (isMobile) {
	// 	return '..Loading';
	// 	// <Skeleton width={mobileWidth} height="15px" />;\
	// }

	if (openSelectedModal && isBookmarkEmpty && !loading) {
		return (
			<Modal
				show={openSelectedModal}
				onClose={() => setOpenSelectedModal(false)}
				width={1000}
			>
				<div className={`${styles.no_data}`}>No Data Found</div>
			</Modal>
		);
	}
	if (openSelectedModal) {
		return (
			<Modal
				className={`${styles.ui_modal}`}
				show={openSelectedModal}
				onClose={() => setOpenSelectedModal(false)}
			>
				<div className={`${styles.title} ${styles.bookmark}`}>Favourites</div>
				<div className={`${styles.line}`} />
				{(list || []).map((book) => (
					<div className={`${styles.card} ${styles.bookmark}`}>
						<div className={`${styles.bm}`}>
							<div className={`${styles.div_hs}`}>
								<div>
									{loading ? (
										addLoader('40px', '250px')
									) : (
										<div>
											<b>HS Code</b>
											{' '}
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
										className={`${styles.deleteIcon} ${styles.svg}`}
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

							<div className={`${styles.div_hs}`}>
								{loading ? (
									addLoader('40px', '250px')
								) : (
									<div>
										<b>Description</b>
										{' '}
										-
										{book.description}
									</div>
								)}
							</div>

							<div className={`${styles.div_section}`}>
								{loading ? (
									addLoader('40px', '400px')
								) : (
									<>
										<div className={`${styles.favourites_tag}`}>
											Section -
											{book.sectionCode}
										</div>
										&gt;
										<div className={`${styles.favourites_tag}`}>
											Chapter -
											{book.chapterCode}
										</div>
										&gt;
										<div className={`${styles.favourites_tag}`}>
											Heading -
											{book.headingCode}
										</div>
										|
										<div className={`${styles.favourites_tag}`} style={{ color: '#9B86F6' }}>
											Country -
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
			</Modal>
		);
	}
	return null;
}

export default Favourites;
