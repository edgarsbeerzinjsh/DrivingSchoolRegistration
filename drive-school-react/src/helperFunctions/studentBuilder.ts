import { InputForm } from "../types/inputForm";
import { Student } from "../types/student";

export const studentBuilder = (inputData: InputForm, theory: boolean): Student => {
    return {
        firstName: inputData.firstName.value,
        lastName: inputData.lastName.value,
        yearOfBirth: new Date(inputData.yearOfBirth.value),
        email: inputData.email.value,
        mobilePhone: inputData.phone.value,
        address: inputData.address.value,
        city: inputData.city.value,
        trainingCategory: inputData.trainingCategory.value,
        isTheory: theory,
        isPractical: !theory,
        examTime:
            inputData.examTime.value === ""
                ? null
                : new Date(inputData.examTime.value),
    };
}