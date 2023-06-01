import { InputErrors } from "../types/inputErrors";
import { InputForm } from "../types/inputForm";

export const inputFieldErrors = (inputData: InputForm, validationErrors: InputErrors): InputForm => {
    return {
        firstName: { value: inputData.firstName.value, error: validationErrors.firstName },
        lastName: { value: inputData.lastName.value, error: validationErrors.lastName },
        yearOfBirth: { value: inputData.yearOfBirth.value, error: validationErrors.yearOfBirth },
        email: { value: inputData.email.value, error: validationErrors.email },
        mobilePhone: { value: inputData.mobilePhone.value, error: validationErrors.mobilePhone },
        address: { value: inputData.address.value, error: validationErrors.address },
        city: { value: inputData.city.value, error: validationErrors.city },
        trainingCategory: { value: inputData.trainingCategory.value, error: validationErrors.trainingCategory },
        examTime: { value: inputData.examTime.value, error: validationErrors.examTime }
    };
}