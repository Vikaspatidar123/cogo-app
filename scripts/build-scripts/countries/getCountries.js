const https = require('https');

const { sortBy } = require('@cogoport/utils');

const MAIN_COUNTRY_CODES = ['IN'];

const getCountries = async (callBack, path, baseUrl) => {
	// eslint-disable-next-line max-len
	const actualUrl = `${baseUrl}location/list_locations?filters%5Btype%5D%5B%5D=country&filters%5Bstatus%5D=active&page_limit=500`;

	https
		.get(actualUrl, (resp) => {
			let data = '';

			resp.on('data', (chunk) => {
				data += chunk;
			});

			resp.on('end', () => {
				const { list } = JSON.parse(data);

				const sortedList = sortBy(list, [
					(o) => (MAIN_COUNTRY_CODES.includes(o.country_code) ? 0 : 1),
					'name',
				]);

				const finalList = sortedList.map((item) => ({
					id                  : item.id,
					name                : item.name,
					flag_icon_url       : item.flag_icon_url,
					currency_code       : item.currency_code,
					mobile_country_code : item.mobile_country_code,
					country_code        : item.country_code,
				}));

				callBack(path, JSON.stringify(finalList));
			});
		})
		.on('error', (err) => {
			console.log(`Error in getCountries func: ${err.message}`);
		});
};

module.exports = getCountries;
