import { BainopType } from "./Pages/Student/ExercisePage/Exercise";

export type GiaoVienType = {
    MAGV: string,// "ANHVTT",
    GVTEN: string, //"Vũ Thị Tú Anh",
    GVTEL: string, //"0949275686",
    // "GVEMAIL": "anhvtt@ptit.edu.vn",
    // "TRANGTHAI": "Active",
    // "NGAYSINH": 3,
    // "THANGSINH": 9,
    // "NAMSINH": 1975,
    // "PHANLOAI": "cohuu"
}

export type BaiNopSV =  {
	IDBT: string;
	IDBTLOP: number;
	IDCLASS: string;
	MHID: string;
	TENMH: string;
	IDGV: string;
	GVTEN: string;
	TENBT: string;
	MOTA: string;
	LOAIBT: string;
    baiNop: BainopType[]
}

export interface IMemberGroup {
	MASV: string;
	HoTen: string;
	EMAILSV?: any;
	NGAYSINH?: any;
	LOP?: any;
}

export interface IGroup {
	NHOMBTLID: string;
	CLASSID: string;
	MANHOM: string;
	TENNHOM: string;
	MASVTRUONGNHOM?: any;
	GHICHU?: any;
	TRANGTHAI: string;
	IDTOPIC?: any;
    thanhVien: IMemberGroup[]
}


