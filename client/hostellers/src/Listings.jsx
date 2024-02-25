import Cards from "./Cards"
export default function Listings () {
    return (
        <div className="row row-cols-lg-3 row-cols-md-3 row-cols-sm-1 mt-3">
            <Cards/>
            <Cards/>
            <Cards/>
            <Cards/>
        </div>
    )
}