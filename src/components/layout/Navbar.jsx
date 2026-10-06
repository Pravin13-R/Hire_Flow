import { useEffect, useRef, useState } from 'react'

const Navbar = () => {
  const [isAccountMenuOpen, setIsAccountMenuOpen] = useState(false)
  const accountMenuRef = useRef(null)

  useEffect(() => {
    if (!isAccountMenuOpen) return

    const handlePointerDown = (event) => {
      if (!accountMenuRef.current?.contains(event.target)) {
        setIsAccountMenuOpen(false)
      }
    }

    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        setIsAccountMenuOpen(false)
        accountMenuRef.current?.querySelector('button')?.focus()
      }
    }

    document.addEventListener('pointerdown', handlePointerDown)
    document.addEventListener('keydown', handleKeyDown)

    return () => {
      document.removeEventListener('pointerdown', handlePointerDown)
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [isAccountMenuOpen])

  return (
    <div className='rounded m-3 '> 
      <nav className="navbar navbar-expand-lg bg-white rounded border-bottom px-3 px-md-4">
      <div className="container-fluid row g-2 align-items-center">
        <div className="col-auto">
          <button
            className="btn btn-light d-lg-none"
            type="button"
            data-bs-toggle="offcanvas"
            data-bs-target="#sidebar"
            aria-controls="sidebar"
            aria-expanded="false"
            aria-label="Open navigation menu"
          >
            <i className="bi bi-list fs-4"></i>
          </button>
        </div>

        <form className="col-12 col-lg order-3 order-lg-0 mb-0">
          <div className="input-group">
            <span className="input-group-text bg-light border-0">
              <i className="bi bi-search"></i>
            </span>

            <input
              type="search"
              className="form-control bg-light border-0"
              placeholder="Search candidates, jobs, or keywords..."
            />
          </div>
        </form>


        <div className="col-auto ms-auto order-2 order-lg-0">
        <div className="d-flex align-items-center gap-3">

          {/* Notification */}
          {/* <button className="btn btn-light position-relative">
            <i className="bi bi-bell fs-5"></i>

            <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
              3
            </span>
          </button> */}

          {/* Settings */}
          {/* <button className="btn btn-light">
            <i className="bi bi-gear fs-5"></i>
          </button> */}



          <div className="dropdown" ref={accountMenuRef}>

            <button
              className="btn account-trigger d-flex align-items-center gap-2 dropdown-toggle"
              type="button"
              aria-haspopup="true"
              aria-controls="account-menu"
              aria-expanded={isAccountMenuOpen}
              aria-label="Open account menu"
              onClick={() => setIsAccountMenuOpen((open) => !open)}
            >
              <div className="profile-avatar">
                PR
              </div>

              <div className="text-start d-none d-md-block">
                <strong className="d-block">
                  Pravin R
                </strong>

                <small className="text-muted">
                  Recruiter
                </small>
              </div>
            </button>

            <ul
              id="account-menu"
              className={`dropdown-menu dropdown-menu-end account-menu${isAccountMenuOpen ? ' show' : ''}`}
            >
              <li className="account-menu-header">
                <div className="profile-avatar account-menu-avatar">PR</div>
                <div>
                  <strong className="d-block">Pravin R</strong>
                  <small className="text-muted">Recruiter account</small>
                </div>
              </li>

              <li>
                <a className="dropdown-item" href="#" onClick={() => setIsAccountMenuOpen(false)}>
                  <i className="bi bi-person me-2"></i>
                  Profile
                </a>
              </li>

              <li>
                <a className="dropdown-item" href="#" onClick={() => setIsAccountMenuOpen(false)}>
                  <i className="bi bi-gear me-2"></i>
                  Settings
                </a>
              </li>

              <li>
                <hr className="dropdown-divider" />
              </li>

              <li>
                <a className="dropdown-item account-menu-logout" href="#" onClick={() => setIsAccountMenuOpen(false)}>
                  <i className="bi bi-box-arrow-right me-2"></i>
                  Logout
                </a>
              </li>

            </ul>

          </div>

        </div>
        </div>

      </div>
    </nav>
    </div>
  )
}

export default Navbar