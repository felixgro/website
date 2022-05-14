export default function debounce<A = unknown, R = void> (
	cb: (arg: A) => R,
	delay: number
) {
	let timeoutId: ReturnType<typeof setTimeout>;

	return function (this: any, arg: A) {
		clearTimeout(timeoutId);

		timeoutId = setTimeout(() => {
			cb.call(this, arg);
		}, delay);
	};
}
