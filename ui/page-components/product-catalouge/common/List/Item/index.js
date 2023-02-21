import { Tooltip, Loader } from '@cogoport/components';
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
		<div className={isMobile ? `${styles.container}${styles.mobile}` : `${styles.container}`}>
			{isMobile ? (
				<MobileView fields={fields} infoData={infoData} itm={itm} loading={loading} />
			) : (
				<div className={styles.row_container} onClick={handleClick} role="presentation" tabIndex="0">
					{loading && (
						<Loader style={{ height: '20px', width: '20px' }} />
					)}
					{!loading && (fields || []).map((singleItem) => (
						<div
							className={styles.col_container}
							style={singleItem.styles}
							key={singleItem?.key}
							// className={singleItem?.key}
						>
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
