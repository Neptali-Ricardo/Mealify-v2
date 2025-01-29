import React from "react";
import FoodPreferencesForm from "../component/forms/pref_menu_usuario.jsx";
import WeeklyMealPlan from "../component/forms/calendario_plan_comida.jsx";
import ShoppingList from "../component/forms/lista_compra.jsx";
import ChatGPTComponent from "../gpt/gpt_component.jsx";

export const File_test = () =>{

    return(
        <div>
            <FoodPreferencesForm />
            <WeeklyMealPlan />
            <ShoppingList />
            <ChatGPTComponent />
        </div>
        
    )

}