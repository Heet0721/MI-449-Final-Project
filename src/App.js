import React, { useState } from "react";
import "./index.css";
import MealList from "./MealList";
import { createClient } from '@supabase/supabase-js';
import { Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";


const supabaseUrl = 'https://mleazactnjtqqikybupq.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1sZWF6YWN0bmp0cXFpa3lidXBxIiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODIwODM3MjUsImV4cCI6MTk5NzY1OTcyNX0.U8XjoZGD3qWP3NeI-DqOlkA2ss4BNxkHXaj7xAjWPic';
const supabaseClient = createClient(supabaseUrl, supabaseKey);



function App() {
  const [mealData, setMealData] = useState(null);
  const [calories, setCalories] = useState(2000);

  function saveMealPlan() {
    supabaseClient
      .from('meal_plans')
      .insert({ meal_plan: mealData })
      .then((response) => {
        console.log('Meal plan saved:', response);
      })
      .catch((error) => {
        console.log('Error saving meal plan:', error);
      });
  }

  function getMealData() {
    fetch(
      `https://api.spoonacular.com/mealplanner/generate?apiKey=e49cbcb80d2b47f5a04fa076d9065574&timeFrame=day&targetCalories=${calories}`
    )
      .then((response) => response.json())
      .then((data) => {
        setMealData(data);
      })
      .catch(() => {
        console.log("error");
      });
  }

  function handleChange(e) {
    setCalories(e.target.value);
  }

  return (
    <div className="App">
      <section className="title spotlight">
        <div className="top">Welcome to the FoodLab</div>
        <div className="bottom" aria-hidden="true">Welcome to the FoodLab</div>
      </section>

      <section className="controls">
        <p>How many calories would you like to have in your meal?</p>
        <input
          type="number"
          placeholder="Calories (e.g. 2000)"
          onChange={handleChange}
        /> <br></br>
        <button onClick={getMealData} id="button1" class="btn btn-primary">Get Meal Plan</button>

        <button onClick={saveMealPlan} id="button2" class="btn btn-success">Save Meal Plan</button>


      </section>
      {mealData && <MealList mealData={mealData} />}
    </div>
  );
}

export default App;
