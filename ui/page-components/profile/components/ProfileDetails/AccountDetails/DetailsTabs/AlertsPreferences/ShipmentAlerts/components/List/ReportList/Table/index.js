import { useRef, forwardRef } from 'react';

import Body from './Body';
import Header from './Header';
import Title from './Title';

export const SCROLL_VALUE = 220;

function Table(props) {
	const scrollRef = useRef({ header: {}, body: {} });

	const { reportData = {}, tabelData = {}, shipmentLoading = false } = props || {};

	const { service_wise_columns, data_points = {} } = reportData || {};

	const { selected_data_points } = tabelData || {};

	const services = Object.keys(data_points || {});

	const scrollHandlerLeft = (index) => () => {
		if (scrollRef.current.header[index]) {
			scrollRef.current.header[index].scrollLeft += SCROLL_VALUE;

			Object.keys(scrollRef.current.body[index] || {}).forEach((ele) => {
				scrollRef.current.body[index][ele].scrollLeft += SCROLL_VALUE;
			});
		}
	};

	const scrollHandlerRight = (index) => () => {
		if (scrollRef.current.header[index]) {
			scrollRef.current.header[index].scrollLeft -= SCROLL_VALUE;

			Object.keys(scrollRef.current.body[index] || {}).forEach((ele) => {
				scrollRef.current.body[index][ele].scrollLeft -= SCROLL_VALUE;
			});
		}
	};

	return (
		<div>
			{(services || []).map((item, index) => {
				const info = data_points?.[item] || {};
				const head = selected_data_points?.[`${item}_shipments`];
				const header = Object.values(head || {});
				const headerKeys = Object.keys(info || {});
				const values = tabelData[`${item}_shipments`];
				const options = Object.keys(info).map((key) => ({
					label     : info[key],
					value     : key,
					isChecked : service_wise_columns?.[item]?.includes(key),
				}));
				const checkPoint = service_wise_columns?.[item].length;
				const totalPoint = header.length;
				return (
					<div key={`${index + 1}`}>
						<Title
							totalPoint={totalPoint}
							checkPoint={checkPoint}
							serviceName={item}
							options={options}
							{...props}
						/>
						<Header
							header={header}
							serviceName={item}
							scrollHandler={scrollHandlerLeft(index)}
							scrollHandlerRight={scrollHandlerRight(index)}
							shipmentLoading={shipmentLoading}
							{...props}
							ref={(r) => {
								scrollRef.current.header[index] = r;
							}}
						/>
						<Body
							values={values}
							header={headerKeys}
							index={index}
							ref={scrollRef}
							shipmentLoading={shipmentLoading}
							{...props}
						/>
					</div>
				);
			})}

		</div>
	);
}

export default forwardRef(Table);
