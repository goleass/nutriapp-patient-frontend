import { useEffect } from "react"
import { useQuery } from "react-query"
import { useAuth } from "../context/AuthProvider/useAuth"
import icon from "../images/icons8-cutlery-48.png"
import { Api } from "../services/api"

function FoodPlanTable({foodPlan}) {
  return (
    <div className="flex-1 px-5 py-4 bg-white shadow-lg rounded-sm border border-slate-200">
      <div className="px-5 py-4">
        {foodPlan ? 
          (foodPlan.FoodPlanMeals && foodPlan.FoodPlanMeals.length > 0) ? foodPlan.FoodPlanMeals.map(meal => (
          <FoodPlanComponent 
            id={meal.id}
            title={meal.description}
            time={meal.meal_time}
            itens={meal.FoodPlanMealItems.map((item) => ({id: item.Food.id, description: item.Food.description, quantity: item.qty}))}
          />
        )): <h2>Nenhuma refeição cadastrada ainda :'(</h2>
        : <h2>Nenhum plano alimentar cadastrado ainda :'(</h2>}
      </div>
    </div>
  )
}

function FoodPlanComponent({id,title, time, itens}: {id:string,title: string, time: string, itens: any[]}){
  return (
    <div>
      <header className="text-[8pt] text-slate-400 bg-slate-50 rounded-sm font-semibold p-2">
        <div className="flex flex-row justify-between">
          <div className="uppercase">{title}</div>
          <div className="flex flex-row gap-2">
            <div className="text-slate-600 font-bold">{time}</div>
          </div>
        </div>
      </header>
      <ul className="my-1">
        {/* Item */}
        {itens.map(({description, quantity}) => (
          <li className="flex px-2">
            <Icon />
            <div className="grow flex items-center border-b border-slate-100 text-sm py-1">
              <div className="grow flex justify-between">
                <div className="self-center">{description} ({quantity} g)</div>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}

function Icon(){
  return (
    <div className="my-2 mr-2">
      <img src={icon} alt="talheres" className="w-5 h-5"/>
    </div>
  )
}

export default FoodPlanTable