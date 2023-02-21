// import animate, { fadeIn } from '@cogoport/front/animate';
import { isEmpty } from '@cogoport/utils';
import { useState } from 'react';

import PocItem from './PocItem';
import SavePocDetailsModal from './SavePocDetailsModal';
import styles from './styles.module.css';

/**
 * @typedef  {Object} 	[props]
 * @property {Object} 	[data]
 * @property {function} [getAddressesList]
 * @property {string} 	[marginTop]
 */

// const FadeIn = animate({
// 	enter: {
// 		...fadeIn,
// 		easing   : 'easeInOutQuad',
// 		duration : 500,
// 	},
// 	exit: {
// 		opacity  : [1, 0],
// 		duration : 300,
// 	},
// });
function PocList(props) {
	const { data, getAddressesList, marginTop } = props;

	const [showPocList, setShowPocList] = useState(false);
	const [editPoc, setEditPoc] = useState({});

	if (isEmpty(data)) {
		return (
			<div className={styles.flex_container} style={{ marginTop }}>
				<div className={styles.text_container}>
					No Data Found
				</div>
			</div>
		);
	}
	const [firstPocData, ...restPocData] = data;

	return (
		<div className={styles.flex_container}>
			<div className={styles.flex_contaier} style={{ padding: '0px 16px' }}>
				<PocItem
					key={firstPocData?.id}
					data={firstPocData}
					onClickEditButton={() => setEditPoc(firstPocData)}
					marginBottom={firstPocData?.length === 1 ? '0px' : '8px'}
				/>
			</div>

			<div type={showPocList ? 'enter' : 'exit'}>
				<div className={styles.flex_contaier} style={{ padding: '0px 16px' }}>
					{restPocData.map((item, index) => (
						<PocItem
							key={item.id}
							data={item}
							onClickEditButton={() => setEditPoc(item)}
							marginBottom={index === restPocData.length - 1 ? 0 : '8px'}
						/>
					))}
				</div>
			</div>

			{restPocData?.length > 0 ? (
				<div className={styles.btn_align}>
					<div
						role="presentation"
						style={{
							color         : '#034AFD',
							textTransform : 'capitalize',
							fontSize      : '10px',
						}}
						onClick={() => setShowPocList((previousState) => !previousState)}
					>
						{showPocList
							? 'tions.tradeParty.addressList.pocList.buttons.c'
							: `$
								'profile:accountDetails.tabOptions.tradeParty.addressList.pocList.buttons.view',
							   ${data.length}`}
					</div>
				</div>
			) : null}

			<SavePocDetailsModal
				editPoc={editPoc}
				setEditPoc={setEditPoc}
				getAddressesList={getAddressesList}
			/>
		</div>
	);
}

export default PocList;
