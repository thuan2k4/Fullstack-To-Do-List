import Button from './../Button';

function TaskTable({ tasks, onEdit, onDelete }) {


    return (
        <div className="col">
            <table className="table table-bordered mt-2 rounded-3">
                <thead>
                    <tr>
                        <th className="col-1 text-center">ID</th>
                        <th className="col text-center">Task</th>
                        <th className="col-1 text-center">Status</th>
                        <th className="col-3 text-center">Description</th>
                        <th className="col-3"></th>
                    </tr>
                </thead>
                <tbody>
                    {tasks.length === 0
                        ? (
                            <tr>
                                <td colSpan={5} className="text-center">
                                    No Data
                                </td>
                            </tr>
                        )
                        : tasks.map((task) => (
                            <tr key={task.id}>
                                <td className="text-center">{task.id}</td>
                                <td className="text-center">{task.title}</td>
                                <td className="text-center">
                                    {task.complete === 'danger'
                                        ? (<i className="bi bi-x-circle text-danger"></i>)
                                        : (<i className="bi bi-check text-success"></i>)}
                                </td>
                                <td className="text-center">{task.description}</td>
                                <td className="text-center">
                                    <div className="d-flex flex-row justify-content-evenly">
                                        <Button onClick={() => onEdit(task)} color={"primary"} >
                                            <i className="bi bi-pencil"> Change</i>
                                        </Button>
                                        <Button onClick={() => onDelete(task)} color={"danger"} >
                                            <i className="bi bi-trash"> Delete</i>
                                        </Button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                </tbody>
            </table>
        </div>
    )
}
export default TaskTable