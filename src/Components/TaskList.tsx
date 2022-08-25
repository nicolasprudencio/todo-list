import styles from './TaskList.module.css'
import { v4 as uuid } from 'uuid'
import { PlusCircle } from 'phosphor-react'
import { Task } from './Task'
import { ChangeEvent, FormEvent, useEffect, useState } from 'react'

export function TaskList() {
  const [tasks, setTasks] = useState(['Limpar a casa e dar banho no cachorro'])
  const [newTask, setNewTask] = useState('')
  const [data, setData] = useState([] as any[])

  function handleNewTask(e: ChangeEvent<HTMLTextAreaElement>) {
    setNewTask(e.target.value)
  }

  function handleCreateNewTask(e: FormEvent) {
    e.preventDefault()

    if (newTask.length === 0) {
      return alert('Preencha o campo de tarefas com uma tarefa válida')
    }

    setTasks([...tasks, newTask])
    setNewTask('')
  }

  function deleteTask(taskToDelete: string) {
    const taskListWithoutDeletedTask = tasks.filter((task) => {
      return task !== taskToDelete
    })

    setTasks(taskListWithoutDeletedTask)
  }

  const savedTask = (e: any) => {
    setData((state) => [...state, { [e.target.name]: e.target.checked }])
  }

  useEffect(() => {
    console.log('return data', data)
  }, [data])

  return (
    <>
      <div className={styles.Wrapper}>
        <form className={styles.Container}>
          <textarea
            value={newTask}
            onChange={handleNewTask}
            placeholder="Adicione uma tarefa"
          />
          <button onClick={handleCreateNewTask}>
            Criar <PlusCircle size={18} />
          </button>
        </form>
        <div>
          <header className={styles.tasksCount}>
            <div className={styles.createdTasks}>
              <p>Tarefas criadas</p>
              <span>{tasks.length}</span>
            </div>
            <div className={styles.completedTasks}>
              <p>Concluídas</p>
              <span>de {tasks.length}</span>
            </div>
          </header>
          {tasks.map((task, index) => {
            const id: string = uuid()

            return (
              <Task
                id={index}
                key={id}
                onTaskDelete={deleteTask}
                content={task}
                childToParent={savedTask}
              />
            )
          })}
        </div>
      </div>
    </>
  )
}
