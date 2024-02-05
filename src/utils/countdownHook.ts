import { useState, useEffect } from 'react';

export const useCountdown = (initialTime: number) => {
	const [remaining, setRemaining] = useState("");

	useEffect(() => {
		const interval = setInterval(() => {
			const now = new Date().getTime();
			const distance = initialTime - now;

			const days = Math.floor(distance / (1000 * 60 * 60 * 24));
			const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
			const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
			const seconds = Math.floor((distance % (1000 * 60)) / 1000);
			
			const days2 = days < 10 ? `0${days}` : days;
			const hours2 = hours < 10 ? `0${hours}` : hours;
			const minutes2 = minutes < 10 ? `0${minutes}` : minutes;
			const seconds2 = seconds < 10 ? `0${seconds}` : seconds;
			
			// If the count down is finished, return 00:00:00:00
			if (distance < 0) {
				setRemaining("00 : 00 : 00 : 00");
				return;
			}
			setRemaining(`${days2} : ${hours2} : ${minutes2} : ${seconds2}`)
		}, 1000);

		return () => clearInterval(interval);
	}, [initialTime]);

	return remaining;
};