import toHtml from 'mjml';

const mjmlToHtml = (req, res) => {
	let response = {};
	try {
		let html_output = toHtml(req.body.mjml, { minify: true }).html;
		html_output = html_output.replace(/(@v)/g, '');
		html_output = html_output.replace(/(@-ms)/g, '');
		response = res.json({ success: true, html_output });
	} catch (e) {
		response = res.json({ success: false, messages: ['Received Template is Invalid'] });
	}
	return response;
};

export default mjmlToHtml;
