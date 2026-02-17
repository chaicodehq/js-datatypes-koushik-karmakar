/**
 * 📋 Jugaad Form Validator - Indian Style!
 *
 * India mein form bharna ek art hai! College admission ka form validate
 * karna hai. Har field ke apne rules hain. Tujhe ek errors object return
 * karna hai jisme galat fields ke error messages hain. Agar sab sahi hai
 * toh empty errors object aur isValid = true.
 *
 * formData object:
 *   { name, email, phone, age, pincode, state, agreeTerms }
 *
 * Validation Rules:
 *   1. name: must be a non-empty trimmed string, min 2 chars, max 50 chars
 *      Error: "Name must be 2-50 characters"
 *
 *   2. email: must be a string containing exactly one "@" and at least one "."
 *      after the "@". Use indexOf(), lastIndexOf(), includes().
 *      Error: "Invalid email format"
 *
 *   3. phone: must be a string of exactly 10 digits, starting with 6, 7, 8, or 9
 *      (Indian mobile numbers). Check each char is a digit.
 *      Error: "Invalid Indian phone number"
 *
 *   4. age: must be a number between 16 and 100 inclusive, and an integer.
 *      JUGAAD: Agar string mein number diya hai (e.g., "22"), toh parseInt()
 *      se convert karo. Agar convert nahi ho paya (isNaN), toh error.
 *      Error: "Age must be an integer between 16 and 100"
 *
 *   5. pincode: must be a string of exactly 6 digits, NOT starting with "0"
 *      Error: "Invalid Indian pincode"
 *
 *   6. state: Use optional chaining (?.) and nullish coalescing (??) -
 *      if state is null/undefined, treat as "". Must be a non-empty string.
 *      Error: "State is required"
 *
 *   7. agreeTerms: must be truthy (Boolean(agreeTerms) === true).
 *      Falsy values: 0, "", null, undefined, NaN, false
 *      Error: "Must agree to terms"
 *
 * Return:
 *   { isValid: boolean, errors: { fieldName: "error message", ... } }
 *   - isValid is true ONLY when errors object has zero keys
 *
 * Hint: Use typeof, Boolean(), parseInt(), isNaN(), Number.isInteger(),
 *   ?. (optional chaining), ?? (nullish coalescing), Object.keys(),
 *   startsWith(), trim(), length
 *
 * @param {object} formData - Form fields to validate
 * @returns {{ isValid: boolean, errors: object }}
 *
 * @example
 *   validateForm({
 *     name: "Rahul Sharma", email: "rahul@gmail.com", phone: "9876543210",
 *     age: 20, pincode: "400001", state: "Maharashtra", agreeTerms: true
 *   })
//  *   // => { isValid: true, errors: {} }
 *
 *   validateForm({
 *     name: "", email: "bad-email", phone: "12345", age: 10,
 *     pincode: "0123", state: null, agreeTerms: false
 *   })
//  *   // => { isValid: false, errors: { name: "...", email: "...", ... } }
//  */ {
  // (name, email, phone, age, pincode, state, agreeTerms);
}
export function validateForm(formData) {
  // Your code here
  // const { name, email, phone, age, pincode, state, agreeTerms } = formData;
  let name = formData?.name?.trim() ?? "";
  let email = formData?.email?.trim() ?? "";
  let phone = formData?.phone?.trim() ?? "";
  let age = formData?.age ?? "";
  let pincode = formData?.pincode?.trim() ?? "";
  let state = formData?.state?.trim() ?? "";
  let agreeTerms = formData?.agreeTerms;

  let error = {};
  let isValid = true;
  if (typeof name !== "string" || name.length < 2 || name.length > 50) {
    error.name = "Name must be 2-50 characters";
  }

  // email
  if (email === "" || typeof email !== "string") {
    error.email = "Invalid email format";
  }
  if (email.includes("@")) {
    let email_length = email.split("@").length;
    if (email_length !== 2) {
      error.email = "Invalid email format";
    }
    let isDot = email.split("@")[1].includes(".");

    if (!isDot) {
      error.email = "Invalid email format";
    }
  } else {
    error.email = "Invalid email format";
  }

  // number
  // 6, 7, 8, or 9
  let numArr = [6, 7, 8, 9];
  if (typeof phone !== "string" || phone.length !== 10) {
    error.phone = "Invalid Indian phone number";
  }
  if (!Number.isInteger(Number(phone)) || !numArr.includes(Number(phone[0]))) {
    error.phone = "Invalid Indian phone number";
  }

  // age /
  if (typeof age === "string") {
    age = parseInt(age);
    if (Number.isNaN(age)) {
      error.age = "Age must be an integer between 16 and 100";
    } else if (!Number.isInteger(age) || age < 16 || age > 100) {
      error.age = "Age must be an integer between 16 and 100";
    }
  } else if (!Number.isInteger(age) || age < 16 || age > 100) {
    error.age = "Age must be an integer between 16 and 100";
  }

  // pin
  if (/[a-zA-Z]/.test(pincode)) {
    error.pincode = "Invalid Indian pincode";
  } else if (
    typeof pincode !== "string" ||
    pincode.length !== 6 ||
    pincode[0].includes("0")
  ) {
    error.pincode = "Invalid Indian pincode";
  }

  // state

  if (state === null || state === undefined) {
    state = "";
  }
  if (typeof state !== "string" || state.length === 0) {
    error.state = "State is required";
  }

  // isValid
  if (Boolean(agreeTerms) !== true) {
    error.agreeTerms = "Must agree to terms";
  }

  if (Object.keys(error).length > 0) {
    isValid = false;
  }

  return { isValid, errors: error };
}
