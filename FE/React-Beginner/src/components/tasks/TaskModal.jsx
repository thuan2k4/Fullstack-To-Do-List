import Modal from '../Modal'
import Form from '../Form'

function TaskModal({ type, task, onClose, onSubmit, onDelete }) {
    const titles = {
        add: 'Add Task',
        update: 'Update Task',
        delete: 'Delete Task',
    }

    return (
        <Modal title={titles[type]} onClose={onClose}>
            {type === 'delete'
                ? (<div className="modal-body">
                    <p>Bạn có chắc muốn xóa task này không?</p>
                    <div className="modal-footer">
                        <button className="btn btn-secondary" onClick={onClose}>Hủy</button>
                        <button className="btn btn-danger" onClick={onDelete}>Xóa</button>
                    </div>
                </div>)
                : (<Form onSubmit={onSubmit} onClose={onClose}>
                    <div className="form-group">
                        <label>Tên Task</label>
                        <input
                            type="text"
                            className="form-control"
                            name="title"
                            defaultValue={task?.title || ''}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label>Mô tả</label>
                        <input
                            type="text"
                            className="form-control"
                            name="description"
                            defaultValue={task?.description || ''}
                            required
                        />
                    </div>
                    {type === 'update' ? (
                        <div className="form-group">
                            <label>Status</label>
                            <select
                                className="form-control"
                                name="complete"
                                defaultValue={task?.complete || 'danger'}
                            >
                                <option value="danger">Working</option>
                                <option value="success">Done</option>
                            </select>
                        </div>
                    ) : (
                        <input
                            type="hidden"
                            name="complete"
                            value="danger"
                        />
                    )}
                </Form>)
            }
        </Modal>
    )
}

export default TaskModal