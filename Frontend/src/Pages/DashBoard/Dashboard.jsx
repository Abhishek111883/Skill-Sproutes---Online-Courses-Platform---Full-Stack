import React from "react";
import { UseUser } from "../../Components/Hooks/UseUser";
import { GridLoader } from "react-spinners";
import { NavigateDashboard } from "../../Routes/NavigateDashboard";

export const Dashboard = () => {
  const { currentuser, isLoading } = UseUser();
  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <GridLoader color="#058018" speedMultiplier={1} />;
      </div>
    );
  }
  return <NavigateDashboard />;
};
