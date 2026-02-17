/**
 * 📝 School Report Card Generator
 *
 * Sharma ji ke bete ka report card generate karna hai! Student ka naam aur
 * subjects ke marks milenge, tujhe pura analysis karke report card banana hai.
 *
 * Rules:
 *   - student object: { name: "Rahul", marks: { maths: 85, science: 92, ... } }
 *   - Calculate using Object.values() and array methods:
 *     - totalMarks: sum of all marks (use reduce)
 *     - percentage: (totalMarks / (numSubjects * 100)) * 100,
 *       rounded to 2 decimal places using parseFloat(val.toFixed(2))
 *     - grade based on percentage:
 *       "A+" (>= 90), "A" (>= 80), "B" (>= 70), "C" (>= 60), "D" (>= 40), "F" (< 40)
 *     - highestSubject: subject name with highest marks (use Object.entries)
 *     - lowestSubject: subject name with lowest marks
 *     - passedSubjects: array of subject names where marks >= 40 (use filter)
 *     - failedSubjects: array of subject names where marks < 40
 *     - subjectCount: total number of subjects (Object.keys().length)
 *   - Hint: Use Object.keys(), Object.values(), Object.entries(),
 *     reduce(), filter(), map(), Math.max(), Math.min(), toFixed()
 *
 * Validation:
 *   - Agar student object nahi hai ya null hai, return null
 *   - Agar student.name string nahi hai ya empty hai, return null
 *   - Agar student.marks object nahi hai ya empty hai (no keys), return null
 *   - Agar koi mark valid number nahi hai (not between 0 and 100 inclusive),
 *     return null
 *
 * @param {{ name: string, marks: Object<string, number> }} student
 * @returns {{ name: string, totalMarks: number, percentage: number, grade: string, highestSubject: string, lowestSubject: string, passedSubjects: string[], failedSubjects: string[], subjectCount: number } | null}
 *
 * @example
 *   generateReportCard({ name: "Rahul", marks: { maths: 85, science: 92, english: 78 } })
//  *   // => { name: "Rahul", totalMarks: 255, percentage: 85, grade: "A",
//  *   //      highestSubject: "science", lowestSubject: "english",
//  *   //      passedSubjects: ["maths", "science", "english"], failedSubjects: [],
//  *   //      subjectCount: 3 }
 *
 *   generateReportCard({ name: "Priya", marks: { maths: 35, science: 28 } })
//  *   // => { name: "Priya", totalMarks: 63, percentage: 31.5, grade: "F", ... }
"A+" (>= 90), "A" (>= 80), "B" (>= 70), "C" (>= 60), "D" (>= 40), "F" (< 40)
 */
export function generateReportCard(student) {
  if (
    typeof student !== "object" ||
    student === null ||
    typeof student.name !== "string" ||
    student.name.length === 0 ||
    typeof student.marks !== "object" ||
    Object.keys(student.marks).length === 0
  )
    return null;

  let isMarks = Object.values(student.marks).every(
    (value) => typeof value === "number" && value >= 0 && value <= 100,
  );
  if (!isMarks) return null;

  let grade;
  let numSubjects = Object.keys(student.marks).length;
  let totalMarks = Object.values(student.marks).reduce((a, b) => a + b, 0);
  let percentage = parseFloat(
    ((totalMarks / (numSubjects * 100)) * 100).toFixed(2),
  );
  if (percentage >= 90) {
    grade = "A+";
  } else if (percentage >= 80) {
    grade = "A";
  } else if (percentage >= 70) {
    grade = "B";
  } else if (percentage >= 60) {
    grade = "C";
  } else if (percentage >= 40) {
    grade = "D";
  } else if (percentage < 40) {
    grade = "F";
  }

  const marksArr = Object.entries(student.marks);

  const maxSubject = marksArr.reduce((max, current) =>
    current[1] > max[1] ? current : max,
  );

  const minSubject = marksArr.reduce((min, current) =>
    current[1] < min[1] ? current : min,
  );

  let passedSubjects = marksArr
    .filter(([sub, mark]) => mark >= 40)
    .map(([sub]) => sub);
  let failedSubjects = marksArr
    .filter(([sub, mark]) => mark < 40)
    .map(([sub]) => sub);
  return {
    name: student.name,
    totalMarks: totalMarks,
    percentage: percentage,
    grade: grade,
    highestSubject: maxSubject[0],
    lowestSubject: minSubject[0],
    passedSubjects: passedSubjects,
    failedSubjects: failedSubjects,
    subjectCount: numSubjects,
  };
}
