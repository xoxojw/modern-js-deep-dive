// fulfilled된 프로미스
// const fulfilled = new Promise(resolve => resolve(1));

const fulfilled = new Promise((resolve, reject) => {
	setTimeout(() => {
		if (Math.random() > 0.5) resolve(1);
		else reject(2);
	}, 3000);
})
	.then(res => console.log(res), err => console.error(err)) // then의 첫 번째 인자 -fulfilled 상태일 때 호출됨(resolve 함수가 호출된 상태), 두 번째 인자-rejected 상태일 때 호출됨(reject 함수가 호출된 상태)

const fulfilled2 = new Promise((resolve, reject) => {
	setTimeout(() => {
		if (Math.random() > 0.5) resolve(1);
		else reject(2);
	}, 3000);
})
	.then(res => console.log(res))
	.catch(err => console.error(err)); // then이 두 개의 인자를 받을 수 있는 것과 달리 catch는 한 가지 인자(rejected 상태일 때)만 받는다.

const prom = (val) =>
	new Promise((resolve, reject) => {
		setTimeout(() => {
			if (val > 0.5) resolve(1);
			else reject(2);
		}, 1000);
	})
		.then((res) => console.log(res))
		.catch((err) => console.error(err))
		.finally(() => console.log('finally'))
		.then(() => console.log('then')); // then, catch, finally는 언제나 프로미스를 반환하기 때문에 then/catch/finally를 또 태울 수 있음

const prom2 = (val) =>
	new Promise((resolve, reject) => {
		setTimeout(() => {
			if (val > 0.5) resolve(1);
			else reject(2);
		}, 1000);
	})
		.then((res) => console.log(res))
		.finally(() => console.log("finally"))
		.then(() => console.log("then"))
		.catch((err) => console.error(err)) // finally 이후 마지막 catch로 넘어옴