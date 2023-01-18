// import { useContext } from 'react';
import Link from 'next/link';

import { useSelector } from '@/packages/store';

// import { RoutesContext } from './RoutesProvider';

function LinkComponent({
	href, as, children, withPrefix, ...rest
}) {
	// const routesContext = useContext(RoutesContext);
	const { pathPrefix, asPrefix, locale } = useSelector((s) => s.general);

	const newHref = withPrefix ? `${pathPrefix || ''}${href}` : href;
	const newAs = withPrefix ? `${asPrefix || ''}${as || href}` : as || href;

	return (
		<Link {...rest} href={newHref} as={newAs} locale={locale}>
			{children}
		</Link>
	);
}

LinkComponent.defaultProps = {
	withPrefix : true,
	as         : '',
};

export default LinkComponent;
