import React, { useEffect, useState } from 'react';
import { useQuery } from 'react-query';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthProvider/useAuth';
import FoodPlanTable from '../partials/FoodPlanTable';
import Header from '../partials/Header';
import { Api } from '../services/api';

const initialDays = [
  {key:0, name: "Domingo", checked: false },
  {key:1, name: "Segunda-feira", checked: false},
  {key:2, name: "Terça-feira", checked: false},
  {key:3, name: "Quarta-feira", checked: false},
  {key:4, name: "Quinta-feira", checked: false},
  {key:5, name: "Sexta-feira", checked: false},
  {key:6, name: "Sábado", checked: false},
]

function Home() {

  const auth = useAuth()
  const navigate = useNavigate()

  const [currentFoodPlan, setCurrentFoodPlan] = useState({})

  const { data, isLoading, error, isFetching } = useQuery(`patient/${auth.id}/food-plan`, async () => {
    try {
      const response = await Api.get(`patient/${auth.id}/food-plan`)

      const foodPlan = response.data.foodPlans
        .filter(f => f.days&&f.days.length>0)
        .sort((f1, f2) => f1.days[0] - f2.days[0])

      return foodPlan
    } catch (error) {
      if (error && error.response && error.response.status === 401) {
        auth.setUserU(null)
        navigate("/signin")
      }
      console.log(error)
    }
  }) 

  useEffect(() => {
    if(!data) return 

    setCurrentFoodPlan(data[0])
  }, [])

  useEffect(() => {
    if(!data) return 

    setCurrentFoodPlan(data[0])
  }, [data])

  return (
    <div className="flex h-screen overflow-hidden">
      <div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
        <Header/>

        <main>
          <div className="w-full sm:w-[75%] md:w-[75%] lg:w-[75%] px-4 sm:px-6 lg:px-8 py-8 max-w-9xl mx-auto">
            {/* Page header */}
            <div className="sm:flex sm:justify-between sm:items-center mb-5">
              {/* Left: Title */}
              <div className="mb-4 sm:mb-0">
                <h1 className="text-2xl md:text-3xl text-slate-800 font-bold">Plano Alimentar</h1>
              </div>
            </div>

            {/* More actions */}
            {currentFoodPlan && currentFoodPlan.status && currentFoodPlan.days && (currentFoodPlan.days.length > 0) && 
             <div className="sm:flex sm:justify-between sm:items-center mb-5">
                {/* Left side */}
                <div className="mb-4 sm:mb-0">
                  <ul className="flex flex-wrap -m-1">
                    {data.map((foodPlan) => {
                      return (
                        <li className="m-1">
                          <button 
                            type="button"
                            className={`inline-flex items-center justify-center text-sm font-medium leading-5 rounded-full px-3 py-1 border ${foodPlan.id===currentFoodPlan.id? "border-transparent shadow-sm bg-indigo-500 text-white": "border-slate-200 hover:border-slate-300 shadow-sm bg-white text-slate-500"} duration-150 ease-in-out`}
                            onClick={() => setCurrentFoodPlan(foodPlan)}
                          >
                            {parseKeyToDay(foodPlan.days).map(day => day?.shortName).join(" ")}
                          </button>
                        </li>
                      )
                    })}
                  </ul>
                </div>
              </div>}

            <FoodPlanTable foodPlan={currentFoodPlan && currentFoodPlan}/>
          </div>
        </main>
      </div>
    </div>
  )
}

const parseKeyToDay = (dayKeys: number[]) => {
  const days = [
    {key:0, name: "Domingo", shortName: "Dom"},
    {key:1, name: "Segunda-feira", shortName: "Seg"},
    {key:2, name: "Terça-feira", shortName: "Ter"},
    {key:3, name: "Quarta-feira", shortName: "Qua"},
    {key:4, name: "Quinta-feira", shortName: "Qui"},
    {key:5, name: "Sexta-feira", shortName: "Sex"},
    {key:6, name: "Sábado", shortName: "Sáb"},
  ]

  return dayKeys.map(day => days.find(d => d.key === day))
}

export default Home