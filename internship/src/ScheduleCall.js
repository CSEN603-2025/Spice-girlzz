import React from 'react';

function ScheduleCall() {
  return (
    <div>
      <h3>Schedule a Call</h3>
      <form>
        <label>Topic:</label><input type="text" /><br />
        <label>Date:</label><input type="date" /><br />
        <label>Time:</label><input type="time" /><br />
        <button type="submit">Submit Request</button>
      </form>
      <p>Your request will appear in 'Appointments'.</p>
    </div>
  );
}

export default ScheduleCall;
