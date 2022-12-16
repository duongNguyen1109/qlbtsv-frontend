import { FunctionComponent, useEffect, useState } from "react";
import { Modal } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { axiosInstance } from "../../../api";
import AssItem from "../../Student/ClassPage/AssItem";
import { ExcerciseInfor } from "../../Student/ExercisePage/Exercise";
import { useFormik } from 'formik';
import * as yup from 'yup';
import { FormControl, FormHelperText, InputLabel, MenuItem, Select, TextField } from "@mui/material";
import dayjs, { Dayjs } from 'dayjs';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { BTMonType } from "../HomePage/MonPage/ObjectAss";
import { useClassStatus } from "./ClassTeacher";
import { toast } from "react-toastify";

interface ClassAssProps {

}

const ClassAss: FunctionComponent<ClassAssProps> = () => {
    const { monID, classID } = useParams();
    const [listAss, setListAss] = useState<ExcerciseInfor[]>([]);
    const [show, setShow] = useState(false);
    const [listBTMon, setListBTmon] = useState<BTMonType[]>([]);
    const [btMon, setBTMon] = useState<BTMonType>();
    const { CLASSSTATUS } = useClassStatus();

    function getListAss(): Promise<ExcerciseInfor[]> {
        return axiosInstance.get('/listbtlop/' + classID);
    }

    function getListBTMon(): Promise<BTMonType[]> {
        const GVID = localStorage.getItem('id');
        return axiosInstance.post('/listbtmongv', {
            IDGV: GVID,
            MHID: monID
        })
    }

    useEffect(() => {
        getListAss().then(res => {
            if (res.length > 0) {
                setListAss(res);
            }
        });
        getListBTMon().then(res => {
            console.log(res);
            if (res.length > 0) {
                setListBTmon(res);
            }
        })
    }, [])

    const validationSchema = yup.object({
        name: yup.string().required('Vui lòng nhập tên bài tập môn.'),
        typeBT: yup.string().required('Vui lòng chọn loại bài tập.'),
        due: yup.date().required('Vui lòng chọn hạn nộp.')
    });

    const formik = useFormik({
        initialValues: {
            name: btMon?.TENBT ?? '',
            typeBT: btMon?.LOAIBT ?? '',
            moTa: btMon?.MOTA ?? '',
            due: null
        },
        validationSchema: validationSchema,
        onSubmit: (values) => {
            const id = localStorage.getItem('id');
            axiosInstance.post('/btlop', {
                IDBT: btMon?.IDBT,
                IDCLASS: classID,
                THOIHAN: values.due,
                GHICHU: null,
                TRANGTHAI: 1
            }).then(res => {
                if (res.status === 200) {
                    setShow(false);
                    formik.resetForm();
                    setBTMon(undefined);
                    toast.success('Giao bài tập thành công!');
                    getListAss().then(res => {
                        setListAss(res);
                    })
                } else {
                    toast.info('Bài tập môn này đã giao, vui lòng chọn bài tập môn khác!')
                }
            }).catch(err => {
                console.log(err);
                toast.error('Giao bài tập thất bại!')
            });
        },
        enableReinitialize: true
    });

    return (
        <div className='row'>
            <div className='col-12 col-md-3'>
                <div className='rounded bg-white p-3 mb-3 shadow-sm border'>
                    <h4>Sắp đến hạn</h4>
                </div>
                <button className='btn btn-lg w-100 btn-primary mb-4' style={{ backgroundColor: '#0B409C' }} onClick={() => setShow(true)} disabled={CLASSSTATUS === 'closed'}>
                    Giao bài tập
                </button>
            </div>
            <div className='col-12 col-md-9'>
                {listAss.map((item) => (
                    <AssItem data={item} key={item.IDBTLOP} navigatePage='/teacher/exercise/' />
                ))}
            </div>

            <Modal
                size="lg"
                show={show}
                onHide={() => setShow(false)}
            >
                <Modal.Header closeButton>
                    <Modal.Title id="example-modal-sizes-title-lg">
                        Giao bài tập lớp
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form onSubmit={formik.handleSubmit}>
                        <FormControl fullWidth>
                            <InputLabel id="btmon">Chọn bài tập môn có sẵn</InputLabel>
                            <Select
                                labelId="btmon"
                                value={btMon}
                                label="Chọn bài tập môn có sẵn"
                                onChange={(e) => { setBTMon(listBTMon[Number(e.target.value)]) }}
                            >
                                {
                                    listBTMon ? listBTMon.map((item, index) => (
                                        <MenuItem value={index} key={item.IDBT}>{item.TENBT}</MenuItem>
                                    )) : null
                                }
                            </Select>
                        </FormControl>
                        <TextField
                            fullWidth
                            label='Tên bài tập môn*'
                            name='name'
                            value={formik.values.name}
                            onChange={formik.handleChange}
                            error={formik.touched.name && Boolean(formik.errors.name)}
                            helperText={formik.touched.name && formik.errors.name}
                            className='my-3' />
                        <FormControl fullWidth className='mb-3' error={formik.touched.typeBT && Boolean(formik.errors.typeBT)}>
                            <InputLabel id="loai-bt">Loại bài tập*</InputLabel>
                            <Select
                                labelId="loai-bt"
                                name='typeBT'
                                value={formik.values.typeBT}
                                label="Loại bài tập*"
                                onChange={formik.handleChange}
                            >
                                <MenuItem value={"Cá nhân"}>Cá nhân</MenuItem>
                                <MenuItem value={"Nhóm"}>Nhóm</MenuItem>
                            </Select>
                            <FormHelperText >{formik.touched.typeBT && formik.errors.typeBT}</FormHelperText>
                        </FormControl>
                        <TextField
                            fullWidth
                            label="Mô tả"
                            multiline
                            rows={6}
                            name='moTa'
                            value={formik.values.moTa}
                            onChange={formik.handleChange}
                            error={formik.touched.moTa && Boolean(formik.errors.moTa)}
                            helperText={formik.touched.moTa && formik.errors.moTa}
                            className='mb-3'
                        />
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <DateTimePicker
                                renderInput={(props) => <TextField {...props} fullWidth name='due' error={formik.touched.due && Boolean(formik.errors.due)}
                                helperText={formik.touched.due && formik.errors.due}/>}
                                label="Hạn nộp*"
                                value={formik.values.due}
                                onChange={(value) => formik.setFieldValue('due', dayjs(value), true)}
                                className='mb-3'
                            />
                        </LocalizationProvider>
                        <button type='submit' className='btn btn-lg btn-primary me-3' disabled={formik.isSubmitting} style={{ backgroundColor: '#0B409C' }}>Giao</button>
                        <button type='button' className='btn btn-lg btn btn-outline-warning' disabled={!formik.dirty} onClick={() => formik.resetForm()}>Hủy</button>
                    </form>
                </Modal.Body>
            </Modal>
        </div>
    );
}

export default ClassAss;