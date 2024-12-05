import { PropTypes } from 'prop-types';
import { InfinityTable } from './InfinityTable';
import { Button } from "flowbite-react";

export function Modal({title, datakey, onCloseModal}){
    Modal.propTypes = {
        title: PropTypes.string.isRequired,
        datakey: PropTypes.string.isRequired,
        onCloseModal: PropTypes.func.isRequired
    }

    return (
        <div className="w-full h-screen bg-slate-700/80 fixed flex flex-col justify-center items-center z-50">
            <div className='w-5/6 h-5/6 border-12 bg-white shadow-lg flex flex-col p-6 overflow-y-hidden overflow-x-scroll'>
                <div className='flex w-full justify-end '>
                    <Button gradientMonochrome='failure' className='w-40' onClick={onCloseModal}>Cerrar X</Button>
                </div>
                <InfinityTable title={title} datakey={datakey} />
            </div>
        </div>
    )
}