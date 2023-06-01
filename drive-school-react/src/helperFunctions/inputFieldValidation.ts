import { EMPTY_FIELD_ERROR } from "./../constants/emptyFieldError";
import { InputErrors } from "../types/inputErrors";
import { Student } from "../types/student";

export const inputFieldValidation = (inputData: Student, exam: boolean): InputErrors => {
    let errors: InputErrors = {...EMPTY_FIELD_ERROR};

    const isValidEmail = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(inputData.email);
    const isValidPhone = /^\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}$/.test(inputData.mobilePhone);
    const isBornDatePast = new Date(inputData.yearOfBirth).getTime() < new Date().getTime();
    const isExamDateFuture = inputData.examTime && new Date(inputData.examTime).getTime() > new Date().getTime();

    if (!inputData.firstName) {
        errors.firstName = "First name is required";
    }

    if (!inputData.lastName) {
        errors.lastName = "Last name is required";
    }

    if (!isBornDatePast) {
        errors.yearOfBirth = "Year of birth must be in the past";
    }

    if (inputData.yearOfBirth.toString() === "Invalid Date") {
        errors.yearOfBirth = "Year of birth must not be empty";
    }

    if (!isValidEmail) {
        errors.email = "Email is invalid";
    }

    if (!isValidPhone) {
        errors.mobilePhone = "Phone is invalid";
    }

    if (!inputData.address) {
        errors.address = "Address is required";
    }

    if (!inputData.city) {
        errors.city = "City/ Parish/ Village is required";
    }

    if (!inputData.trainingCategory) {
        errors.trainingCategory = "Training category is required";
    }

    if (!isExamDateFuture && (inputData.examTime ?? "")) {
        errors.examTime = "Exam time must be in the future";
    }

    if (exam && !inputData.examTime) {
        errors.examTime = "Exam time is required";
    }

    return errors;
}