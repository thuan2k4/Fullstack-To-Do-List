const base_url = "http://localhost:5000"

export async function getTasks() {
    const res = await fetch(`${base_url}/api/getTaskList`)
    if (!res.ok) throw new Error("Failed to fetch tasks")
    return res.json()
}

export async function addTask(data) {
    const res = await fetch(`${base_url}/api/todo`, {
        headers: { "Content-Type": "application/json" },
        method: "POST",
        body: JSON.stringify(data)
    })
    if (!res.ok) throw new Error("Failed to add tasks")
    return res.json()
}

export async function updateTask(id, data) {
    const res = await fetch(`${base_url}/api/todo/${id}`, {
        headers: { "Content-Type": "application/json" },
        method: "PUT",
        body: JSON.stringify(data)
    })
    if (!res.ok) throw new Error("Failed to update tasks")
    return res.json()
}

export async function deleteTask(id) {
    const res = await fetch(`${base_url}/api/todo/${id}`, {
        headers: { "Content-Type": "application/json" },
        method: "DELETE"
    })
    if (!res.ok) throw new Error("Failed to delete tasks")
    return res.json()
}