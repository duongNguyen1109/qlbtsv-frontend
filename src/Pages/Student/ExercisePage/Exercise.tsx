import { Button, FormControl, InputLabel, MenuItem, Select, SelectChangeEvent } from "@mui/material";
import axios, { AxiosRequestConfig } from "axios";
import React, { useState, useEffect, useTransition } from "react";
import { FunctionComponent } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { axiosInstance } from "../../../api";
import BainopItem from "./BainopItem";
import FileItem from "./FileItem";

interface ExcerciseProps {

}

interface ExcerciseInfor {
    IDBT: string,
    IDGV: string,
    TENBT: string,
    MOTA: string,
    LOAIBT: string,
    THOIHAN: string,
    TRANGTHAI: number
}

export interface BainopType {
    IDBAINOP: number,
    IDBTLOP: number,
    MASV: string,
    IDTOPIC: number,
    THOIGIANNOP: string,
    IDFILE: string,
    LOAITL: string,
    GHICHU: string | null,
    TENFILE: string
}

const Excercise: FunctionComponent<ExcerciseProps> = () => {
    const { id } = useParams();
    // const [status, setStatus] = useState('');
    const [image, setImage] = useState<{ preview: string, data: any }>({ preview: '', data: '' })
    const [exerciseInfor, setExerciseInfor] = useState<ExcerciseInfor | null>(null);
    const [topicList, setTopicList] = useState<{ IDTOPIC: string, TENTOPIC: string }[] | null>(null);
    const [topic, setTopic] = useState<string>('');
    const [listBainop, setListBainop] = useState<BainopType[]>([]);
    // const [fileUp, setFileUp] = useState<any>('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    function getExcercise(id: string, maSV: string): Promise<ExcerciseInfor[]> {
        return axiosInstance.post('/inforbtlop', {
            IDBTLOP: id,
            MASV: maSV
        });
    }

    function getTopicList(): Promise<{ IDTOPIC: string, TENTOPIC: string }[]> {
        return axiosInstance.get('/topic');
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

    const config: AxiosRequestConfig<FormData> = {
        onUploadProgress: progressEvent => console.log(progressEvent.loaded)
    }

    useEffect(() => {
        if (id) {
            getExcercise(id, localStorage.getItem('id') || '').then(res => {
                if (res.length === 0) {
                    navigate('/notfound');
                } else {
                    if (res.length === 1) {
                        setExerciseInfor(res[0]);
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
            setTopic(res[0].IDTOPIC);
            // console.log(res[0]);
        }).catch(err => console.log(err));
    }, [exerciseInfor]);

    useEffect(() => {
        getListBaiNop(id || '', localStorage.getItem('id') || '').then(res => {
            setListBainop(res);
        })
    })


    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        let formData = new FormData()
        formData.append('file', image.data);
        formData.append('IDBTLOP', id || '');
        formData.append('IDSVLOP', localStorage.getItem('id') || '');
        formData.append('IDTOPIC', topic);
        setLoading(true);
        axios.post('http://localhost:8080/api/image', formData, config).then(res => {
            // setFileUp(res);
            // setStatus(res.statusText);
            setLoading(false);
            setImage({ preview: '', data: '' });
        }).catch(err => {
            // setStatus('upload fail');
            console.log(err);
        });
    };


    const handleFileChange = (e: React.ChangeEvent) => {
        // setStatus('');
        const file = (e.target as HTMLInputElement).files?.[0];
        const img = {
            preview: file !== undefined ? URL.createObjectURL(file) : '',
            data: file ? file : '',
        }
        setImage(img)
    }

    const handleChange = (event: SelectChangeEvent) => {
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
                <div className=" col-lg-8 col-md-12">
                    <div className="border-bottom border-1 mb-4 pb-3 pe-3">
                        <h2>{exerciseInfor?.TENBT}</h2>
                        <div className="d-flex justify-content-between">
                            <span>{`Loại bài tập: ${exerciseInfor?.LOAIBT}`}</span>
                            <span>{`Hạn nộp đến: ${new Date(exerciseInfor?.THOIHAN || '').toLocaleString('en-GB', { timeZone: 'UTC' })}`}</span>
                        </div>
                    </div>
                    <div>
                        {exerciseInfor?.MOTA ? exerciseInfor.MOTA : ''}
                    </div>
                    <div className="row row-cols-2 g-3 mb-4">
                        {listBainop.length === 0 ? <p>Chưa có tài liệu nào được nộp!!</p> : listBainop.map(item => (
                            <div key={item.IDBAINOP} className='col'>
                                <BainopItem data={item} />
                            </div>
                        ))}
                    </div>
                </div>

                <div className='col-lg-4 col-md-12'>
                    <div className="rounded p-3 shadow border" style = {{position: 'sticky', top: '105px'}}>
                        <div className='d-flex justify-content-between align-items-center'>
                            <h4>Nộp bài tập</h4>
                            {exerciseInfor?.TRANGTHAI !== 1 ?
                                <span className='text-danger pe-2'>Bài tập đã đóng</span> : new Date(exerciseInfor?.THOIHAN || '') < new Date() ? <span className='text-danger pe-2'>Nộp muộn</span> : null}
                        </div>
                        <hr className="my-1"></hr>
                        <form onSubmit={handleSubmit}>
                            <div className='mt-3 mb-4'>
                                {image.preview &&
                                    <FileItem fileData={image} onDelete={clearImage} loading = {loading}/>}
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
                                    value={topic}
                                    label="Topic"
                                    onChange={handleChange}
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