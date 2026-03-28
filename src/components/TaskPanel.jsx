import { useState } from 'react'
import useGameStore from '../store/gameStore'
import taskCategories from '../data/taskCategories'

export default function TaskPanel() {
  const { tasks, addTask, completeTask, failTask } = useGameStore()
  const [title, setTitle] = useState('')
  const [category, setCategory] = useState(taskCategories[0].id)

  const activeTasks = tasks.filter(t => !t.completed && !t.failed)

  const handleAdd = () => {
    if (!title.trim()) return
    const cat = taskCategories.find(c => c.id === category)
    addTask({ title, category, statKey: cat.statKey })
    setTitle('')
  }

  return (
    <div className="flex flex-col gap-4">
      <h2 className="text-lg font-semibold text-stone-200">Your Tasks</h2>

      {/* Add task */}
      <div className="flex flex-col gap-2">
        <input
          className="bg-stone-700 text-stone-100 rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-amber-500"
          placeholder="What will you do today?"
          value={title}
          onChange={e => setTitle(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && handleAdd()}
        />
        <select
          className="bg-stone-700 text-stone-100 rounded-lg px-3 py-2 text-sm outline-none"
          value={category}
          onChange={e => setCategory(e.target.value)}
        >
          {taskCategories.map(cat => (
            <option key={cat.id} value={cat.id}>{cat.label}</option>
          ))}
        </select>
        <button
          onClick={handleAdd}
          className="bg-amber-600 hover:bg-amber-500 text-white rounded-lg px-4 py-2 text-sm font-medium transition-colors"
        >
          Declare Task
        </button>
      </div>

      {/* Task list */}
      <div className="flex flex-col gap-2">
        {activeTasks.length === 0 && (
          <p className="text-stone-500 text-sm">No active tasks. Your land waits.</p>
        )}
        {activeTasks.map(task => (
          <div key={task.id} className="flex items-center justify-between bg-stone-700 rounded-lg px-3 py-2">
            <div>
              <p className="text-stone-200 text-sm">{task.title}</p>
              <p className="text-stone-500 text-xs capitalize">{task.category}</p>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => completeTask(task.id)}
                className="bg-green-700 hover:bg-green-600 text-white text-xs rounded px-2 py-1 transition-colors"
              >
                Done
              </button>
              <button
                onClick={() => failTask(task.id)}
                className="bg-red-800 hover:bg-red-700 text-white text-xs rounded px-2 py-1 transition-colors"
              >
                Failed
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}