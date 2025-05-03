import { useState } from "react"
import Button from '../Button';
import TaskTable from "./TaskTable";
import { useTasks } from "../../hooks/useTasks";
import TaskModal from "./TaskModal";

function ListTask() {
    const { tasks, loading, error, handleAdd, handleUpdate, handleDelete } = useTasks()
    const [modalType, setModalType] = useState(null) // Status (on/off) modal
    const [selectedTask, setSelectedTask] = useState(null) // index task in table

    const openModal = (type, task = null) => {
        setModalType(type)
        setSelectedTask(task)
    }

    const closeModal = () => {
        setModalType(null)
        setSelectedTask(null)
    }

    const onSubmit = async (e) => {
        e.preventDefault() //lan truyen
        const formData = new FormData(e.target) // create form element
        const taskData = {
            title: formData.get('title'),
            description: formData.get('description'),
            complete: formData.get('complete')
        }
        //Show modal 
        if (modalType === 'add') await handleAdd(taskData)
        else if (modalType === 'update') await handleUpdate(selectedTask.id, taskData)
        closeModal()
    }

    const onDelete = async () => {
        await handleDelete(selectedTask.id)
        closeModal()
    }

    return (
        <div className="col">
            {loading && <p>Loading...</p>}
            {error && <p className="text-danger">{error}</p>}
            {!loading && !error && (
                <>
                    <Button onClick={() => openModal('add')} color="primary">Thêm Task</Button>
                    <TaskTable
                        tasks={tasks}
                        onEdit={(task) => openModal('update', task)}
                        onDelete={(task) => openModal('delete', task)}
                    />
                </>
            )}

            {modalType && (
                <TaskModal
                    type={modalType} // add, update, delete
                    task={selectedTask} // index element
                    onClose={closeModal}
                    onSubmit={onSubmit}
                    onDelete={onDelete}
                />
            )}
        </div>
    )
}

export default ListTask