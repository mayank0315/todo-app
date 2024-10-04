import { nanoid } from 'nanoid'
import { useState } from 'react';

const App = () => {
    const [title, settitle] = useState('')
    const [tasks, settasks] = useState([]);

    const submitHandler = (e) => {
        e.preventDefault();

        const task = {
            id: nanoid(),
            title: title,
            completed: false
        }



        const copytasks = [...tasks]
        copytasks.push(task);
        settasks(copytasks);
        settitle('');
    }

    const ToggleHandler = (index) => {
        const copytasks = [...tasks];
        copytasks[index].completed = !copytasks[index].completed;
        settasks(copytasks);
    };

    const DeleteHandler = (index) => {
        if(tasks[index].completed || confirm('Are you sure you want to delete')) {
            const copytasks = [...tasks];
            copytasks.splice(index, 1);
            settasks(copytasks);
    
        } else{
            alert("task not deleted");
            return ;
        }
    }

    return (
        <div className=" border-t-2 w-screen h-screen bg-zinc-800 flex  items-center flex-col">
            <div className="mt-[2%] w-[35%] h-[29%]  border rounded-3xl flex justify-around items-center">
                <div className="text-yellow-100">
                    <h1 className="text-3xl font-bold">LETS TODO</h1>
                    <p>Keeps doing things</p>
                </div>
                <div className="text-4xl font-extrabold flex justify-center items-center w-[120px] h-[120px] rounded-full bg-orange-600">
                {tasks.filter((task) => task.completed).length}/
                {tasks.length}
                </div>
            </div>
            {/*  */}
            <form
                onSubmit={submitHandler}

                className="w-[35%] flex justify-between gap-5 px-5 my-[2%]">
                <input
                    onChange={(e) => settitle(e.target.value)}
                    value={title}
                    placeholder="write your next task..."
                    className="px-5 py-3  text-yellow-100 outline-none w-[85%] rounded-xl bg-zinc-700 "
                    type="text"
                />
                <button className="outline-none text-4xl font-extrabold flex justify-center items-center w-[50px] h-[50px] rounded-full bg-orange-600">
                    <i className="ri-add-fill"></i>
                </button>
            </form>
            {/*  */}
            <ul className="list-none w-[35%] ">
              {tasks.length > 0 ? (
                    tasks.map((task, index) => {
                        return(
                        <li
                            key={task.id}
                            className="mb-5 flex justify-between items-center border rounded-xl p-5">
                            <div className="flex items-center">
                                <div
                                 onClick={() => ToggleHandler(index)}
                                className={` ${
                                    task.completed
                                        ? "bg-green-400"
                                        : "border border-orange-600"
                                } mr-4 rounded-full w-[30px] h-[30px]`}></div>
                                <h1 className={`${
                                            task.completed ? "line-through" : ""
                                        } text-2xl font-extrabold text-yellow-100`}>
                                    {task.title}
                                </h1>
                            </div>
                            <div className="flex gap-3 text-2xl text-yellow-100">
                                <i className="ri-file-edit-line"></i>
                                <i
                                onClick={() => DeleteHandler(index)}
                                className="ri-delete-bin-3-line"></i>
                            </div>
                        </li>
                        )
                    })
                ) : (
                    <h1 className='mt-5 text-yellow-100 text-2xl font-extrabold text-center'>
                        no task found
                    </h1>
                )}


            </ul>
        </div>
    );
};

export default App;
