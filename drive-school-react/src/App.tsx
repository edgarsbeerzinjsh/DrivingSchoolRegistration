import React, { useState } from "react";
import { InputField } from "./components/InputField";
import "./App.scss";
import { InputTypeOfTraining } from "./components/InputTypeOfTraining";
import axios from "axios";
import { SERVER_LINKS } from "./constants/serverUrl";
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
			const { data } = await axios.put(SERVER_LINKS, newStudent);
			alert("Student added successfully");
			setInputForm(EMPTY_INPUT_FORM);
			setIsTheory(true);
			setIsExam(false);
			console.log(data);
		} catch (error) {
			alert("Error adding student");
			console.log(error);
		}
	};

	console.log(inputForm);

	return (
		<form
			noValidate
			className="AppForm"
			onSubmit={(e) => {
				e.preventDefault();
				const student = studentBuilder(inputForm, isExam);
				let inputErrors = inputFieldValidation(student);

				if (Object.values(inputErrors).every((i) => i === "")) {
					submitStudent(student);
				} else {
					setInputForm(inputFieldErrors(inputForm, inputErrors));
				}
			}}>
			{multipleFieldInputBuilder.map((i) => (
				<div key={i.fieldName}>
					{customInputField(i.fieldType, i.fieldName, i.fieldValue)}
				</div>
			))}
			<InputTypeOfTraining
				isTheoryStart={isTheory}
				onInputChange={(newTheory) => {
					setIsTheory(newTheory);
				}}
			/>

			<label htmlFor="isExam">
				Enroll for exam?
				<input
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
				customInputField("datetime-local", "examTime", "Date and time of exam")}

			<button type="submit">Submit</button>
		</form>
	);
}

export default App;
