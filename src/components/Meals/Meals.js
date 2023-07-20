import React from "react";
import AvailableMeals from "./AvailableMeals";
import MealsSummary from "./MealsSummary";

const Meals = () => {
  return (
    <div style={{paddingBottom:"30px", backgroundColor: `rgba(${79}, ${26}, ${39}, ${0.93})` }}>
      <MealsSummary />
      <AvailableMeals />
    </div>
  );
};

export default Meals;
