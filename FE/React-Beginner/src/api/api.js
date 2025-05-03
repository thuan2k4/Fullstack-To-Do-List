const base_url = "http://localhost:5000"

// Lấy token từ localStorage
const getToken = () => localStorage.getItem('token');

export async function getTasks() {
    const token = getToken();
    if (!token) throw new Error("No authentication token found");

    const res = await fetch(`${base_url}/tasks/api/v1/todos`, {
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
        method: "GET",
    });
    if (!res.ok) throw new Error("Failed to fetch tasks");
    return res.json();
}

export async function addTask(data) {
    const token = getToken();
    if (!token) throw new Error("No authentication token found");

    const res = await fetch(`${base_url}/tasks/api/v1/todo`, {
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
        method: "POST",
        body: JSON.stringify(data),
    });
    if (!res.ok) throw new Error("Failed to add task");
    return res.json();
}

export async function updateTask(id, data) {
    const token = getToken();
    if (!token) throw new Error("No authentication token found");

    const res = await fetch(`${base_url}/tasks/api/v1/todo/${id}`, {
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
        method: "PUT",
        body: JSON.stringify(data),
    });
    if (!res.ok) throw new Error("Failed to update task");
    return res.json();
}

export async function deleteTask(id) {
    const token = getToken();
    if (!token) throw new Error("No authentication token found");

    const res = await fetch(`${base_url}/tasks/api/v1/todo/${id}`, {
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
        method: "DELETE",
    });
    if (!res.ok) throw new Error("Failed to delete task");
    return res.json();
}

export async function Iris(sepalLength, sepalWidth, petalLength, petalWidth) {
    const token = getToken();
    if (!token) throw new Error("No authentication token found");

    const res = await fetch(`${base_url}/tasks/api/v1/predict`, {
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
        method: "POST",
        body: JSON.stringify({
            sepal_length: parseFloat(sepalLength),
            sepal_width: parseFloat(sepalWidth),
            petal_length: parseFloat(petalLength),
            petal_width: parseFloat(petalWidth),
        })
    });
    if (!res.ok) throw new Error("Failed to do task");
    return res.json();
}