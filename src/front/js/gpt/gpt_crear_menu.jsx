import React, { useState } from "react";

export const Menu_GPT = () => {

    const [desplegar, setDesplegar] = useState('');

    return(
        <div>
            <h1>What are cooking today</h1>
            <form>
                <input type="checkbox" placeholder="Start typing to plan to meals" />
                <button>Generate your meal plan</button>
                <div className="d-flex justify-content-between">
                    <h5>Allergens and Medical Conditions</h5>
                    <button>Desplegar</button>
                </div>
                <div>
                    <div>
                        
                    </div>
                </div>
            </form>
        </div>
    )


}