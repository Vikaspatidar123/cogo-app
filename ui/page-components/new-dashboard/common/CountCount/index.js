import { CountUp } from 'use-count-up';

import { Image } from '@/packages/next';
import GLOBAL_CONSTANTS from '@/ui/commons/constants/globals';

function CountCount({
    end_count = 0, duration = 5,
    isCounting = true, loading = false,
}) {
    if (loading) {
        return (
            <Image
                src={GLOBAL_CONSTANTS.image_url.loading}
                alt="loading"
                height={30}
                width={30}
            />
        );
    }
    return (
        <CountUp
            end={end_count}
            duration={duration}
            isCounting={isCounting}
        />
    );
}

export default CountCount;
