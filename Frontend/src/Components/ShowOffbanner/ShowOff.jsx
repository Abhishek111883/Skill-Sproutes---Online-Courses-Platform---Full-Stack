import React from "react";

export const ShowOff = () => {
  const pad = " p-2 md:p-8";
  const h1style = "md:text-5xl text-white font-bold";
  const pstyle = "text-1xl text-white font-semibold";
  return (
    <div className="h-80 my-10  bg-secondary flex  items-center justify-center">
      <div className={pad}>
        <h1 className={h1style}>10M+</h1>
        <p className={pstyle}>Visitors</p>
      </div>
      <div className={pad}>
        <h1 className={h1style}>5M+</h1>
        <p className={pstyle}>Subscribes</p>
      </div>
      <div className={pad}>
        <h1 className={h1style}>70K+</h1>
        <p className={pstyle}>Students</p>
      </div>
      <div className={pad}>
        <h1 className={h1style}>95%</h1>
        <p className={pstyle}>Success Stories</p>
      </div>
    </div>
  );
};
