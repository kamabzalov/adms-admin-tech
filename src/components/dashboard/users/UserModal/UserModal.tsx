import { FC } from 'react'
import { UserModalBody } from './parts/UserModalBody'
import { UserModalHeader } from './parts/UserModalHeader'

interface AddUserModalProps {
    onClose: () => void
}

export const UserModal: FC<AddUserModalProps> = ({ onClose }) => {
    return (
        <>
            <div
                className='modal fade show d-block'
                id='kt_modal_add_user'
                role='dialog'
                tabIndex={-1}
                aria-modal='true'
            >
                <div className='modal-dialog modal-dialog-centered mw-650px'>
                    <div className='modal-content'>
                        <UserModalHeader onClose={onClose} title={'Add user'} />
                        <div className='modal-body scroll-y mx-5 mx-xl-15 my-7'>
                            <UserModalBody />
                        </div>
                    </div>
                </div>
            </div>
            <div className='modal-backdrop fade show'></div>
        </>
    )
}
