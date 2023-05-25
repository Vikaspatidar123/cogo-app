const react = require('react');

// eslint-disable-next-line default-param-last
const getBoundedClick = (options = {}, myRef) => {
	const { onOuterClick = () => {}, onInnerClick = () => {} } = options;

	const ref = react.useRef();

	const currentRef = myRef || ref;

	const onClickAnywhere = (e) => {
		if (currentRef && currentRef.current) {
			const insideClick = currentRef.current.contains(e.target);
			if (insideClick) {
				onInnerClick(e);
			} else {
				onOuterClick(e);
			}
		}
	};

	react.useEffect(() => {
		window.addEventListener('click', onClickAnywhere, true);
		return () => {
			window.removeEventListener('click', onClickAnywhere, true);
		};
	});

	return currentRef;
};

module.exports = getBoundedClick;
