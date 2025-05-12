import { useState } from 'react';
import { Button, Textarea, Select, Label } from './UI'; // Assume basic UI components

export default function CompanyEvaluationForm({ onSubmit }) {
  const [evaluation, setEvaluation] = useState({
    studentId: '',
    rating: 3,
    comments: '',
    skillsAssessment: {},
  });

  const students = [ // Mock data - replace with API call
    { id: '1', name: 'Alice Johnson' },
    { id: '2', name: 'Bob Smith' }
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(evaluation);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 p-6 bg-white rounded-lg shadow">
      <h2 className="text-xl font-bold">Student Evaluation</h2>
      
      <div>
        <Label>Student</Label>
        <Select
          value={evaluation.studentId}
          onChange={(e) => setEvaluation({...evaluation, studentId: e.target.value})}
          required
        >
          <option value="">Select a student</option>
          {students.map(student => (
            <option key={student.id} value={student.id}>
              {student.name}
            </option>
          ))}
        </Select>
      </div>

      <div>
        <Label>Rating (1-5)</Label>
        <Select
          value={evaluation.rating}
          onChange={(e) => setEvaluation({...evaluation, rating: e.target.value})}
        >
          {[1, 2, 3, 4, 5].map(num => (
            <option key={num} value={num}>{num}</option>
          ))}
        </Select>
      </div>

      <div>
        <Label>Comments</Label>
        <Textarea
          value={evaluation.comments}
          onChange={(e) => setEvaluation({...evaluation, comments: e.target.value})}
          rows={4}
        />
      </div>

      <Button type="submit" className="bg-blue-600 hover:bg-blue-700">
        Submit Evaluation
      </Button>
    </form>
  );
}