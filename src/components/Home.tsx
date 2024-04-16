import { FC, useState } from "react";
import style from './Home.module.css'
import { FaCheck } from "react-icons/fa6";

const Home:FC = () => {
    interface todosType {
        id:number,
        text:string,
        completed:boolean
    }

    const [todos, setTodos] = useState<todosType[]>([]) /// главный массив где хранятся все задачи
    const [todosClone, setTodosClone] = useState<todosType[]>([]) /// массив, который мы выводим и изменяем
    const [task, setTask] = useState('') /// сюда пишется текст
    const filter = ["All", "Active", "Completed"] /// для фильтр кнопок
    const [btnFilter, setBtnFilter] = useState('All') /// какая фильтр кнопка сейчас нажата
    
    /// Функция добавления задачи в массив
    function AddTodos() {
        const copy = [...todos]
        const obj = {
            id:Math.random(),
            text: task,
            completed: false
        }

        copy.push(obj)
        setTodosClone(copy)
        setTodos(copy)
        setTask('')
    }
    /// Функция чека
    function CheckTodos(id:number) {
        const copy = [...todos]
        copy.map(todo => {
            if (todo.id === id) {
                todo.completed = !todo.completed
            }
        })
        setTodos(copy)
    }
    /// считает сколько задач ещё нужно сделать
    let sum = 0
    todos.map(todo => {
        if (todo.completed === false) {
            sum++
        }
    })
    /// фильтруем массив и записываем полученное значение в другой массив, чтобы ничего не пропало 
    function filterTodos(item:string) {
        const copyTodo = [...todos]
        setBtnFilter(item)
        if (item === "All") {
            setTodosClone(todos)
        } else if (item === "Active") {
            const copy = copyTodo.filter((check) => check.completed === false)
            setTodosClone(copy)
        } else if (item === "Completed") {
            const copy = copyTodo.filter((check) => check.completed === true)
            setTodosClone(copy)
        }
    }

    return (
      <div className={style.home}>
        <div className={style.header}>
            <h1 className={style.headerText}>TODO</h1>
            <div className={style.headerFlex}>
                <input value={task} onChange={(event) => setTask(event.target.value)} className={style.input} type="text" placeholder="Create a new todo..."/>
                <button onClick={() => AddTodos()} className={style.btnHeader}>Add</button>
            </div>
        </div>
        <div className={style.main}>
            { todosClone.length > 0 ?
                todosClone.map((todo) => 
                    <div className={style.boxTodo} key={todo.id}>
                        <button className={style.circle} onClick={() => CheckTodos(todo.id) }>
                            {todo.completed ? <FaCheck className={style.check} size={14}/> : ""}
                        </button>
                        <p className={todo.completed ? style.textMainCopleted : style.textMain}>{todo.text}</p>
                    </div>
            )
            :
            ''
            }
            <div className={style.footer}>
                <p className={style.footerText}>{sum} items left</p>
                <div className={style.footerFlex}>
                    { filter.map((item) => 
                        <button onClick={() => filterTodos(item)} key={item} className={btnFilter === item ? style.footerBtnActive : style.footerBtn}>{item}</button>
                    )}
                </div>
            </div>
        </div>
      </div>
    );
  }
  
  export default Home;