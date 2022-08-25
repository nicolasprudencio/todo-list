import styles from './Task.module.css'

import { Trash } from 'phosphor-react'

interface taskProps {
  content: string
  isCompleted: boolean
  id: string
  childToParent: (e: any, id: string) => void
  onTaskDelete: (content: string) => void
}

export function Task({
  content,
  onTaskDelete,
  childToParent,
  id,
  isCompleted
}: taskProps) {
  function checkedByUser(e: any) {
    const isChecked = e.target.checked
    childToParent(isChecked, id)
  }
  return (
    <div className={styles.Container}>
      <label className={styles.Checkbox}>
        <input type="checkbox" onClick={checkedByUser} name={`task_${id}`} />
        <span className={styles.Checkmark} />
      </label>

      {isCompleted ? (
        <p className={styles.Content}>{content}</p>
      ) : (
        <p>{content}</p>
      )}
      <button onClick={() => onTaskDelete(id)} className={styles.Trash}>
        <Trash size={22} />
      </button>
    </div>
  )
}
