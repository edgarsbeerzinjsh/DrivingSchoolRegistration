import React, { useState } from 'react';
import { InputField } from './components/InputField';
import './App.css';
import { InputTypeOfTraining } from './components/InputTypeOfTraining';

function App() {
  const [isExam, setIsExam] = useState(false);
  const [isTheory, setIsTheory] = useState(true);
  const [inputForm, setInputForm] = useState({
    firstName: {value: '', error: ''},
    lastName: {value: '', error: ''},
    yearOfBirth: {value: '', error: ''},
    email: {value: '', error: ''},
    phone: {value: '', error: ''},
    address: {value: '', error: ''},
    city: {value: '', error: ''},
    trainingCategory: {value: '', error: ''},
    examTime: {value: '', error: ''}
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

  const customInputField = (fieldType: string, fieldName: string, fieldValue: string) => {
    return (
      <InputField
        typeOfField={fieldType}
        name={fieldName}
        error={inputForm[fieldName as keyof typeof inputForm].error}
        onInputChange={(newValue) => {
          changeInputForm(newValue, '', fieldName);
        }}>
          {fieldValue}
        </InputField>
    );
  }

  console.log(isTheory);
  console.log(inputForm);

  return (
    <form
      className='AppForm'
      onSubmit={(e) => {
        e.preventDefault();

      }}>

      {customInputField('text', 'firstName', 'First name')}
      {customInputField('text', 'lastName', 'Last name')}
      {customInputField('date', 'yearOfBirth', 'Birth date')}
      {customInputField('email', 'email', 'Email')}
      {customInputField('tel', 'phone', 'Phone number')}
      {customInputField('text', 'address', 'Adrdress')}
      {customInputField('text', 'city', 'City/ Parish/ Village')}
      {customInputField('text', 'trainingCategory', 'Training category')}
      <InputTypeOfTraining
        isTheoryStart={isTheory}
        onInputChange={(newTheory) => {
          setIsTheory(newTheory);
        }}/>

      <label htmlFor='isExam'>
        Enroll for exam?
            <input
                type='checkbox'
                id='isExam'
                checked={isExam}
                onChange={() => {
                    setIsExam(!isExam);
                }}
            />
      </label>
      {isExam && customInputField('datetime-local', 'examTime', 'Date and time of exam')}

      <button type='submit'>Submit</button>
    </form>
  );
}

export default App;