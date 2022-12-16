import React, { useEffect, useState } from 'react';
import { InputGroup, Button, Modal, Form } from 'react-bootstrap';
// import { Face } from '@mui/icons-material';
// import DeleteIcon from "@mui/icons-material/Delete";
import { useParams } from 'react-router-dom';
import { IGroup } from '../../../type';
import { axiosInstance } from '../../../api';
import GroupItem from './GroupItem';
import TopicManager from './TopicManager';

interface GroupPageProps {

}

const GroupPage: React.FC<GroupPageProps> = () => {
    const { classID } = useParams();

    const [listGroup, setListGroup] = useState<IGroup[]>([]);
    const [topicModalOpened, setTopicModalOpened] = useState(false);

    function getListGroup(): Promise<IGroup[]> {
        return axiosInstance.get('/nhomBTL/' + classID);
    }

    useEffect(() => {
        getListGroup().then(res => {
            if (res.length > 0) {
                setListGroup(res);
            }
        })
    }, [])

    return (
        <div className='container mt-3'>
            <Button variant="primary" onClick={() => setTopicModalOpened(true)}>Quản lý topic</Button>
            <div className='row row-cols-1 row-cols-md-2 row-cols-lg-3 gy-3 my-3'>
                {listGroup.map((group, index) => (
                    <div className = 'col' key = {group.MANHOM}>
                        <GroupItem data={group} index = {index}/>
                    </div>
                ))}
            </div>

            <Modal show={topicModalOpened} size='lg' onHide={() => setTopicModalOpened(false)} centered>
                <Modal.Header closeButton>
                    <Modal.Title>Quản lý topic</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <TopicManager />
                </Modal.Body>
            </Modal>

        </div>
    )
}

export default GroupPage;