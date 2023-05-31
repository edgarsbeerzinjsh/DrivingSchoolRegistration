import { useState } from "react";

type InputTypeOfTrainingProps = {
	isTheoryStart: boolean;
	onInputChange: (newIsTheory: boolean) => void;
};

export const InputTypeOfTraining = ({
	isTheoryStart,
	onInputChange,
}: InputTypeOfTrainingProps) => {
	const [isTheory, setIsTheory] = useState(isTheoryStart);

	return (
		<div>
			<label htmlFor='Theory'>
                Theory
				<input
					type="radio"
					id='Theory'
					name="typeOfTraining"
					checked={isTheory}
					onChange={(e) => {
						setIsTheory(!!e.target.value);
						onInputChange(!!e.target.value);
					}}
				/>
			</label>
			<label htmlFor='Practical'>
                Practical
				<input
					type="radio"
					id='Practical'
					name="typeOfTraining"
					checked={!isTheory}
					onChange={(e) => {
						setIsTheory(!e.target.value);
						onInputChange(!e.target.value);
					}}
				/>
			</label>
		</div>
	);
};