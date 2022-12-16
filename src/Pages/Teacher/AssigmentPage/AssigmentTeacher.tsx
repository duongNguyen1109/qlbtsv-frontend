import { Button, FormControl, IconButton, InputLabel, MenuItem, Select, TextField } from "@mui/material";
import { FunctionComponent, useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { MdOutlineAssignment, MdArrowBack } from "react-icons/md";
import { BainopType, ExcerciseInfor } from "../../Student/ExercisePage/Exercise";
import { axiosInstance } from "../../../api";
import { color } from "../../Student/HomePage/ClassCard";
import ListNguoiNop, { NguoiNopType } from "./ListNguoiNop";
import { FcDocument } from "react-icons/fc";
import BainopItem from "../../Student/ExercisePage/BainopItem";
import { Modal } from "react-bootstrap";
import dayjs, { Dayjs } from 'dayjs';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';

interface AssigmentTeacherProps {

}

const AssigmentTeacher: FunctionComponent<AssigmentTeacherProps> = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [assInfor, setAssInfor] = useState<ExcerciseInfor | null>();
    const [selected, setSelected] = useState<NguoiNopType | null>(null);
    const [filter, setFilter] = useState('all');
    const [listTaiLieu, setListTaiLieu] = useState<BainopType[]>([]);
    const [listFilter, setListFilter] = useState<BainopType[]>([]);
    const [giaHanShowed, setGiaHanShowed] = useState(false);
    const [newDue, setNewDue] = useState<Dayjs | null>(null)

    function getAss(): Promise<ExcerciseInfor[]> {
        const maGV = localStorage.getItem('id');
        return axiosInstance.post('/inforbtlop', {
            IDBTLOP: id,
            USERID: maGV,
            role: 'GV'
        });
    }

    useEffect(() => {
        getAss().then(res => {
            if (res.length > 0) {
                setAssInfor(res[0]);
            }
        }).catch(err => {
            navigate('/notfound')
        })
    }, []);

    function getListBaiNop(id: string, maSV: string): Promise<BainopType[]> {
        return axiosInstance.post('/baiNop', {
            IDBTLOP: id,
            MASV: maSV
        })
    }

    useEffect(() => {
        getListBaiNop(assInfor?.IDBTLOP || '', selected?.MASV || '').then(res => {
            console.log(res);
            setListTaiLieu(res);
            setFilter('all');
            setListFilter(res);
        })
    }, [selected]);

    useEffect(() => {
        let result: BainopType[];
        switch (filter) {
            case 'all':
                result = [...listTaiLieu];
                setListFilter(result);
                break;
            case 'topic':
                result = listTaiLieu.filter(item => true);
                setListFilter(result);
                break;
            case 'late':
                result = listTaiLieu.filter(item => new Date(item.THOIGIANNOP) > new Date(assInfor!.THOIHAN));
                setListFilter(result);
                break;
            case 'right':
                result = listTaiLieu.filter(item => new Date(item.THOIGIANNOP) <= new Date(assInfor!.THOIHAN));
                setListFilter(result);
                break;
        }
    }, [filter])

    return (
        <div className='container mt-3 py-2'>
            <div className='row'>
                <div className="col-12" style={{ maxWidth: '' }}>
                    <div className='rounded shadow border p-3 mb-4' style={{ backgroundColor: 'white' }}>
                        <div className="border-bottom border-1 mb-3 pb-1 pe-3">
                            <div className='d-flex align-items-center gap-2'>
                                <div className="d-flex">
                                    <IconButton onClick={() => window.history.back()}>
                                        <MdArrowBack />
                                    </IconButton>
                                    <div className='rounded-circle position-relative' style={{ backgroundColor: '#f6931e', width: '2.5em', height: '2.5em' }}>
                                        <MdOutlineAssignment className='fs-3 text-white position-absolute top-50 start-50 translate-middle' />
                                    </div>
                                </div>
                                <h2 className='m-0' style={{ color: '#10316B' }}>{assInfor?.TENBT}</h2>
                            </div>
                            <div className="d-flex flex-column flex-lg-row justify-content-between mt-2 ps-4">
                                <p className='fs-5'>
                                    <b>Loại bài tập</b>
                                    {`: ${assInfor?.LOAIBT}`}
                                </p>
                                <p className='fs-5'>
                                    <b>Hạn nộp đến</b>
                                    {`: ${new Date(assInfor?.THOIHAN || '').toLocaleString('en-GB', { timeZone: 'UTC' })}`}
                                </p>
                            </div>
                        </div>
                        <div className='px-2 mb-4'>
                            <h5>Mô tả: </h5>
                            {assInfor?.MOTA ? assInfor.MOTA : ''}
                        </div>
                        <div className='d-flex justify-content-between'>
                            <button className="btn btn-primary" style={{ backgroundColor: color[0] }} onClick = {() => setGiaHanShowed(true)}>
                                Gia hạn nộp bài
                            </button>
                            <button className="btn btn-primary" style={{ backgroundColor: color[0] }}>
                                Đóng bài tập
                            </button>
                        </div>
                    </div>
                </div>
                <div className='col-12 col-lg-4'>
                    <ListNguoiNop BTLopID={id!} hanNop={new Date(assInfor?.THOIHAN || '')} select={setSelected} />
                </div>
                <div className='col-12 col-lg-8'>
                    <div className="d-flex align-items-center gap-2 py-3 border-bottom">
                        <FcDocument className='fs-1' />
                        <h3 className="mb-0">Danh sách tài liệu {assInfor?.LOAIBT === 'Cá nhân' ? 'sinh viên' : 'nhóm'}: {selected ? selected.TEN : ''}</h3>
                    </div>

                    {selected ? <div>
                        <div className='d-flex justify-content-between align-items-center m-4'>
                            <span>Số lượng: {listFilter.length}</span>
                            <FormControl>
                                <InputLabel id="demo-simple-select-label">Lọc theo</InputLabel>
                                <Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    value={filter}
                                    label="Lọc theo"
                                    onChange={(e) => setFilter(e.target.value)}
                                    className='bg-white'
                                >
                                    <MenuItem value='all'>Tất cả</MenuItem>
                                    <MenuItem value='topic'>Thay đổi topic</MenuItem>
                                    <MenuItem value='late'>Nộp muộn</MenuItem>
                                    <MenuItem value='right'>Nộp đúng</MenuItem>
                                </Select>
                            </FormControl>
                        </div>
                        <div className="row row-cols-md-2 row-cols-1 g-3 mb-4">
                            {listFilter ? listFilter.map(item => (
                                <div key={item.IDBAINOP} className='col'>
                                    <BainopItem data={item} changeTopic={true} />
                                </div>
                            )) : null}
                        </div>
                    </div> : <p className='p-5 text-center fs-5'>Vui lòng chọn 1 {assInfor?.LOAIBT === 'Cá nhân' ? 'sinh viên' : 'nhóm'} đã nộp</p>}
                </div>
            </div>
            <Modal show={giaHanShowed} onHide={() => {

            }}>
                <Modal.Header closeButton>
                    <Modal.Title>Gia hạn bài tập</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DateTimePicker
                            renderInput={(props) => <TextField {...props} fullWidth name='due'/>}
                            label="Hạn nộp*"
                            value={newDue}
                            onChange={(value) => setNewDue(dayjs(value))}
                            className='mb-3'
                        />
                    </LocalizationProvider>
                    <Button variant="outlined">Lưu</Button>
                </Modal.Body>
            </Modal>
        </div>
    );
}

export default AssigmentTeacher;