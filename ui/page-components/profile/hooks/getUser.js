import { useRequest } from "@/packages/request"
import { Toast } from "@cogoport/components";
import { setProfileStoreState } from '@/packages/store/store/profile';
import { useSelector, useDispatch } from '@/packages/store';

const getUser = () => {
    const dispatch = useDispatch();
    const profileData = useSelector(({ profile }) => profile);
    const [{ loading }, trigger] = useRequest({
        url: '/get_user',
        method: 'get',
    }, { manual: true });
    console.log(profileData, 'profileData')
    const refetch = async () => {
        try {
            const resp = await trigger({});
            console.log(resp, 'resp')
            const { status = '', data } = resp || {}
            if (resp.status == 200) {
                Toast.success('Successfull Update Languages');
            }
            if (data) {
                dispatch(
                    setProfileStoreState({
                        ...profileData,
                        ...((data || {}).data || {}),
                    }),
                );
            }
        } catch (err) {
            Toast.error(err?.message);
        }
    };

    return { refetch }
};

export default getUser