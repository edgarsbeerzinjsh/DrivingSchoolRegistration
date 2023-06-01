import { useEffect, useState } from "react";

type InputTypeOfTrainingProps = {
	isTheoryStart: boolean;
	onInputChange: (newIsTheory: boolean) => void;
};

export const InputTypeOfTraining = ({
	isTheoryStart,
	onInputChange,
}: InputTypeOfTrainingProps) => {
	const [isTheory, setIsTheory] = useState(isTheoryStart);

    useEffect(() => {
        setIsTheory(isTheoryStart);
    }, [isTheoryStart]);

	return (
		<div className="radio-group">
			<label htmlFor='Theory' className="radio-label">
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
			<label htmlFor='Practical' className="radio-label">
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