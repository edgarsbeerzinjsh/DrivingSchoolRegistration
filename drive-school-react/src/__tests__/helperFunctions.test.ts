import { testInputErrors } from "../_testMockData/testInputErrors";
import { testInputFormWithOutErrors } from "../_testMockData/testInputForm"
import { testStudent } from "../_testMockData/testStudent";
import { inputFieldErrors } from "../helperFunctions/inputFieldErrors";
import { inputFieldValidation } from "../helperFunctions/inputFieldValidation";
import { studentBuilder } from "../helperFunctions/studentBuilder";
import { Student } from "../types/student";

describe("Helper functions", () => {
    it("Student builder: should create a student object", () => {
        const inputFieldValues =  {...testInputFormWithOutErrors};
        const istTestTheory = true;

        const newStudent = studentBuilder(inputFieldValues, istTestTheory);

        expect(newStudent.firstName).toEqual("Ancis");
        expect(newStudent.lastName).toEqual("Legis");
        expect(newStudent.yearOfBirth).toEqual(new Date("1995"));
        expect(newStudent.email).toEqual("bbb@bb.bb");
        expect(newStudent.mobilePhone).toEqual("987654321");
        expect(newStudent.address).toEqual("Austrumu iela 6");
        expect(newStudent.city).toEqual("Rezekne");
        expect(newStudent.trainingCategory).toEqual("Z");
        expect(newStudent.isTheory).toEqual(true);
        expect(newStudent.isPractical).toEqual(false);
        expect(newStudent.examTime).toEqual(new Date("2025"));
    });

    it("Input field Error: should create InputForm with errors", () => {
        const inputFieldValues =  {...testInputFormWithOutErrors};
        const inputErrors = {...testInputErrors};

        const newInputForm = inputFieldErrors(inputFieldValues, inputErrors);

        expect(newInputForm.firstName.value).toEqual("Ancis");
        expect(newInputForm.lastName.value).toEqual("Legis");
        expect(newInputForm.yearOfBirth.value).toEqual("1995");
        expect(newInputForm.email.value).toEqual("bbb@bb.bb");
        expect(newInputForm.mobilePhone.value).toEqual("987654321");
        expect(newInputForm.address.value).toEqual("Austrumu iela 6");
        expect(newInputForm.city.value).toEqual("Rezekne");
        expect(newInputForm.trainingCategory.value).toEqual("Z");
        expect(newInputForm.examTime.value).toEqual("2025");
        expect(newInputForm.firstName.error).toEqual("Z");
        expect(newInputForm.lastName.error).toEqual("Z");
        expect(newInputForm.yearOfBirth.error).toEqual("Z");
        expect(newInputForm.email.error).toEqual("Z");
        expect(newInputForm.mobilePhone.error).toEqual("Z");
        expect(newInputForm.address.error).toEqual("Z");
        expect(newInputForm.city.error).toEqual("Z");
        expect(newInputForm.trainingCategory.error).toEqual("Z");
        expect(newInputForm.examTime.error).toEqual("Z");
    });

    it("With valid student on validation: should create '' on all errors", () => {
        const student = {...testStudent};
        const exam = true;

        const newErrorList = inputFieldValidation(student, exam);

        expect(newErrorList.firstName).toEqual("");
        expect(newErrorList.lastName).toEqual("");
        expect(newErrorList.yearOfBirth).toEqual("");
        expect(newErrorList.email).toEqual("");
        expect(newErrorList.mobilePhone).toEqual("");
        expect(newErrorList.address).toEqual("");
        expect(newErrorList.city).toEqual("");
        expect(newErrorList.trainingCategory).toEqual("");
        expect(newErrorList.examTime).toEqual("");
    });

    it("Student for examination without first name, last name, address, city, training category and examination time on validation should return errors in appropriate fields", () => {
        const student: Student = {
            firstName: "",
            lastName: "",
            yearOfBirth: new Date(""),
            email: "aaaa@aa.aa",
            mobilePhone: "123456789",
            address: "",
            city: "",
            trainingCategory: "",
            isTheory: true,
            isPractical: false,
            examTime: null
        };
        const exam = true;

        const newErrorList = inputFieldValidation(student, exam);

        expect(newErrorList.firstName).toEqual("First name is required");
        expect(newErrorList.lastName).toEqual("Last name is required");
        expect(newErrorList.yearOfBirth).toEqual("Year of birth must not be empty");
        expect(newErrorList.email).toEqual("");
        expect(newErrorList.mobilePhone).toEqual("");
        expect(newErrorList.address).toEqual("Address is required");
        expect(newErrorList.city).toEqual("City/ Parish/ Village is required");
        expect(newErrorList.trainingCategory).toEqual("Training category is required");
        expect(newErrorList.examTime).toEqual("Exam time is required");
    });

    it("Student with year of birth in future should get error", () => {
        const student = {...testStudent,
                yearOfBirth: new Date("2025-01-01")
        }
        const exam = true;

        const newErrorList = inputFieldValidation(student, exam);

        expect(newErrorList.yearOfBirth).toEqual("Year of birth must be in the past");
    });
    
    it("Student with invalid email should get error", () => {
        const student = {...testStudent,
                email: "aaa"
        }
        const exam = true;

        const newErrorList = inputFieldValidation(student, exam);

        expect(newErrorList.email).toEqual("Email address is invalid");
    });

    it("Student with invalid phone number should get error", () => {
        const student = {...testStudent,
                mobilePhone: "12"
        }
        const exam = true;

        const newErrorList = inputFieldValidation(student, exam);

        expect(newErrorList.mobilePhone).toEqual("Phone number is invalid");
    });

    it("Student with examination time in past should get error", () => {
        const student = {...testStudent,
                examTime: new Date("2000-01-01")
        }
        const exam = true;

        const newErrorList = inputFieldValidation(student, exam);

        expect(newErrorList.examTime).toEqual("Exam time must be in the future");
    });

    it("Student without examination should not get error about examination time", () => {
        const student = {...testStudent,
                examTime: new Date("2000-01-01")
        }
        const exam = false;

        const newErrorList = inputFieldValidation(student, exam);

        expect(newErrorList.examTime).toEqual("");
    });    
})