import {Helmet} from "react-helmet";
export default function Card () {
    let URL = "http://localhost:3000/react"
    let fetchUrl = async() => {
        let res = await fetch(URL);
        return res;
    }
    let handleSubmit = async (event) => {
        event.preventDefault();
        let res = await fetchUrl();
        res = await res.json();
        console.log(res);

    }
    return (
        <>
        <Helmet>
            <title>Hostellers | Listings </title>
        </Helmet>
        <div className="card">
            <h1>Im Heading</h1>
            <form onSubmit={handleSubmit}>
                <button>Fetch API</button>
            </form>
        </div>
        </>
    ) 
}