import { useRef } from 'react';

const useGetRefHandlers = ({ toggleUserChat, setCreateLoading, createLoading }) => {
	const isDraggingRef = useRef(false);

	const handleClick = async () => {
		if (!createLoading) {
			setCreateLoading(true);
			await toggleUserChat();
			setCreateLoading(false);
		}
	};

	const onDrag = () => {
		isDraggingRef.current = true;
	};

	const onStop = () => {
		if (!isDraggingRef.current) {
			handleClick();
		}
		isDraggingRef.current = false;
	};

	return { onDrag, onStop };
};

export default useGetRefHandlers;
