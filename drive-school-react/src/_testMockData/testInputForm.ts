export const testInputFormWithOutErrors = { 
	firstName: { value: "Ancis", error: "" },
	lastName: { value: "Legis", error: "" },
	yearOfBirth: { value: "1995", error: "" },
	email: { value: "bbb@bb.bb", error: "" },
	mobilePhone: { value: "987654321", error: "" },
	address: { value: "Austrumu iela 6", error: "" },
	city: { value: "Rezekne", error: "" },
	trainingCategory: { value: "Z", error: "" },
	examTime: { value: "2025", error: "" },
}

export const testInputFormWithErrors = { 
	firstName: { value: "", error: "A" },
	lastName: { value: "", error: "A" },
	yearOfBirth: { value: "", error: "A" },
	email: { value: "", error: "A" },
	mobilePhone: { value: "", error: "A" },
	address: { value: "", error: "A" },
	city: { value: "", error: "A" },
	trainingCategory: { value: "", error: "A" },
	examTime: { value: "", error: "A" },
}