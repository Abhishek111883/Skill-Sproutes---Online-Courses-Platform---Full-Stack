import React from "react";
import { HeroContainer } from "../Components/Hero/HeroContainer";
import { Gallery } from "../Components/Gallery/Gallery";
import { Popular_Classes } from "../Components/Popularclasses/Popular_Classes";
import { Popular_Instructors } from "../Components/PouplarInstructors/Popular_Instructors";
import { ShowOff } from "../Components/ShowOffbanner/ShowOff";
import { SubscribeBox } from "../Components/Subscribe/SubscribeBox";

export const Home = () => {
  return (
    <div>
      <HeroContainer />
      <Gallery />
      <Popular_Classes />
      <Popular_Instructors />
      <ShowOff />
      <SubscribeBox />
    </div>
  );
};
