import React, { useEffect, useState } from "react";
import { UseUser } from "../Components/Hooks/UseUser";
import { Navigate } from "react-router-dom";

export const NavigateDashboard = () => {
  const { currentuser, isLoading } = UseUser();
  const [role, setrole] = useState(null);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <GridLoader color="#058018" speedMultiplier={1} />;
      </div>
    );
  }

  useEffect(() => {
    const userrole = currentuser?.[0]?.role;
    console.log(userrole);

    setrole(userrole);
  }, []);

  if (role === "admin") {
    return <Navigate to="/dashboard/admin-home" replace />;
  }
  if (role === "instructor") {
    return <Navigate to="/dashboard/instructor-cp" replace />;
  }
  if (role === "user") {
    return <Navigate to="/dashboard/user-cp" replace />;
  }

  return <div>NavigateDashboard</div>;
};
