import { Button, FormControl, IconButton, InputLabel, MenuItem, Select, SelectChangeEvent } from "@mui/material";
import axios, { AxiosRequestConfig } from "axios";
import React, { useState, useEffect, useRef } from "react";
import { FunctionComponent } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { axiosInstance } from "../../../api";
import BainopItem, { TopicType } from "./BainopItem";
import FileItem from "./FileItem";
import { MdOutlineAssignment, MdArrowBack } from "react-icons/md";

interface ExcerciseProps {

}

export interface ExcerciseInfor {
    IDBTLOP: string,
    IDBT: string,
    IDGV: string,
    IDCLASS: string,
    TENBT: string,
    MOTA: string,
    LOAIBT: string,
    THOIHAN: string,
    TRANGTHAI: number
}

export interface BainopType {
    IDBAINOP: number,
    IDBTLOP: number,
    nguoiNop: {
        HoTen: string,
        MASV: string,
        LOP: string
    }[],
    IDTOPIC: number,
    THOIGIANNOP: string,
    IDFILE: string,
    LOAITL: string,
    GHICHU: string | null,
    TENFILE: string,
    WEBVIEWLINK: string,
    MASV?: string, //"B17DCPT265",
    HODEM?: string, //"Nguyễn Đỗ Tuấn",
    TENSV?: string, //"Minh",
}

export function getTopicList(): Promise<TopicType[]> {
    return axiosInstance.get('/topic');
}

