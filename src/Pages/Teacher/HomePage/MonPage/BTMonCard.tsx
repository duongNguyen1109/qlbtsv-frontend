import useEnhancedEffect from "@mui/material/utils/useEnhancedEffect";
import { FunctionComponent, useState, useEffect } from "react";
import { Modal } from "react-bootstrap";
import { MdOutlineAssignment } from "react-icons/md";
import { BTMonType } from "./ObjectAss";
import { useFormik } from 'formik';
import { FormControl, FormHelperText, InputLabel, MenuItem, Select, TextField } from "@mui/material";
import { axiosInstance } from "../../../../api";
import * as yup from 'yup';
import { toast } from "react-toastify";

interface BTMonCardProps {
    data: BTMonType,
    reload: Function
}

const BTMonCard: FunctionComponent<BTMonCardProps> = ({ data , reload }) => {
    const [show, setShow] = useState(false);

    const validationSchema = yup.object({
        name: yup.string().required('Nhập tên bài tập môn'),
        typeBT: yup.string().required('Chọn loại bài tập'),
    });

    const formik = useFormik({
        initialValues: {
            name: data.TENBT,
            typeBT: data.LOAIBT,
            moTa: data.MOTA
        },
        validationSchema: validationSchema,
        onSubmit: (values) => {
            axiosInstance.put('/btmongv', {
                IDBT: data.IDBT, 
                MHID: data.MHID, 
                IDGV: data.IDGV, 
                TENBT: values.name, 
                MOTA: values.moTa, 
                LOAIBT: values.typeBT}).then(res => {
                    reload();
                    setShow(false);
                    toast.success('Thay đổi bài tập môn thành công!');
                })
            formik.resetForm();
        },
        enableReinitialize: true
    });

    return (
        <div>
            <div className="rounded bg-white p-3 shadow-sm border mb-2 pointer" onClick={() => { setShow(true) }}>
                <div className="d-flex gap-3 align-items-center">
                    <div className='rounded-circle position-relative'
                        style={{ backgroundColor: '#0B409C', width: '2.5em', height: '2.5em' }}>
                        <MdOutlineAssignment className='fs-3 text-white position-absolute top-50 start-50 translate-middle' />
                    </div>
                    <div>
                        <h5 className="text-truncate m-0 mb-1">Bài tập: {data.TENBT}</h5>
                        <span className='text-secondary text-opacity-75'>
                            Loại bài tập: {data.LOAIBT}
                        </span>
                    </div>
                </div>
            </div>
            <Modal
                size="lg"
                show={show}
                onHide={() => setShow(false)}
            >
                <Modal.Header closeButton>
                    <Modal.Title >
                        Sửa bài tập môn
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
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
                        <button type='submit' className='btn btn-lg btn-primary me-3' disabled={formik.isSubmitting} style={{ backgroundColor: '#0B409C' }}>Sửa</button>
                        <button type='button' className='btn btn-lg btn btn-outline-warning' disabled={!formik.dirty} onClick={() => formik.resetForm()}>Reset</button>
                    </form>
                </Modal.Body>
            </Modal>
        </div>
    );
}

export default BTMonCard;