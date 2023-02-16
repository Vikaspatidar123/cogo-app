import { shape, arrayOf } from 'prop-types';
import Grid from '@cogoport/front/components/Grid';
import { Skeleton } from '@cogoport/front/components/admin';
import { ToolTip } from '@cogoport/front/components';
import getValue from '../../../../../common/utils/getValue';
import { Row, Info, Container } from './styles';
import itemFunctions from './renderFunctions';
import MobileView from '../MobileViewIndex';

const { Col } = Grid;
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
					content={
						<div style={{ color: 'grey' }}>
							{getValue(itm, singleItem, isMobel, newFunctions)}
						</div>
					}
					theme="light"
				>
					<Info>{getValue(itm, singleItem, isMobel, newFunctions)}</Info>
				</ToolTip>
			);
		}
		return getValue(itm, singleItem, isMobel, newFunctions);
	};
	const renderItem = (itm) => (
		<Container className={`${isMobile && 'mobile'}`}>
			{isMobile ? (
				<MobileView fields={fields} infoData={infoData} itm={itm} loading={loading} />
			) : (
				<Row onClick={handleClick} tabIndex="0">
					{(fields || []).map((singleItem) => (
						<Col
							xs={6}
							sm={6}
							md={singleItem.span}
							lg={singleItem.span}
							style={singleItem.styles}
							key={singleItem?.key}
							className={singleItem?.key}
						>
							{loading && (
								<Skeleton style={{ height: '20px', width: '100%' }}>
									<rect width="100%" height="20px" />
								</Skeleton>
							)}
							{singleItem.render && !loading ? singleItem.render(itm) : null}
							{infoData(singleItem, itm)}
						</Col>
					))}
				</Row>
			)}
		</Container>
	);

	return renderItem(item);
};

Item.propTypes = {
	item: shape({}).isRequired,
	fields: arrayOf(shape({})).isRequired,
};

Item.defaultProps = {};

export default Item;
