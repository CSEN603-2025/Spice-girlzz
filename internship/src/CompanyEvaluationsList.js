export default function CompanyEvaluationsList({ evaluations }) {
  return (
    <div className="overflow-hidden rounded-lg shadow ring-1 ring-black ring-opacity-5">
      <table className="min-w-full divide-y divide-gray-300">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-3 py-3 text-left">Student</th>
            <th className="px-3 py-3 text-left">Rating</th>
            <th className="px-3 py-3 text-left">Comments</th>
            <th className="px-3 py-3 text-left">Date</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200 bg-white">
          {evaluations.map((evaluate) => (
            <tr key={eval.id}>
              <td className="px-3 py-4">{eval.studentName}</td>
              <td className="px-3 py-4">
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                  eval.rating >= 4 ? 'bg-green-100 text-green-800' :
                  eval.rating >= 3 ? 'bg-yellow-100 text-yellow-800' :
                  'bg-red-100 text-red-800'
                }`}>
                  {eval.rating}/5
                </span>
              </td>
              <td className="px-3 py-4 text-sm text-gray-500 max-w-xs truncate">
                {eval.comments}
              </td>
              <td className="px-3 py-4 text-sm text-gray-500">
                {new Date(eval.date).toLocaleDateString()}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}