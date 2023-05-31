import React, { useState } from "react";
import { InputField } from "./components/InputField";
import "./App.css";
import { InputTypeOfTraining } from "./components/InputTypeOfTraining";
import { Student } from "./types/student";
import axios from "axios";
import { SERVER_LINKS } from "./constants/serverUrl";

function App() {
	const [isExam, setIsExam] = useState(false);
	const [isTheory, setIsTheory] = useState(true);
	const [inputForm, setInputForm] = useState({
		firstName: { value: "", error: "" },
		lastName: { value: "", error: "" },
		yearOfBirth: { value: "", error: "" },
		email: { value: "", error: "" },
		phone: { value: "", error: "" },
		address: { value: "", error: "" },
		city: { value: "", error: "" },
		trainingCategory: { value: "", error: "" },
		examTime: { value: "", error: "" },
	});

	const changeInputForm = (value: string, error: string, key: string) => {
		return setInputForm({
			...inputForm,
			[key]: {
				...inputForm[key as keyof typeof inputForm],
				value: value,
				error: error,
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
				error={inputForm[fieldName as keyof typeof inputForm].error}
				onInputChange={(newValue) => {
					changeInputForm(newValue, "", fieldName);
				}}>
				{fieldValue}
			</InputField>
		);
	};

	const studentBuilder: Student = {
		firstName: inputForm.firstName.value,
		lastName: inputForm.lastName.value,
		yearOfBirth: new Date(inputForm.yearOfBirth.value),
		email: inputForm.email.value,
		mobilePhone: inputForm.phone.value,
		address: inputForm.address.value,
		city: inputForm.city.value,
		trainingCategory: inputForm.trainingCategory.value,
		isTheory: isTheory,
		isPractical: !isTheory,
		examTime:
			inputForm.examTime.value === ""
				? null
				: new Date(inputForm.examTime.value),
	};

	console.log(studentBuilder);

	const submitStudent = async () => {
		try {
			const { data } = await axios.put(SERVER_LINKS, studentBuilder);
			console.log(data);
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<form
			className="AppForm"
			onSubmit={(e) => {
				e.preventDefault();
				submitStudent();
			}}>
			{customInputField("text", "firstName", "First name")}
			{customInputField("text", "lastName", "Last name")}
			{customInputField("date", "yearOfBirth", "Birth date")}
			{customInputField("email", "email", "Email")}
			{customInputField("tel", "phone", "Phone number")}
			{customInputField("text", "address", "Adrdress")}
			{customInputField("text", "city", "City/ Parish/ Village")}
			{customInputField("text", "trainingCategory", "Training category")}
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
