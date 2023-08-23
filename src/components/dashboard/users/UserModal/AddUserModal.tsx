import { FC } from 'react'
import { AddUserModalBody } from './parts/UserModalBody'
import { CustomModal } from './parts/UserModalHeader'

type AddUserModalProps = {
    onClose: () => void
    title: string
}

export const AddUserModal: FC<AddUserModalProps> = ({ onClose, title }) => (
    <CustomModal onClose={onClose} title={title}>
        <AddUserModalBody />
    </CustomModal>
)