const Excercise: FunctionComponent<ExcerciseProps> = () => {
    const { id } = useParams();
    const [image, setImage] = useState<{ preview: string, data: any }>({ preview: '', data: '' })
    const [exerciseInfor, setExerciseInfor] = useState<ExcerciseInfor | null>(null);
    const [topicList, setTopicList] = useState<TopicType[] | null>(null);
    const [topic, setTopic] = useState<string | undefined>(undefined);
    const initialTopic = useRef('');
    const [listBainop, setListBainop] = useState<BainopType[]>([]);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    function getExcercise(id: string, maSV: string): Promise<ExcerciseInfor[]> {
        return axiosInstance.post('/inforbtlop', {
            IDBTLOP: id,
            USERID: maSV,
            role: 'SV'
        });
    }

    function getTopic(idBT: string, maSV: string): Promise<{ IDTOPIC: string, TENTOPIC: string }[]> {
        return axiosInstance.post('/topicbainop', {
            IDBTLOP: idBT,
            MASV: maSV
        });
    }

    function getListBaiNop(id: string, maSV: string): Promise<BainopType[]> {
        return axiosInstance.post('/baiNop', {
            IDBTLOP: id,
            MASV: maSV
        })
    }

    useEffect(() => {
        if (id) {
            getExcercise(id, localStorage.getItem('id') || '').then(res => {
                if (res.length === 0) {
                    navigate('/notfound');
                } else {
                    if (res.length === 1) {
                        setExerciseInfor(res[0]);
                        console.log(res[0]);
                    }
                }
            }).catch(err => {
                console.log(err);
                navigate('/notfound')
            });
            getTopicList().then(res => {
                setTopicList(res);
            });
            getListBaiNop(id, localStorage.getItem('id') || '').then(res => {
                setListBainop(res);
            })
        }
    }, [])

    useEffect(() => {
        getTopic(id || '', localStorage.getItem('id') || '').then(res => {
            if (res.length > 0) {
                initialTopic.current = res[0].IDTOPIC;
            }
            console.log(res);
        }).catch(err => console.log(err));
    }, [exerciseInfor]);

    useEffect(() => {
        getListBaiNop(id || '', localStorage.getItem('id') || '').then(res => {
            setListBainop(res);
        });
    }, [loading]);

    function reload() {
        getListBaiNop(id || '', localStorage.getItem('id') || '').then(res => {
            setListBainop(res);
        });
    }

    console.log(initialTopic.current);


    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        let formData = new FormData();
        formData.append('file', image.data, image.data.name);
        formData.append('IDBTLOP', id || '');
        formData.append('MASV', localStorage.getItem('id') || '');
        formData.append('IDTOPIC', topic ?? '');
        formData.append('filename', image.data.name);
        setLoading(true);
        axios.post('http://localhost:8080/api/image', formData).then(res => {
            setLoading(false);
            clearImage();
        }).catch(err => {
            setLoading(false);
            toast.error('Nộp tài liệu thất bại');
            console.log(err);
        });
    };


    const handleFileChange = (e: React.ChangeEvent) => {
        const file = (e.target as HTMLInputElement).files?.[0];
        const img = {
            preview: file !== undefined ? URL.createObjectURL(file) : '',
            data: file ? file : '',
        }
        console.log(img);
        setImage(img)
    }

    const handleTopicChange = (event: SelectChangeEvent) => {
        if (event.target.value !== topic) {
            if (window.confirm('Thay đổi topic có thể bị trừ điểm, bạn có muốn đổi? ')) {
                setTopic(event.target.value as string);
            }
        } else {
            setTopic(event.target.value as string);
        }
    };

    function clearImage() {
        setImage({ preview: '', data: '' });
    }



    return (
        <div className="container my-4 pt-2">
            <div className='row'>
                <div className="col-12" style={{ maxWidth: '' }}>
                    <div className='rounded shadow border p-3 mb-4' style={{ backgroundColor: 'white' }}>
                        <div className="border-bottom border-1 mb-4 pb-3 pe-3">
                            <div className='d-flex align-items-center gap-2'>
                                <div className="d-flex">
                                    <IconButton onClick={() => navigate('/student/class/' + exerciseInfor?.IDCLASS + '/assigment')}>
                                        <MdArrowBack />
                                    </IconButton>
                                    <div className='rounded-circle position-relative' style={{ backgroundColor: '#f6931e', width: '2.5em', height: '2.5em' }}>
                                        <MdOutlineAssignment className='fs-3 text-white position-absolute top-50 start-50 translate-middle' />
                                    </div>
                                </div>
                                <h2 className='m-0' style={{ color: '#10316B' }}>{exerciseInfor?.TENBT}</h2>
                            </div>
                            <div className="d-flex flex-column flex-lg-row justify-content-between mt-2 ps-4">
                                <p className='fs-5'>
                                    <b>Loại bài tập</b>
                                    {`: ${exerciseInfor?.LOAIBT}`}
                                </p>
                                <p className='fs-5'>
                                    <b>Hạn nộp đến</b>
                                    {`: ${new Date(exerciseInfor?.THOIHAN || '').toLocaleString('en-GB', { timeZone: 'UTC' })}`}
                                </p>
                            </div>
                        </div>
                        <div>
                            {exerciseInfor?.MOTA ? exerciseInfor.MOTA : ''}
                        </div>
                    </div>
                </div>

                <div className='col-lg-8 col-12'>
                    <div className="row row-cols-md-2 row-cols-1 g-3 mb-4">
                        {listBainop.length === 0 ? <p>Chưa có tài liệu nào được nộp!!</p> : listBainop.map(item => (
                            <div key={item.IDBAINOP} className='col'>
                                <BainopItem data={item} reload={reload} />
                            </div>
                        ))}
                    </div>
                </div>

                <div className='col-lg-4 col-md-12'>
                    <div className="rounded p-3 shadow border bg-white" style={{ position: 'sticky', top: '105px' }}>
                        <div className='d-flex justify-content-between align-items-center'>
                            <h4>Nộp bài tập</h4>
                            {exerciseInfor?.TRANGTHAI !== 1 ?
                                <span className='text-danger pe-2'>Bài tập đã đóng</span> :
                                new Date(exerciseInfor?.THOIHAN || '') < new Date() ?
                                    <span className='text-danger pe-2'>Nộp muộn</span> :
                                    null}
                        </div>
                        <hr className="my-1"></hr>
                        <form onSubmit={handleSubmit}>
                            <div className='mt-3 mb-4'>
                                {image.preview &&
                                    <FileItem fileData={image} onDelete={clearImage} loading={loading} />}
                            </div>
                            <label htmlFor="btn-upload" style={{ display: `${image.data ? 'none' : 'block'}` }} className='mb-3'>
                                <input
                                    id="btn-upload"
                                    name="btn-upload"
                                    style={{ display: 'none' }}
                                    type="file"
                                    onChange={handleFileChange} />
                                <Button
                                    className="btn-choose"
                                    variant="outlined"
                                    component="span" >
                                    Choose Files
                                </Button>
                            </label>
                            <FormControl fullWidth>
                                <InputLabel id="demo-simple-select-label">Topic</InputLabel>
                                <Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    value={topic ?? initialTopic.current}
                                    label="Topic"
                                    onChange={handleTopicChange}
                                >
                                    {topicList ? topicList.map(item => (
                                        <MenuItem key={item.IDTOPIC} value={item.IDTOPIC}> {item.TENTOPIC}</MenuItem>
                                    )) : null}
                                </Select>
                                <button type='submit' className="btn btn-primary mt-3" disabled={exerciseInfor?.TRANGTHAI === 1 ? false : true}>Submit</button>
                            </FormControl>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default React.memo(Excercise);