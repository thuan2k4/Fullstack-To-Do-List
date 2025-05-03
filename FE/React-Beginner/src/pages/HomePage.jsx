import Navbar from "../components/Navbar"
import ListTask from './../components/tasks/ListTask';

function HomePage() {
    return (
        <>
            <Navbar />
            <div className="container mt-2 border border-black rounded-3 p-3">
                <div className="row">
                    <h1 className="text-center">To Do List</h1>
                </div>
                <div className="row">
                    <ListTask />
                </div>
            </div>
        </>
    )
}

export default HomePage