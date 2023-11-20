import React, { useState, useEffect } from "react";
import { LineChart, Line, XAxis, YAxis } from "recharts";
import io from "socket.io-client";

const Dashboard = () => {
  const [data, setData] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleCloseModal = () => setIsModalOpen(false);

  useEffect(() => {
    const socket = io.connect("http://localhost:3001");

    socket.on("data", (messageData) => {
      console.log(messageData);
      setData((prevData) => [...prevData, messageData]);

      if (messageData.priority === "high") {
        setIsModalOpen(true);
      }
    });

    return () => {
      socket.close();
    };
  }, []);

  return (
    <div className="dashboard">
      <div className="chart-container">
        <LineChart width={800} height={400} data={data} className="line-chart">
          <Line type="monotone" dataKey="value" stroke="#888484" />
          <XAxis dataKey="timestamp" />
          <YAxis />
        </LineChart>
      </div>

      <dialog
        open={isModalOpen}
        aria-labelledby="high-priority-modal-title"
        aria-modal="true"
        className="modal"
      >
        <h5 id="high-priority-modal-title" className="modal-title">
          High Priority Event
        </h5>
        <p className="modal-body">A high-priority event has occurred.</p>
        <button onClick={handleCloseModal} className="modal-button">
          Close
        </button>
      </dialog>
    </div>
  );
};

export default Dashboard;
