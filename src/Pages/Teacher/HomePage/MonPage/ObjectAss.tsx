import { FunctionComponent, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { axiosInstance } from "../../../../api";
import { MonType } from "../HomeTeacher";
import PageHeader from "../../PageHeader";
import { useFormik } from 'formik';
import { FormControl, FormHelperText, InputLabel, MenuItem, Select, TextField } from "@mui/material";
import * as yup from 'yup';
import { toast } from "react-toastify";
import BTMonCard from "./BTMonCard";

interface ObjectAssProps {

}

export type BTMonType = {
    IDBT: string, //"221029070114",
    MHID: string, //"MH0006",
    TENMH: string,//"Thiết kế tương tác đa phương tiện",
    TENVIETTAT: string,//"TKTT",
    IDGV: string,// "ANHVTT",
    GVTEN: string, //"Vũ Thị Tú Anh",
    TENBT: string,// "Thiết kế giao diện trang chủ",
    MOTA: string,//"",
    LOAIBT: string,//"Cá nhân"
}

const ObjectAss: FunctionComponent<ObjectAssProps> = () => {
    const { monID } = useParams();
    const navigate = useNavigate();
    const [monInfor, setMonInfor] = useState<MonType>();
    const [listBTmon, setListBTmon] = useState<BTMonType[]>([]);

    function getMonInfor(): Promise<MonType[]> {
        return axiosInstance.get('/mon/' + monID);
    }

    function getListBTMon(): Promise<BTMonType[]> {
        const id = localStorage.getItem('id');
        return axiosInstance.post('/listbtmongv', {
            IDGV: id,
            MHID: monID
        })
    }

    useEffect(() => {
        getMonInfor().then(res => {
            if (res.length === 1) {
                setMonInfor(res[0])
            } else {
                navigate('/notfound');
            }
        })

        getListBTMon().then(res => {
            if (res.length > 0) {
                setListBTmon(res);
            }
        })
    }, []);

    const validationSchema = yup.object({
        name: yup.string().required('Nhập tên bài tập môn'),
        typeBT: yup.string().required('Chọn loại bài tập'),
    });

    const formik = useFormik({
        initialValues: {
            name: '',
            typeBT: '',
            moTa: ''
        },
        validationSchema: validationSchema,
        onSubmit: (values) => {
            const id = localStorage.getItem('id');
            axiosInstance.post('/btmongv', {
                MHID: monID,
                IDGV: id,
                TENBT: values.name,
                MOTA: values.moTa,
                LOAIBT: values.typeBT
            }).then(res => {
                toast.success('Tạo bài tập môn thành công');
                getListBTMon().then(res => {
                    setListBTmon(res);
                })
            }).catch(err => {
                toast.error("Tạo bài tập môn thất bại!");
                console.log(err);
            });
            formik.resetForm();
        },
    });

    return (
        <div className="container">
            {monInfor ? <PageHeader title={monInfor.TENMH} pageNavigate='/teacher' /> : null}
            <div className='row mt-3'>
                <div className='col-12 col-lg-6'>
                    <div className='rounded border shadow bg-white p-3'>
                        <h3>Tạo bài tập môn</h3>
                        <form onSubmit={formik.handleSubmit}>
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
                            <button type='submit' className='btn btn-lg btn-primary me-3' disabled={formik.isSubmitting} style={{ backgroundColor: '#0B409C' }}>Tạo</button>
                            <button type='button' className='btn btn-lg btn btn-outline-warning' disabled={!formik.dirty} onClick={() => formik.resetForm()}>Hủy</button>
                        </form>
                    </div>
                </div>
                <div className='col-12 col-lg-6 my-4 mt-lg-0'>
                    <div className='rounded overflow-auto' style={{ maxHeight: 'calc(100vh - 220px)' }}>
                        {listBTmon ? listBTmon.map(item => {
                            return (
                                <BTMonCard key={item.IDBT} data={item} reload={() => {
                                    getListBTMon().then(res => {
                                        setListBTmon(res);
                                    })
                                }} />
                            )
                        }) : null}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ObjectAss;