import { FunctionComponent, useState } from "react";
import { Modal } from "react-bootstrap";
import { BsFillXCircleFill } from "react-icons/bs";
import style from "./Exercise.module.css";
import fileicon from '../../../image/file-icon1.png';
import React from "react";
import LinearProgress from '@mui/material/LinearProgress';

interface FileItemProps {
    fileData: {
        preview: string
        data: any
    },
    onDelete: Function,
    loading: boolean
}

const FileItem: FunctionComponent<FileItemProps> = ({ fileData, onDelete, loading }) => {
    const [show, setShow] = useState(false);

    function handleClose() {
        setShow(false);
    }
    return (
        <div className="rounded border">
            <div className='d-flex align-items-center rounded'>
                <img src={fileData.data.type.split('/')[0] === 'image' ? fileData.preview : fileicon} className="rounded-start border-end" style={{ objectFit: 'contain', minWidth: '80px', height: '80px' }} />
                <div className="text-truncate p-2 flex-grow-1" onClick={() => setShow(true)}>
                    <p className="text-truncate m-0 fw-semibold fs-5 pointer">{fileData.data.name}</p>
                    <span>{fileData.data.type}</span>
                </div>
                <button className={`btn fs-3 me-1`} style={{ border: 'none' }} onClick={() => onDelete()}>
                    <BsFillXCircleFill className={`${style.deleteIcon}`} style={{ zIndex: '2000' }} />
                </button>
            </div>
            <div style={{display: `${loading ? 'block' : 'none'}`}}>
                <LinearProgress />
            </div>
            <Modal show={show} onHide={handleClose} size="lg">
                <Modal.Header closeButton>
                    <Modal.Title>File preview</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {fileData.data.type.split('/')[0] === 'image' ? <img src={fileData.preview} width='100%' style={{ maxHeight: '80vh', objectFit: 'contain' }} /> :
                        <object type={fileData.data.type} data={fileData.preview} width="100%" style={{ height: '80vh' }}></object>
                    }
                </Modal.Body>
            </Modal>
        </div>
    );
}

export default React.memo(FileItem);