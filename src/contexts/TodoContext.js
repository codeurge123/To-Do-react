import { createContext, useContext } from "react";

export const TodoContext = createContext({
    // Basically es array ke andar humra har ek "todo" ek object hai which is having id,todocontent and complete/uncomplete mark.
    // Ye todos hamri ek property hai.
    todos: [
        {
            id: 1,
            todo: "Todo msg",
            completed: false,
        }
    ],
    // ab important baat ye hai ke aap global context mein method bhe pass kr skta hai but dhyan rakhna wali baat ye hai ke method/function ke andar hum functionality nhi likh te hai jab hum unko by default pass kr rah hai global context mein , to ab enki functionality kha pr likhe jati hai -> vo likhe jati hai in "App.jsx" mein
    addTodo: (todo) => {},
    updatedTodo: (id,todo) => {},
    deleteTodo: (id) => {},
    toggleComplete: (id) => {},
})
// Ab baiscally jab aap Todos ka context bana rh ho to uska pass kuch default values ho ge.

// Note : Remember one thing ke har ek todos ka apna khud ka "unique id" hota hai and har ek todos ka khud ka "todocontent" bhe hota hai and har ek todos ka apna khud ka  "completed marked/unmarked" bhe hota hai. --> To basically har ek todos ka pass ye 3 chija hoti he hoti hai.

// And agar baat kara functionality in Todo to vo hai --> addTodo , toggleComplete , updatedTodo , deleteTodo and tum read/listing bhe kar pa rha ho todos ke. 



export const useTodo = () => {
    return useContext(TodoContext);
}

export const TodoProvider = TodoContext.Provider