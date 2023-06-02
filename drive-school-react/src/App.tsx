import { useState } from "react";
import { InputField } from "./components/InputField";
import "./App.scss";
import { InputTypeOfTraining } from "./components/InputTypeOfTraining";
import axios, { AxiosError } from "axios";
import { EMPTY_INPUT_FORM } from "./constants/emptyInputForm";
import { multipleFieldInputBuilder } from "./constants/multipleFieldInputFormBuilder";
import { studentBuilder } from "./helperFunctions/studentBuilder";
import { Student } from "./types/student";
import { inputFieldErrors } from "./helperFunctions/inputFieldErrors";
import { inputFieldValidation } from "./helperFunctions/inputFieldValidation";

function App() {
	const [isExam, setIsExam] = useState(false);
	const [isTheory, setIsTheory] = useState(true);
	const [inputForm, setInputForm] = useState(EMPTY_INPUT_FORM);
	const [isLoading, setIsLoading] = useState(false);

	const changeInputForm = (value: string, key: string) => {
		return setInputForm({
			...inputForm,
			[key]: {
				...inputForm[key as keyof typeof inputForm],
				value: value,
			},
		});
	};

	const customInputField = (
		fieldType: string,
		fieldName: string,
		fieldValue: string
	) => {
		return (
			<InputField
				typeOfField={fieldType}
				name={fieldName}
				value={inputForm[fieldName as keyof typeof inputForm].value}
				error={inputForm[fieldName as keyof typeof inputForm].error}
				onInputChange={(newValue) => {
					changeInputForm(newValue, fieldName);
				}}>
				{fieldValue}
			</InputField>
		);
	};

	const submitStudent = async (newStudent: Student) => {
		try {
			if (process.env.REACT_APP_API_LINK === undefined) {
				throw new Error("API link not found");
			}

			const { data } = await axios.put(
				process.env.REACT_APP_API_LINK,
				newStudent
			);
			alert("Student added successfully");
			setInputForm(EMPTY_INPUT_FORM);
			setIsTheory(true);
			setIsExam(false);
			console.log(data);
		} catch (error) {
			if (axios.isAxiosError(error)) {
				const axiosError = error as AxiosError;
				if (axiosError.response) {
					const errorDetails = axiosError.response.data;
					console.log(errorDetails);
				}
			} else {
				console.log("full", error);
			}

			alert("Error adding student");
		}

		setIsLoading(false);
	};

	return (
		<div>
			<h1>Student Registration</h1>
			{isLoading && <div className="loading-text">Sending data...</div>}
			<form
				noValidate
				className="AppForm"
				onSubmit={(e) => {
					e.preventDefault();
					setIsLoading(true);
					const student = studentBuilder(inputForm, isExam);
					let inputErrors = inputFieldValidation(student, isExam);

					if (Object.values(inputErrors).every((i) => i === "")) {
						submitStudent(student);
					} else {
						setInputForm(inputFieldErrors(inputForm, inputErrors));
						setIsLoading(false);
					}
				}}>
				{multipleFieldInputBuilder.map((i) => (
					<div key={i.fieldName}>
						{customInputField(i.fieldType, i.fieldName, i.fieldValue)}
					</div>
				))}
				<div className="type-of-training-container">
					Choose type of training:
					<InputTypeOfTraining
						isTheoryStart={isTheory}
						onInputChange={(newTheory) => {
							setIsTheory(newTheory);
						}}
					/>
				</div>
				<label
					htmlFor="isExam"
					className="checkbox-exam">
					Enroll for exam?
					<input
						className="exam-checkbox-input"
						type="checkbox"
						id="isExam"
						checked={isExam}
						onChange={() => {
							setIsExam(!isExam);
							if (isExam) {
								changeInputForm("", "examTime");
							}
						}}
					/>
				</label>
				{isExam &&
					customInputField(
						"datetime-local",
						"examTime",
						"Date and time of exam"
					)}

				<button
					type="submit"
					className="submit-button"
					disabled={isLoading}>
					Submit
				</button>
			</form>
		</div>
	);
}

export default App;
