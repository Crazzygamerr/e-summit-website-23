import { useCountdown } from "../utils/countdownHook";

interface CountdownProps {
	initialTime: number;
	isLarge: boolean;
}

const Countdown: React.FC<CountdownProps> = ({
	initialTime,
	isLarge
}: CountdownProps) => {
	const time = useCountdown(initialTime);
	
	if (isLarge) {
		return (
			<h1 className="text-lg sm:text-4xl md:text-5xl lg:text-6xl font-semibold">{time}</h1>
		);
	} else {
		return (
			<h1 className="text-lg sm:text-2xl font-bold">
				{time} Days
			</h1>
		);
	}
		
};

export default Countdown;