const getApiErrorString = (messages) => Object.keys(messages || {})
	.map((_) => messages[_])
	.join(', ');

export default getApiErrorString;
