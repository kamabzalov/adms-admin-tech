import { clearCache } from "../dashboard/users/user.service"

const ClearCache = () => (
    <div className='fixed-bottom d-flex justify-content-end m-4'>
        <button className='btn btn-primary btn-icon px-14 fs-8' onClick={() => clearCache()}>
            <i className='ki-duotone ki-trash fs-1'>
            </i>
            Clear server cache
        </button>
    </div>
)

export { ClearCache }
