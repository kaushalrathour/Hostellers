import "./Cards.css"
export default function Cards() {
    return (
        <>
             <a href="/listings" className="listing-link">
                <div className="card col">
                    <img src="https://images.pexels.com/photos/414612/pexels-photo-414612.jpeg?cs=srgb&dl=pexels-james-wheeler-414612.jpg&fm=jpg" className="card-img-top" alt="Image" style={{ height: "20rem" }} />
                    <div className="card-img-overlay"></div>
                    <div className="card-body">
                        <b><p className="card-text">JD Boy's Hostel</p></b><br />
                        &#x20B9;500
                    </div>
                </div>
            </a>
    </>
    );
}

