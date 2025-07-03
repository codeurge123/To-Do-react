import React, { useState } from 'react'
import { useTodo } from '../contexts';

function TodoForm() {
    
    const [todo,setTodo] = useState("");

    const {addTodo} = useTodo();

    const add = (e) => {
        e.preventDefault();

        if(!todo) return

        addTodo({todo, completed: false})
        // addTodo({todo:todo, completed: false}) --> humm ne todo:todo as a simple todo ku likh deya hai because hum ko pata hai ke agar nay syntax ke according agar hamri feild and value ka name same hai to hum bass value bhe likh skta hai.
        setTodo(""); // --> ab ye hum ne es liya kara hai ku ke hum ye value jis field se lakar aya hai vaha bhe ye (todo) dikh raha ho ga to mein chata hu ke add karta he vo input field se remove ho jaya and todos mein set ho jaya
    }


    return (
        <form onSubmit={add} className="flex">
            <input
                type="text"
                placeholder="Write Todo..."
                className="w-full border border-black/10 rounded-l-lg px-3 outline-none duration-150 bg-white/20 py-1.5"
                value={todo} // --> esko hum wiring bolte hai ke hmri wiring ho jaya "input" ke "state" ke sath
                onChange={(e) => setTodo(e.target.value)}
            />
            <button type="submit" className="rounded-r-lg px-3 py-1 bg-green-600 text-white shrink-0 hover:bg-green-700">
                Add
            </button>
        </form>
    );
}

export default TodoForm;

