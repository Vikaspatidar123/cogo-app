const showTag = (item) => {
	const expiring = item?.expiring || false;
	const explored = item?.explored;
	const detail = item?.detail || {};
	const noRates = detail?.rates_count;
	const showTagData = [];

	if (expiring === true) showTagData.push('expiring');
	if (!noRates) showTagData.push('no_rates');
	if (explored === false && !showTagData.includes('no_rates')) { showTagData.push('explore'); }

	return showTagData;
};

const getTagData = (item) => {
	const showTagData = showTag(item);
	const dataObject = {
		expiring: {
			color     : '#BF291E',
			bgColor   : '#FDEBE9',
			valueText : 'Expiring',
		},
		explore: {
			color     : '#4D4000',
			bgColor   : '#FFFCE6',
			valueText : 'Explore Rates',
		},
		no_rates: {
			color     : '#4D4000',
			bgColor   : '#FEF3E9',
			valueText : 'No Rates',
		},
	};

	const finalData = showTagData.map((itm) => dataObject[itm]);
	return finalData;
};

export default getTagData;
