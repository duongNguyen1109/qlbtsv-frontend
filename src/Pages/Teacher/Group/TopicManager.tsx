import { Divider, FormGroup, IconButton, List, ListItem, ListItemIcon, ListItemText, TextField } from "@mui/material";
import { FunctionComponent, useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { TopicType } from "../../Student/ExercisePage/BainopItem";
import { getTopicList } from "../../Student/ExercisePage/Exercise";
import { MdTopic } from "react-icons/md";
import { axiosInstance } from "../../../api";
import { toast } from "react-toastify";


interface TopicManagerProps {

}

const TopicManager: FunctionComponent<TopicManagerProps> = () => {
    const [newTopic, setNewTopic] = useState('');
    const [topicList, setTopicList] = useState<TopicType[]>([]);

    useEffect(() => {
        getTopicList().then(res => {
            setTopicList(res);
        })
    },[])

    function addTopic() {
        axiosInstance.post('/topic', {
            TENTOPIC: newTopic
        }).then(res => {
            toast.success('Tạo topic thành công!');
            getTopicList().then(res => {
                setTopicList(res);
            })
        }).catch(err => {
            if(err.response.status === 300 ){
                toast.error('Tên topic đã tồn tại!')
            }else{
                toast.error('Tạo topic mới thất bại!')
            }
        })
    }
    return (
        <div>
            <FormGroup>
                <TextField value={newTopic} onChange={(e) => setNewTopic(e.target.value)} id="input-topic" label="Tên topic" variant="outlined"></TextField>
                {/* {renderTopicError()} */}
                <Button className='mt-3' onClick={addTopic}>Thêm</Button>
            </FormGroup>
            <List>
                {topicList.map(item => (
                    <ListItem
                        key={item.IDTOPIC}
                        // secondaryAction={
                        //     <IconButton edge="end" onClick={() => deleteTopic(item.idTopic)}>
                        //         <DeleteIcon />
                        //     </IconButton>
                        // }
                        >
                        <ListItemIcon>
                            <MdTopic />
                        </ListItemIcon>
                        <ListItemText primary={item.TENTOPIC}></ListItemText>
                    </ListItem>
                )
                )}
            </List>
        </div>
    );
}

export default TopicManager;