import { useEffect, useState } from "react"
import { Iris } from "../api/api"
function Predict() {
    const [sepalLength, setSepalLength] = useState(null)
    const [sepalWidth, setSepalWidth] = useState(null)
    const [petalLength, setPetalLength] = useState(null)
    const [petalWidth, setPetalWidth] = useState(null)

    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)
    const [trigger, setTrigger] = useState(false)

    const irisClasses = {
        0: "Setosa",
        1: "Versicolor",
        2: "Virginica",
    }

    const [result, setResult] = useState(null)
    const [accuracy, setAccuracy] = useState(null)

    const handleSubmit = async (e) => {
        e.preventDefault()
        setError(null)
        setLoading(true)
        setTrigger(!trigger)
    }

    useEffect(() => {
        if (!trigger && !loading) return

        const predictIris = async () => {
            try {
                const data = await Iris(sepalLength, sepalWidth, petalLength, petalWidth)
                setResult(irisClasses[data.prediction])
                setAccuracy(data.accuracy)
            } catch (err) {
                setError(err.message)
            } finally {
                setLoading(false)
            }
        }

        predictIris()

    }, [trigger, sepalLength, sepalWidth, petalLength, petalWidth, irisClasses, loading])

    return (
        <>
            <div className="d-flex align-items-center" style={{ height: '100vh' }}>
                <div className="container d-flex justify-content-center" >
                    <div className="col-6">
                        <div className="card">
                            <div className="card-body">
                                <div className="card-title text-center">
                                    <h2>
                                        Iris Flower
                                    </h2>
                                </div>
                                <div className="row">
                                    <form onSubmit={handleSubmit}>
                                        <label className='form-label'>Sepal length (cm): </label>
                                        <input
                                            className='form-control'
                                            type="number"
                                            value={sepalLength}
                                            onChange={(e) => setSepalLength(e.target.value)}
                                            required
                                        />
                                        <label className='form-label'>Sepal width (cm): </label>
                                        <input
                                            className='form-control'
                                            type="number"
                                            value={sepalWidth}
                                            required
                                            onChange={(e) => setSepalWidth(e.target.value)}
                                        />
                                        <label className='form-label'>Petal length (cm): </label>
                                        <input
                                            className='form-control'
                                            type="number"
                                            value={petalLength}
                                            required
                                            onChange={(e) => setPetalLength(e.target.value)}
                                        />
                                        <label className='form-label'>petal width (cm): </label>
                                        <input
                                            className='form-control'
                                            type="number"
                                            value={petalWidth}
                                            required
                                            onChange={(e) => setPetalWidth(e.target.value)}
                                        />
                                        <div className="col d-flex justify-content-center mt-2">
                                            <button type='submit' className='btn btn-outline-success'>Predict</button>
                                        </div>
                                    </form>
                                </div>
                                {error && (
                                    <div className="alert alert-danger mt-3" role="alert">
                                        {error}
                                    </div>
                                )}
                                {result && (
                                    <div className="alert alert-success mt-3" role="alert">
                                        Loài hoa Iris dự đoán: <strong>{result}</strong>
                                        {accuracy && (
                                            <div>
                                                Độ chính xác mô hình: <strong>{(accuracy * 100).toFixed(2)}%</strong>
                                            </div>
                                        )}
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Predict