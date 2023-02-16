import { Skeleton } from '@cogoport/front/components/admin';
import { Container, Label, Value, Div, Icon } from './styles';

const MobileView = ({ fields, infoData, itm, loading }) => {
	const data = {};
	fields.forEach((singleItem) => {
		data[singleItem?.label || 'renderIcon'] = singleItem;
	});
	return (
		<Container>
			{loading ? (
				<>
					{[...Array(5).keys()].map(() => {
						return (
							<Div>
								<Label>
									<Skeleton height="16px" width="80px" />
								</Label>
								<Value>
									<Skeleton height="16px" width="200px" />
								</Value>
							</Div>
						);
					})}
				</>
			) : (
				<>
					{data?.renderIcon && <Icon>{infoData(data.renderIcon, itm)}</Icon>}
					{['Name', 'Category', 'SubCategory', 'Cost Price', 'Selling Price'].map(
						(key) => (
							<Div>
								<Label>{key}:</Label>
								<Value>{infoData(data[key], itm)}</Value>
							</Div>
						),
					)}
				</>
			)}
		</Container>
	);
};
export default MobileView;
