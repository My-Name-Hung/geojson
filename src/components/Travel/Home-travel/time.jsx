// import React, { useState } from 'react';
// import DatePicker from "react-datepicker";
// import "react-datepicker/dist/react-datepicker.css";

// function time({ onTimeChange }) {
//   const [selectedDate, setSelectedDate] = useState(new Date());

//   const handleDateChange = (date) => {
//     setSelectedDate(date);
//     const timestamp = Math.floor(date.getTime() / 1000); // Chuyển đổi sang timestamp Unix
//     onTimeChange(timestamp);
//   };

//   return (
//     <div className="time-filter absolute top-16 left-12">
//       <DatePicker
//         selected={selectedDate}
//         onChange={handleDateChange}
//         showTimeSelect
//         timeIntervals={15} // Chọn khoảng thời gian 15 phút
//         dateFormat="Pp"
//         className="p-2 border rounded-md shadow-sm"
//       />
//     </div>
//   );
// }

// export default time;
