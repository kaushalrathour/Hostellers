export default function Navbar () {
    return (
        <>
    <nav class="navbar navbar-expand-lg bg-body-tertiary mb-3">
    <div class="container-fluid">
      <a class="navbar-brand" href="/home"><img src="/images/logo.png" alt="logo" height="36"/></a>
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav me-auto mb-2 mb-lg-0">
          <li class="nav-item">
            <a class="nav-link active" aria-current="page" href="/listings">Explore</a>
          </li>
          
            <li class="nav-item">
              <a class="nav-link active" aria-current="page" href="/listings/new">List your hostel</a>
            </li>
          
            <li class="nav-item">
              <a class="nav-link active" aria-current="page" href="/switch">Switch To Bussiness</a>
            </li>
          
          
        </ul>
        <form class="d-flex mx-auto" role="search">
          <input class="form-control me-2" type="search" placeholder="Search by College /City" aria-label="Search"/>
          <button class="btn btn-outline-success" type="submit">Search</button>
        </form>
        <ul class="navbar-nav ms-auto mb-2 mb-lg-0">
          <li class="nav-item">
            <a class="nav-link active" aria-current="page" href="/login">Login</a>
          </li>
          <li class="nav-item">
            <a class="nav-link active" aria-current="page" href="/register">Sign Up</a>
          </li>
          <li class="nav-item">
            <a class="nav-link active" aria-current="page" href="#">Logout</a>
          </li>
        </ul>
      </div>
    </div>
  </nav>
        </>
    )
}