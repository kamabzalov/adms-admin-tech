import { updateAll } from '../../users/user.service'

const ClearCache = () => (
    <div className='fixed-bottom d-flex justify-content-end m-3'>
        <button
            className='btn btn-primary font-weight-bold mr-2'
            onClick={() => updateAll()}
        >
            <i className='ki-duotone ki-trash fs-1'>
                <span className='path1'></span>
                <span className='path2'></span>
                <span className='path3'></span>
                <span className='path4'></span>
                <span className='path5'></span>
            </i>
            Clear server cache
        </button>
    </div>
)

export { ClearCache }
