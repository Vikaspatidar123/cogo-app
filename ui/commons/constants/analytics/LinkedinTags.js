import React from 'react';

const LinkedinTags = ({ linkedInPartnerId }) => (
	<>
		<script
			// eslint-disable-next-line react/no-danger
			dangerouslySetInnerHTML={{
				__html: `
					_linkedin_partner_id = "${linkedInPartnerId}";
					window._linkedin_data_partner_ids = window._linkedin_data_partner_ids || [];
					window._linkedin_data_partner_ids.push(_linkedin_partner_id);
				`,
			}}
			type="text/javascript"
		/><script
			// eslint-disable-next-line react/no-danger
			dangerouslySetInnerHTML={{
				__html: `
					(function(l) {
						if (!l){window.lintrk = function(a,b){window.lintrk.q.push([a,b])};
						window.lintrk.q=[]}
						var s = document.getElementsByTagName("script")[0];
						var b = document.createElement("script");
						b.type = "text/javascript";b.async = true;
						b.src = "https://snap.licdn.com/li.lms-analytics/insight.min.js";
						s.parentNode.insertBefore(b, s);
					})(window.lintrk);
				`,
			}}
			type="text/javascript"
		/>
		<noscript>
			<img
				height="1"
				width="1"
				style={{ display: 'none' }}
				alt=""
				src={`https://px.ads.linkedin.com/collect/?pid=${linkedInPartnerId}&fmt=gif`}
			/>
		</noscript>
	</>
);

export default LinkedinTags;
