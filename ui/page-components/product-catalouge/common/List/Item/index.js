import { ToolTip, Skeleton } from '@cogoport/components';
// import { Skeleton } from '@cogoport/front/components/admin';
// import Grid from '@cogoport/front/components/Grid';
import { shape, arrayOf } from 'prop-types';

import MobileView from '../MobileViewIndex';

import itemFunctions from './renderFunctions';
// import { Row, Info, Container } from './styles';
import styles from './styles.module.css';

import getValue from '@/ui/commons/utils/getValue';

// const { Col } = Grid;
const Item = ({
	item,
	fields,
	handleClick,
	loading,
	isMobel = false,
	functions,
	isMobile,
}) => {
	const { newFunctions } = itemFunctions({ functions, isMobile });
	const infoData = (singleItem, itm) => {
		if (singleItem?.toolTip) {
			return (
				<ToolTip
					content={(
						<div style={{ color: 'grey' }}>
							{getValue(itm, singleItem, isMobel, newFunctions)}
						</div>
					)}
					theme="light"
				>
					<div className={styles.info}>{getValue(itm, singleItem, isMobel, newFunctions)}</div>
				</ToolTip>
			);
		}
		return getValue(itm, singleItem, isMobel, newFunctions);
	};
	const renderItem = (itm) => (
		<div className={`${styles.container}${isMobile && 'mobile'}`}>
			{isMobile ? (
				<MobileView fields={fields} infoData={infoData} itm={itm} loading={loading} />
			) : (
				<div className={styles.row_container} onClick={handleClick} role="presentation" tabIndex="0">
					{(fields || []).map((singleItem) => (
						<div
							className={styles.col_container}
							style={singleItem.styles}
							key={singleItem?.key}
							// className={singleItem?.key}
						>
							{loading && (
								<Skeleton style={{ height: '20px', width: '100%' }}>
									<rect width="100%" height="20px" />
								</Skeleton>
							)}
							{singleItem.render && !loading ? singleItem.render(itm) : null}
							{infoData(singleItem, itm)}
						</div>
					))}
				</div>
			)}
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
