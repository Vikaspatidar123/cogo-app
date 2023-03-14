const https = require('https');

const { sortBy } = require('@cogoport/utils');

const MAIN_COUNTRY_CODES = ['IN'];

const getCountries = async (callBack, path, baseUrl) => {
	const actualUrl = `${baseUrl}location/list_locations?filters=%7B"type"%3A"
	country"%7D&includes=%7B"default_params_required"%3A1%2C"mobile_country_code"%3A1%2C"
	currency_code"%3A1%2C"flag_icon_url"%3A1%7D&page=1&page_limit=500`;

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
