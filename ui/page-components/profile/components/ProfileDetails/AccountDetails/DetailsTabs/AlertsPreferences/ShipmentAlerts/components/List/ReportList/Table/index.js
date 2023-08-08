import { useRef, forwardRef } from 'react';

// import Body from './Body';
import Header from './Header';
import Title from './Title';

export const SCROLL_VALUE = 220;

function Table(props) {
	const scrollRef = useRef({ header: {}, body: {} });
	const { reportData } = props || {};

	const { data_points = [], service_wise_columns } = reportData || {};
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
				const header = Object.values(info || {});
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
							props={props}
						/>
						<Header
							header={header}
							// values={value}
							serviceName={item}
							scrollHandler={scrollHandlerLeft(index)}
							scrollHandlerRight={scrollHandlerRight(index)}
							props={props}
							ref={(r) => {
								scrollRef.current.header[index] = r;
							}}
						/>
						{/* <Body
							values={value}
							header={header}
							index={index}
							ref={scrollRef}
							props={props}
						/> */}
					</div>
				);
			})}

		</div>
	);
}

export default forwardRef(Table);
