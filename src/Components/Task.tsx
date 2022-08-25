import styles from './Task.module.css'

import { Trash } from 'phosphor-react'
import { useEffect, useState } from 'react'

interface taskProps {
  content: string
  id: number
  childToParent: React.Dispatch<React.SetStateAction<number>>
  onTaskDelete: (content: string) => void
}

export function Task({ content, onTaskDelete, childToParent, id }: taskProps) {
  const [clicked, setClicked] = useState(false)

  function checkedByUser(e: any) {
    setClicked(e.target.checked)

    console.log('clicked', e.target.checked)
    childToParent(e)

    console.log(e.target.checked)
  }

  function handleDeleteTask() {
    onTaskDelete(content)
  }

  return (
    <div className={styles.Container}>
      <label className={styles.Checkbox}>
        <input type="checkbox" onClick={checkedByUser} name={`task_${id}`} />
        <span className={styles.Checkmark} />
      </label>

      {clicked === true ? (
        <p className={styles.Content}>{content}</p>
      ) : (
        <p>{content}</p>
      )}
      <button onClick={handleDeleteTask} className={styles.Trash}>
        <Trash size={22} />
      </button>
    </div>
  )
}
