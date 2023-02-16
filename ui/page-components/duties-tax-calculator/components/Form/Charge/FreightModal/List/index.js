import Radio from '@cogoport/components';

import { shortFormatNumber } from '../../../../../utils/getShortFormatNumber';

// import { Row, Col } from '../styles';
import styles from '../styles.module.css';

const List = ({
	rates = [], isMobile = false, checked = '', checkboxHandler,
}) => rates.map((item) => (!isMobile ? (
	<div className={styles.row} key={item?.card}>
		<div>
			<Radio
				label=""
				className="primary lg"
				checked={checked === item?.card}
				onChange={() => checkboxHandler(item)}
			/>
		</div>
		<Col className={styles.icon}>
			{item?.shipping_line?.logo_url || item?.airline?.logo_url ? (
				<img
					className="imgIcon"
					src={item?.shipping_line?.logo_url || item?.airline?.logo_url}
					alt="logo"
				/>
			) : (
				<div className="imgAlt">
					<i>(logo)</i>
				</div>
			)}
		</Col>
		<Col className="name">
			{item?.shipping_line?.business_name || item?.airline?.business_name}
		</Col>
		<Col className="price">
			{shortFormatNumber(item?.total_price, item?.total_price_currency, true)}
		</Col>
	</div>
) : (
	<Row key={item?.card} className={`${checked === item?.card && 'selectedRow'}`}>
		<div>
			<Col className="icon">
				<img
					className="imgIcon"
					src={item?.shipping_line?.logo_url || item?.airline?.logo_url}
					alt="logo"
				/>
			</Col>
			<Col className="name">
				{item?.shipping_line?.business_name || item?.airline?.business_name}
			</Col>
		</div>
		<div className="rateSection">
			<Col className="price">
				{shortFormatNumber(item?.total_price, item?.total_price_currency, true)}
			</Col>
			<Col>
				<Radio
					label=""
					className="primary lg"
					checked={checked === item?.card}
					onChange={() => checkboxHandler(item)}
				/>
			</Col>
		</div>
	</Row>
)));

export default List;
