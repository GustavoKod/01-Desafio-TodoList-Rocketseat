import { useState, ChangeEvent } from 'react';
import styles from './TodoTask.module.css';
import plus from '../assets/plus.svg';
import trash from '../assets/trash.svg';
import check from '../assets/1.svg'
import checked from '../assets/2.svg'

interface iTask {
    id: number;
    nameTask: string;
    isCompleted: boolean;
}

export function TodoTask() {
    const [task, setTask] = useState<string>('');

    const [todoList, setTodoList] = useState<iTask[]>([]);

    const [createdTaskCounter, setCreatedTaskCounter] = useState<number>(0);

    const [createdTaskCounterOf, setCreatedTaskCounterOf] = useState<number>(0);

    const MAX_CHARACTERS = 30;

    const addTask = () => {
        const idRandom = (num: number) => Math.floor(Math.random() * num);

        const newTask: iTask = {
            id: idRandom(9999),
            nameTask: task,
            isCompleted: false
        };
        setTodoList([...todoList, newTask]);
        setTask('');
    }

    const handleCheckboxChange = (id: number, isCompleted: boolean) => {
        const updatedTodoList = todoList.map((item) =>
            item.id === id ? { ...item, isCompleted: !isCompleted } : item
        );

        setTodoList(updatedTodoList);

        if (isCompleted) {
            handleDecrementTaskCounterOf();
        } else {
            handleIncrementTaskCounterOf();
        }
    };


    const handleTodoCounter = (): number => {
        return todoList.length;
    };
    
    const handleIncrementTaskCounter = (): void => {
        setCreatedTaskCounter((prevCount) => prevCount + 1);
    };


    const handleIncrementTaskCounterOf = (): void => {
        setCreatedTaskCounterOf((prevCount) => prevCount + 1);
    };

    const handleDecrementTaskCounterOf = (): void => {
        setCreatedTaskCounterOf((prevCount) => (prevCount > 0 ? prevCount - 1 : 0));
    };


    const handleCombinedClick = (): void => {
        if (task.trim() !== '') {
            handleIncrementTaskCounter();
            addTask();

        }
    };

    const handleTaskChange = (event: ChangeEvent<HTMLInputElement>): void => {
        const inputText: string = event.target.value;
        if (inputText.length <= MAX_CHARACTERS) {
            setTask(inputText);
        }

    };

    const handleDeleteTask = (id: number): void => {
        setTodoList((prevTasks) => prevTasks.filter((task) => task.id !== id));
        setCreatedTaskCounter((prevCount) => prevCount - 1);
        handleDecrementTaskCounterOf();
    }


    return (
        <article className={styles.AddTaskContainer}>
            <div className={styles.InputContainer}>
                <input
                    className={styles.Textarea}
                    type="text"
                    placeholder="Adicione uma nova tarefa"
                    autoComplete="off"
                    value={task}
                    onChange={handleTaskChange}
                />
                <button onClick={handleCombinedClick} className={styles.CreateButton}>
                    <span>Criar</span>
                    <img src={plus} alt="plus" />
                </button>
            </div>

            <div className={styles.CardBoxContainer}>
                <h4 className={styles.tf}>
                    Tarefas criadas
                    <span>{createdTaskCounter}</span>
                </h4>

                <h4 className={styles.c}>
                    Concluidas
                    <span>{createdTaskCounterOf} de { handleTodoCounter ()}</span>
                </h4>

                {todoList.map((task: iTask) => (
                    <div key={task.id} className={styles.CardList}>
                        <label className={styles.CheckboxContainer}>
                            <input
                                type="checkbox"
                                checked={task.isCompleted}
                                onChange={() => handleCheckboxChange(task.id, task.isCompleted)}
                                className={styles.HiddenCheckbox}
                            />
                            <div className={styles.CheckboxCustom}>
                                {task.isCompleted ? (
                                    <img src={checked} alt="checked" />
                                ) : (
                                    <img src={check} alt="check" />
                                )}
                            </div>
                        </label>
                        <span>{task.nameTask}</span>
                        <button onClick={() => handleDeleteTask(task.id)}>
                            <img src={trash} alt="trash" />
                        </button>
                    </div>
                ))}
            </div>



        </article>
    );
}
