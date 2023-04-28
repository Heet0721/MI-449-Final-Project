import React, { useState, useEffect } from "react";
import "./index.css";

export default function Meal({ meal }) {
  const [imageUrl, setImageUrl] = useState("");
  const [bgColor, setBgColor] = useState("white");

  useEffect(() => {
    fetch(
      `https://api.spoonacular.com/recipes/${meal.id}/information?apiKey=e49cbcb80d2b47f5a04fa076d9065574&includeNutrition=false`
    )
      .then((response) => response.json())
      .then((data) => {
        setImageUrl(data.image);
      })
      .catch(() => {
        console.log("error");
      });

    const bgInterval = setInterval(() => {
      const colors = ["#D9D9D9", "#0396FF", "#32CCBC", "#3677FF", "#A64DB6", "#9452A5", "#58CFFB","#F067B4"];
      const randomColor = colors[Math.floor(Math.random() * colors.length)];
      setBgColor(randomColor);
    }, 5000);

    return () => clearInterval(bgInterval);
  }, [meal.id]);

  return (
    <article style={{ backgroundColor: bgColor }} className="bg-white rounded-md shadow-md overflow-hidden color-changing">
      <h3 className="text-2xl font-bold mb-4 px-6 pt-6">{meal.title}</h3>
      <div className="h-64 flex justify-center items-center">
        <img src={imageUrl} alt="recipe" className="h-full object-cover rounded-md" />
      </div>
      <ul className="list-disc pl-8 my-6">
        <li className="text-lg text-gray-600 mb-2">Preparation time: {meal.readyInMinutes} minutes</li>
        <li className="text-lg text-gray-600 mb-4">Number of servings: {meal.servings}</li>
      </ul>
      <div className="px-6 pb-6 flex justify-center">
        <a href={meal.sourceUrl} className="bg-black hover:bg-gray-700 text-white font-bold underline py-2 px-4 rounded">Go to Recipe</a>
      </div>
    </article>
  );
}
