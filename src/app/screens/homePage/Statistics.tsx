import React from "react";

export default function Statistics() {
  const stats = [
    { value: "1,000+", label: "Books" },
    { value: "500+", label: "Customers" },
    { value: "120+", label: "Reviews" },
    { value: "10+", label: "Categories" },
  ];

  return (
    <div className="homepage-statistics">
      {stats.map((stat, index) => (
        <div className="stat-box" key={index}>
          <h2 className="stat-value">{stat.value}</h2>
          <p className="stat-label">{stat.label}</p>
          {index !== stats.length - 1 && <div className="vertical-line" />}
        </div>
      ))}
    </div>
  );
}
