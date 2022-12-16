import { FunctionComponent, useState, useEffect } from "react";
import { BainopType } from "./Exercise";
import fileIcon from '../../../image/file-icon1.png';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import { Avatar, Button, FormControl, IconButton, InputLabel, MenuItem, Select, Typography } from "@mui/material";
import { FiX } from "react-icons/fi";
import { axiosInstance } from "../../../api";
import { Modal } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

interface BainopItemProps {
    data: BainopType,
    reload?: Function,
    changeTopic?: boolean,
    isSearch?: boolean
}

export type TopicType = {
    IDTOPIC: number,
    TENTOPIC: string//"Website bán hàng"
}

// @TODO Define type of student here.
export type StudentType = {
    MASV: string,
    HoTen: string
}



export function stringToColor(string: string) {
    let hash = 0;
    let i;
    for (i = 0; i < string.length; i += 1) {
        hash = string.charCodeAt(i) + ((hash << 5) - hash);
    }

    let color = '#';

    for (i = 0; i < 3; i += 1) {
        const value = (hash >> (i * 8)) & 0xff;
        color += `00${value.toString(16)}`.slice(-2);
    }
    return color;
}

function stringAvatar(name: string) {
    return {
        sx: {
            bgcolor: stringToColor(name),
        },
        children: `${name.split(' ')[0][0]}${name.split(' ')[1][0]}`,
    };
}

function deleteFile(id: string, reloadFunction: Function) {
    axiosInstance.delete('/file/' + id).then(res => {
        reloadFunction();
    }).catch(err => {
        console.log(err);
    });
}

export function getTopic(id : string): Promise<TopicType> {
    return axiosInstance.get('/topic/' + id);
}

const BainopItem: FunctionComponent<BainopItemProps> = ({ data, reload, changeTopic , isSearch }) => {
    const [show, setShow] = useState(false);
    const [topic, setTopic] = useState('');
    const [newTopic, setNewTopic] = useState('');
    const [listTopic, setListTopic] = useState<TopicType[]>([]);
    const navigate = useNavigate()


    function getListTopic(): Promise<TopicType[]> {
        return axiosInstance.get('/topic')
    }

    useEffect(() => {
        getTopic(String(data.IDTOPIC)).then(res => {
            setTopic(res.TENTOPIC);
        });

        getListTopic().then(res => {
            setListTopic(res);
        })
    }, [])

    return (
        <div>
            <Card>
                <CardHeader
                    avatar={
                        <Avatar >B</Avatar>
                    }
                    action={
                        reload ? <IconButton onClick={() => deleteFile(String(data.IDBAINOP), reload)}>
                            <FiX />
                        </IconButton> : null
                    }
                    title={data.nguoiNop?.[0].HoTen ?? `${data.HODEM} ${data.TENSV}`}
                    subheader={new Date(data.THOIGIANNOP).toLocaleString('en-GB', { timeZone: 'UTC' })}
                >
                </CardHeader>
                <CardMedia
                    component="img"
                    style={{ aspectRatio: '1/1', objectFit: 'contain' }}
                    image={data.LOAITL.split('/')[0] === 'image' ? "https://drive.google.com/uc?export=view&id=" + data.IDFILE : fileIcon}
                    alt="Hinh anh tai lieu"
                />
                <CardContent>
                    <h5 className="w-100 text-truncate">{data.TENFILE}</h5>
                    <Typography variant="body2">
                        <Typography variant="subtitle2" component='span' style={{ fontWeight: 'bold' }}>
                            Loại tài liệu:
                        </Typography>
                        {data.LOAITL}
                    </Typography>
                    <Typography variant="body2">
                        <Typography variant="subtitle2" component='span' style={{ fontWeight: 'bold' }}>
                            Topic:
                        </Typography>
                        {topic}
                    </Typography>
                    <Typography variant="body2">
                        <Typography variant="subtitle2" component='span' style={{ fontWeight: 'bold' }}>
                            Ghi chú:
                        </Typography>
                        {data.GHICHU}
                    </Typography>
                </CardContent>
                <CardActions>
                    <Button onClick={() => { window.open(data.WEBVIEWLINK, "_blank") }}>Xem</Button>
                    {changeTopic ? <Button onClick={() => { setShow(true)}}>Thay đổi topic</Button> : null}
                    {isSearch ? <Button onClick={() => { navigate('/teacher/exercise/' + data.IDBTLOP)}}>Đến trang bài tập</Button> : null}
                </CardActions>
            </Card>
            <Modal
                size="lg"
                show={show}
                onHide={() => {setShow(false); setNewTopic('')}}
            >
                <Modal.Header closeButton>
                    <Modal.Title>
                        Thay đổi topic
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <p><b>Topic hiện tại: </b>{topic}</p>
                    <FormControl fullWidth>
                        <InputLabel id="demo-simple-select-label">Topic</InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={newTopic}
                            label="Topic"
                            onChange={(e) => {
                                setNewTopic(e.target.value)
                            }}
                            className = 'mb-3'
                        >
                            {listTopic ? listTopic.map(item => (
                                <MenuItem key={item.IDTOPIC} value={item.IDTOPIC}> {item.TENTOPIC}</MenuItem>
                            )) : null}
                        </Select>
                    </FormControl>
                    <Button variant="contained" className = 'me-3'>Lưu</Button>
                    <Button variant="outlined" onClick = {() => {
                        setShow(false); setNewTopic('')
                    }}>Hủy</Button>
                </Modal.Body>
            </Modal>
        </div>
    );
}

export default BainopItem;