import { Link } from "react-router-dom";

export function HeaderWrapper() {
    return (
        <div id='kt_app_header' className='app-header'>
            <div className='app-container flex-lg-grow-1 d-flex align-items-stretch justify-content-between'>
                <div className='d-flex align-items-stretch justify-content-between flex-lg-grow-1'>
                    <div className='app-header-menu app-header-mobile-drawer align-items-stretch'>
                        <div
                            className='menu menu-rounded menu-column menu-lg-row my-5 my-lg-0 align-items-stretch fw-semibold px 2 px-lg-0'>
                            <div className='menu-item me-lg-1'>
                                <Link className='menu-link py-3' to={'/microservices'}><span className="menu-title">Microservices</span></Link>
                            </div>
                            <div className='menu-item me-lg-1'>
                                <Link className='menu-link py-3' to={'/microservices'}><span className="menu-title">Microservices</span></Link>
                            </div>
                            <div className='menu-item me-lg-1'>
                                <Link className='menu-link py-3' to={'/microservices'}><span className="menu-title">Microservices</span></Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
