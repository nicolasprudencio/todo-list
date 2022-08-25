import styles from './TaskList.module.css'
import { v4 as uuid } from 'uuid'
import { PlusCircle } from 'phosphor-react'
import { Task } from './Task'
import { ChangeEvent, useMemo, useState } from 'react'

type Task = {
  name: string
  isCompleted: boolean
  id: string
}

export function TaskList() {
  const [tasks, setTasks] = useState([] as Task[])
  const [createTaskData, setCreateTaskData] = useState('')

  const countTasksCompleted = useMemo(() => {
    return tasks.filter((tasks) => tasks.isCompleted === true).length
  }, [tasks])

  function handleCreateNewTask() {
    if (createTaskData.length === 0) {
      return alert('Preencha o campo de tarefas com uma tarefa válida')
    }

    setTasks([
      ...tasks,
      {
        name: createTaskData,
        isCompleted: false,
        id: uuid()
      }
    ])
    setCreateTaskData('')
  }

  function deleteTask(id: string) {
    const newTasks = tasks.filter((task) => {
      return task.id !== id
    })
    setTasks(newTasks)
  }

  const changeIsChecked = (value: boolean, index: string) => {
    const newList = tasks.map((task, i) => {
      console.log(i, index)
      if (task.id === index) {
        return {
          ...task,
          isCompleted: value
        }
      }
      return task
    })
    setTasks(newList)
  }
  return (
    <>
      <div className={styles.Wrapper}>
        <div className={styles.Container}>
          <textarea
            value={createTaskData}
            onChange={(e: ChangeEvent<HTMLTextAreaElement>) =>
              setCreateTaskData(e.target.value)
            }
            placeholder="Adicione uma tarefa"
          />
          <button onClick={handleCreateNewTask}>
            Criar <PlusCircle size={18} />
          </button>
        </div>
        <div>
          <header className={styles.tasksCount}>
            <div className={styles.createdTasks}>
              <p>Tarefas criadas</p>
              <span>{tasks.length}</span>
            </div>
            <div className={styles.completedTasks}>
              <p>Concluídas</p>
              <span>
                {' '}
                {countTasksCompleted} de {tasks.length}
              </span>
            </div>
          </header>
          {tasks.map((task) => {
            return (
              <Task
                isCompleted={task.isCompleted}
                id={task.id}
                key={task.id}
                onTaskDelete={deleteTask}
                content={task.name}
                childToParent={changeIsChecked}
              />
            )
          })}
        </div>
      </div>
    </>
  )
}
