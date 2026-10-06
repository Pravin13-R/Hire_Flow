import { NavLink } from 'react-router-dom'

const Sidebar = () => {

  const menuItem = [
    {
      name : "Dashboard",
      path : "/",
      icon : "bi-grid-1x2-fill"
    },

    {
      name : "Candidates",
      path : "/candidates",
      icon : "bi-people-fill"
    },

    {
      name : "Jobs",
      path : "/jobs",
      icon : "bi-briefcase-fill"
    },
    
    {
      name : "Pipelines",
      path : "/pipelines",
      icon : "bi-kanban-fill"
    },
    
    {
      name : "Interviews",
      path : "/interviews",
      icon : "bi-calendar-check-fill"
    },

    {
  name: "Skill Matching",
  path: "/skill-matching",
  icon: "bi-person-check-fill"
},

    {
      name : "Analytics",
      path : "/analytics",
      icon : "bi-bar-chart-fill"
    },
    
    {
      name : "Messages",
      path : "/messages",
      icon : "bi-chat-left-text-fill"
    },

    {
      name : "Team",
      path : "/team",
      icon : "bi-people"
    },

    {
      name : "Settings",
      path : "/settings",
      icon : "bi-gear-fill"
    },
  ]
  return (
      <aside
        id="sidebar"
        tabIndex="-1"
        className="sidebar offcanvas-lg offcanvas-start d-flex flex-column flex-shrink-0 p-3 text-white bg-dark"
      >
        <div className="d-flex align-items-center mb-3 px-2">
          <i className="bi bi-people-fill text-primary fs-1 me-2"></i>
          <div>

            <h4>Hire<span className='text-primary'>Flow</span></h4>

            <small > Hire Smarter, Grow Faster</small>
          </div>
          <button
            className="btn-close btn-close-white d-lg-none ms-auto"
            type="button"
            data-bs-dismiss="offcanvas"
            aria-label="Close navigation menu"
          ></button>
        </div>
            <hr />


        <ul className='nav nav-pills flex-column gap-3 mb-auto'>

          {menuItem.map((item) => (
            <li className="nav-item" key={item.name}>

              <NavLink to={item.path} className={({ isActive }) =>
              `nav-link text-white d-flex align-item-center px-3 py-1 ${
                isActive ? "active" : ""
              }`
            }
              
              >
                <i className= {`bi ${item.icon} fs-5 me-3`}></i>
                <span>{item.name}</span>

                {item.badge && (
                  <span className='badge bg-danger rounded-pill ms-auto'>{item.badge}</span>
                )}

              </NavLink>

            </li>
          )
        )}
        </ul>
      </aside>
  )
}

export default Sidebar