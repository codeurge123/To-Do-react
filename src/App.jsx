import { useEffect, useState } from 'react'

import './App.css'
import { TodoProvider } from './contexts'
import { TodoForm, TodoItem } from './components';

function App() {

  const [todos,setTodos] = useState([]);
  
  const addTodo = (todo) => {
    // setTodos(todo) --> agar aap es tarika se set karta hai todo ko todos array ke andar to purni sari values remove ho jaya ge and ye todo value array mein set ho jaya ge but yaar huma to purni values bhe chiya and esko add bhe karna hai todos array ke andar to ab vo kaisa kara ga -> Let's see : 
    setTodos((prev) => [{id : Date.now(), ...todo} , ...prev]) // --> basically ye jo hum ne "..." wala operator use kiya hai ye simple values ko spread karna ke liya use kara hai.
    // id equal to Date.now() es liya kar hai becuase id must be unique for every todo
  }

  const updatedTodo = (id,todo) => {
    // yaha pr map ke through hum na loop laga deya hai todos array pr.
    setTodos((prev) => prev.map((prevTodo) => (prevTodo.id === id ? todo : prevTodo)))
    // (prevTodo.id === id ? todo : prevTodo) --> ye basically hamri if-else condition humm ne lagyi hai.
    // prevTodo basically hamra har ek element hai todos array ke andar.
  }


  const deleteTodo = (id) => {
    setTodos((prev) => prev.filter((todo) => todo.id !== id));
    // Basically deleteTodo ke andar hum na "filter" use kara hai "map" nhi because filter make easy for us that ke hum jo value delete karni hai usko chodd kar sari values rakh le todos array ke andar. and remember one thing ke filter works on true conditions only.
  }

  const toggleComplete = (id) => {
    setTodos((prev) => prev.map((prevTodo) => (prevTodo.id === id ? {...prevTodo, completed: !prevTodo.completed} : prevTodo)))

    // {...prevTodo, completed: !prevTodo.completed} --> basically es ka andar hum ne kya kara hai ke phala humm ne sari values la le hai then ek value ko overwrite kar deya hai that is "completed"
  }

  // Note : Remember one thing ke local storage mein jab hum ek br value rakh deta hai na to vo string format mein ho jati hai. -> to basically kaafi bar value leta time and deta time usko "json" mein convert ya deconvert karna padta hai.


  // basically jab tak aap "react" mein ho then aap directly "localstorage" ko access kar skta ho 
  // jab tak aap server side rendering ke baat nhi kar raha hai tab tak aap "localstorage" ko directly access kar skta ho.
  useEffect(() => {
    const todos =  JSON.parse(localStorage.getItem("todos"))
  
    // JSON.parse() hamri jo localstorage se value string format mein aa rhi hai unko javascript form mein convert kar deta hai matlab unko us state mein convert kar dega jis state mein vo value phala thi localstorage mein pass karna se phala.

    if (todos && todos.length > 0) {
      setTodos(todos)
    }

  },[])


  useEffect(() => {
    // Remember ke "loaclstorage" mein value "store" karta samay hum "key/value pair" mein value deta hai.
    localStorage.setItem("todos", JSON.stringify(todos))


    // basically using setItem hum todos array ko store kar skta hai in localstorage and also remember one thing ke ye hamra jo JSON.stringify hai ye hamri json/javascript data ko string format mein convert kar deta hai.
  },[todos])


  return (
    // ye "value" ke andar hum chija destructured kr ke likh rh hai humm but agar hum chahai to usko(TodoContext) yaha par la kar phir dot(.) se access kar ke bhe use kar skta hai.
    <TodoProvider value={{todos,addTodo,updatedTodo,deleteTodo,toggleComplete}}>
    <div className="bg-[#172842] min-h-screen py-8 border rounded-xl">
        <div className="w-full max-w-2xl mx-auto shadow-md rounded-lg px-4 py-3 text-white">
            <h1 className="text-2xl font-bold text-center mb-8 mt-2">Manage Your Todos</h1>
            <div className="mb-4 hover:outline hover:outline-gray-300 hover:-outline-offset-[-3px] hover:rounded-lg transition-all duration-75">
                {/* Todo form goes here */} 
                <TodoForm />
            </div>
            <div className="flex flex-wrap gap-y-3">
                {/*Loop and Add TodoItem here */}
                {todos.map((todo) => (
                  <div key={todo.id}
                  className='w-full' 
                  >
                  <TodoItem todo={todo} />  
                  </div>
                ))}
                {/* () --> esko lagna ka matlab auto return hota hai like this  (
                  <div key={todo.id}
                  className='w-full' 
                  >
                  <TodoItem todo={todo} />  
                  </div>
                ) */}
            </div>
        </div>
    </div>
    </TodoProvider>
  )
}

export default App
