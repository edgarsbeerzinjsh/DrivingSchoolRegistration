import React, { useState } from 'react';
import { InputField } from './components/InputField';
import './App.css';

function App() {
  const [isExam, setIsExam] = useState(false);
  const [inputForm, setInputForm] = useState({
    firstName: {value: '', error: ''},
    lastName: {value: '', error: ''},
    yearOfBirth: {value: '', error: ''},
    email: {value: '', error: ''},
    phone: {value: '', error: ''},
    address: {value: '', error: ''},
    city: {value: '', error: ''},
    trainingCategory: {value: '', error: ''},
    isTheory: {value: true, error: ''},
    isPractical: {value: false, error: ''},
    examTime: {value: '', error: ''}
  });

  const changeInputForm = (value: string, error: string, key: string) => {
    return setInputForm((prevInputForm) => {
      let parsedValue: boolean | string = value;
      if (key === 'isTheory' || key === 'isPractical')
      {
        parsedValue = value === 'true';
      }
   
      return {
        ...prevInputForm,
        [key]: {
          ...prevInputForm[key as keyof typeof prevInputForm],
          value: parsedValue,
          error: error,
        },
      }
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

      <label htmlFor='Theory'>
        Theory
            <input
                type='radio'
                id='Theory'
                name='typeOfTraining'
                value='true'
                checked={inputForm.isTheory.value}
                onChange={(e) => {
                  changeInputForm('true', '', 'isTheory');
                  changeInputForm('false', '', 'isPractical');
                }}
            />
        </label>

      <label htmlFor='Practical'>
        Practical
            <input
                type='radio'
                id='Practical'
                name='typeOfTraining'
                value='false'
                checked={inputForm.isPractical.value}
                onChange={(e) => {
                  changeInputForm('true', '', 'isPractical');
                  changeInputForm('false', '', 'isTheory');
                }}
            />
      </label>
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