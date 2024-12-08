import { PropTypes } from 'prop-types';
import { InfinityTable } from './InfinityTable';
import { Button } from "flowbite-react";

export function Modal({data, onCloseModal}){
    Modal.propTypes = {
        data: PropTypes.object.isRequired,
        onCloseModal: PropTypes.func.isRequired
    }

    return (
        <div className="w-full h-screen bg-slate-700/80 fixed flex flex-col justify-center items-center z-50">
            <div className='w-5/6 h-5/6 border-12 bg-white dark:bg-neutral-800 shadow-md dark:shadow-neutral-400 rounded-lg flex flex-col p-6 overflow-y-hidden overflow-x-hidden'>
                <div className='flex w-full justify-end '>
                    <Button pill size="xs" gradientMonochrome='failure' className='w-32' onClick={onCloseModal}>Cerrar X</Button>
                </div>
                <InfinityTable {...data} />
            </div>
        </div>
    )
}