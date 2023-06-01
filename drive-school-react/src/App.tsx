import React, { useState } from "react";
import { InputField } from "./components/InputField";
import "./App.css";
import { InputTypeOfTraining } from "./components/InputTypeOfTraining";
import axios from "axios";
import { SERVER_LINKS } from "./constants/serverUrl";
import { EMPTY_INPUT_FORM } from "./constants/emptyInputForm";
import { multipleFieldInputBuilder } from "./constants/multipleFieldInputFormBuilder";
import { studentBuilder } from "./helperFunctions/studentBuilder";

function App() {
	const [isExam, setIsExam] = useState(false);
	const [isTheory, setIsTheory] = useState(true);
	const [inputForm, setInputForm] = useState(EMPTY_INPUT_FORM);

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

	const submitStudent = async () => {
		try {
			const { data } = await axios.put(SERVER_LINKS, studentBuilder(inputForm, isTheory));
      alert("Student added successfully");
      setInputForm(EMPTY_INPUT_FORM);
      console.log(data);
		} catch (error) {
      alert("Error adding student");
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

      {multipleFieldInputBuilder.map((i) => (
        <div key={i.fieldValue}>{customInputField(i.fieldType, i.fieldName, i.fieldValue)}</div>
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
