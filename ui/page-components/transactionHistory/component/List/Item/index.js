import { Tooltip } from '@cogoport/components';
import { IcMArrowRotateDown } from '@cogoport/icons-react';
import { shape, arrayOf } from 'prop-types';
import { useState, useEffect } from 'react';

import useGetDrillDownData from '../../../hooks/useGetDrillDownData';
import Bill from '../Bill';
import MobileBill from '../MobileBill';

import MobileView from './MobileView';
import itemFunctions from './renderFunctions';
import styles from './styles.module.css';

import getValue from '@/ui/commons/utils/getValue';

const Item = ({
	item,
	fields,
	handleClick,
	loading,
	isMobel = false,
	functions,
	sort,
	isMobile,
}) => {
	const { refetchDrillDownData, drillDownData, drillDownLoading } = useGetDrillDownData();
	const [showDrill, setShowDrill] = useState(false);
	const onOpen = (itm) => {
		setShowDrill(!showDrill);
		if (!showDrill) refetchDrillDownData(itm?.billId);
	};
	useEffect(() => {
		setShowDrill(false);
	}, [sort]);
	const { newFunctions } = itemFunctions({ functions, isMobile });

	const infoData = (singleItem, itm) => {
		if (singleItem?.toolTip) {
			return (
				<Tooltip
					content={(
						<div style={{ color: 'grey' }}>
							{getValue(itm, singleItem, isMobel, newFunctions)}
						</div>
					)}
					theme="light"
				>
					<div className={styles.info}>{getValue(itm, singleItem, isMobel, newFunctions)}</div>
				</Tooltip>
			);
		}
		return getValue(itm, singleItem, isMobel, newFunctions);
	};
	const renderItem = (itm) => (
		<div className={`${styles.container} ${(showDrill && 'displayDrill', isMobile && 'mobile')}`}>
			{isMobile ? (
				<MobileView fields={fields} infoData={infoData} itm={itm} loading={loading} />
			) : (
				<div className={styles.row} role="presentation" onClick={handleClick}>
					{(fields || []).map((singleItem) => (
						<div
							className={styles.col}
							style={singleItem.styles}
							key={singleItem?.key}
						>
							{/* {loading && (
								<Skeleton style={{ height: '20px', width: '100%' }}>
									<rect width="100%" height="20px" />
								</Skeleton>
							)} */}

							{singleItem.render && !loading ? singleItem.render(itm) : null}
							{infoData(singleItem, itm)}
						</div>
					))}
				</div>
			)}

			<div className={styles.arrow} role="presentation" onClick={() => onOpen(itm)}>
				<div className={styles.arrow_icon_div}>
					<IcMArrowRotateDown
						width={15}
						height={15}
						className={`${showDrill && 'rotateIcon'} hyperlinkIcon`}
					/>
				</div>
			</div>

			<div className={showDrill ? `${styles.drill_down}${styles.displayDrill}` : `${styles.drill_down}`}>
				{!drillDownLoading && !isMobile && (
					<div className={`${isMobile ? 'mobile' : 'parent'} `}>
						<div className={`${!isMobile && 'bill'} `}>
							<Bill drillDownData={drillDownData} isMobile={isMobile} />
						</div>
					</div>
				)}
				{!drillDownLoading && isMobile && (
					<div className={`${isMobile ? 'mobile' : 'parent'} `}>
						<div className={`${!isMobile && 'bill'} `}>
							<MobileBill drillDownData={drillDownData} isMobile={isMobile} />
						</div>
					</div>
				)}

				{/* <Flex>
					{drillDownLoading
						&& [1, 2].map(() => (
							<Skeleton
								style={{
									height : '100px',
									width  : isMobile ? '90%' : '50%',
									margin : '15px',
								}}
							>
								<rect width="100%" height="20px" />
							</Skeleton>
						))}
				</Flex> */}
			</div>
		</div>
	);

	return renderItem(item);
};

Item.propTypes = {
	item   : shape({}).isRequired,
	fields : arrayOf(shape({})).isRequired,
};

Item.defaultProps = {};

export default Item;
