import Link from 'next/link';

import { useSelector } from '../../store';
import getModifiedRoutes from '../utils/getModifiedRoutes';

function LinkComponent({
	href,
	as,
	children,
	withPrefix,
	...rest
}) {
	// const organizationId = useSelector((s) => s?.profile?.organization
	// 	?.id);
	const { profile, general } = useSelector((s) => s);
	const { organization, branch } = profile || {};
	const { asPrefix } = general || {};
	const allStrings = asPrefix?.split('/');
	const organizationId = organization?.id || allStrings?.[1];
	const branchId = branch?.id;
	const { newHref, newAs } = getModifiedRoutes({
		href, as, organizationId, branchId, withPrefix,
	});

	return (
		<Link {...rest} href={newHref} as={newAs}>
			{children}
		</Link>
	);
}

LinkComponent.defaultProps = {
	withPrefix : true,
	as         : '',
};

export default LinkComponent;
