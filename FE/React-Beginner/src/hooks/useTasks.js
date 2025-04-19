import { useState, useEffect } from 'react'
import { getTasks, addTask, updateTask, deleteTask } from '../api/api'

export function useTasks() {
    const [tasks, setTasks] = useState([]) // list task
    const [loading, setLoading] = useState(true) // status loading 
    const [error, setError] = useState(null) // error

    // fectch
    useEffect(() => {
        const fetchTasks = async () => {
            try {
                const data = await getTasks()
                setTasks(data)
            } catch (err) {
                setError(err.message)
            } finally {
                setLoading(false)
            }
        }
        fetchTasks()
    }, [])

    // ...prev là 1 spread operator (chứa "..." trước 1 biến)
    // cho phép sao chép 1 array, dict,...
    const handleAdd = async (taskData) => {
        try {
            const newTask = await addTask(taskData)
            setTasks((prev) => [...prev, newTask])
        } catch (err) {
            setError(err.message)
        }
    }

    // method map được hiểu như là 1 biến List comprehension
    // thao tác trên 1 mảng và muốn trả về 1 mảng các giá trị thay đổi dựa trên giá trị của mảng đầu vào
    const handleUpdate = async (id, taskData) => {
        try {
            const updatedTask = await updateTask(id, taskData)
            setTasks((prev) => prev.map((t) => (t.id === id ? updatedTask : t)))
        } catch (err) {
            setError(err.message)
        }
    }

    // method filter giúp fill mảng với điều kiện đầu vào
    const handleDelete = async (id) => {
        try {
            await deleteTask(id)
            setTasks((prev) => prev.filter((t) => t.id !== id))
        } catch (err) {
            setError(err.message)
        }
    }

    return { tasks, loading, error, handleAdd, handleUpdate, handleDelete }
}