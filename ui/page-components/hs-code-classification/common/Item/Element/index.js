const getElement = ({ type, value }) => {
	switch (type) {
		case 'text':
			return <div>{value}</div>;
		default:
			return <div>{value || ' '}</div>;
	}
};

const Element = ({ type, value }) => getElement({ type, value });

export default Element;
