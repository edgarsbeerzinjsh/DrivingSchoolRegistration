import React, { useState } from 'react';
import { InputField } from './components/InputField';
import './App.css';

function App() {
  const [inputForm, setInputForm] = useState('');

  const CustomInputField = (fieldType: string, fieldName: string, fieldValue: string) => {
    return (
      <InputField
        typeOfField={fieldType}
        name={fieldName}
        error=''
        onInputChange={(newValue) => {
          setInputForm(newValue);
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

      {CustomInputField('text', 'test', 'testy')}
      {CustomInputField('email', 'test', 'testy2')}



      {/* /* <label htmlFor='test'>
        TestTextrr
        <input type='text' id='test' 
        />
        Error
      </label> */}

      <button type='submit'>Submit</button>
    </form>
  );
}

export default App;