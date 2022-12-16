import { FormControl, InputLabel, MenuItem, Select, Autocomplete, TextField } from "@mui/material";
import _ from "lodash";
import { useEffect, useState } from "react";
import { axiosInstance } from "../../../api";
import BainopItem, { StudentType, TopicType } from "../../Student/ExercisePage/BainopItem";
import { BainopType } from "../../Student/ExercisePage/Exercise";
import { MonType } from "../HomePage/HomeTeacher";
import { BaiNopSV } from "../../../type";
import { toast } from "react-toastify";

const ApiConstants = {
    LIST_MON: '/mon',
    LIST_CANHAN: '/sinhVien',
    LIST_TOPIC: '/topic',
    LIST_BAI_NOP_MON: '/listBaiNopMon/',
    LIST_BAI_NOP_CANHAN: '/listBaiNopCaNhan/',
    LIST_BAI_NOP_TOPIC: '/listBaiNopTopic/',
}

const FilterOptions = {
    mon: 'mon',
    sv: 'sv',
    topic: 'topic',
}

interface SearchPageProps {

}

interface SearchPageState {
    listMon: MonType[],
    listTopic: TopicType[],
    listStudent: StudentType[],
    autoCompleteOptions: IAutoCompleteOptions[],
    selectedValue: IAutoCompleteOptions | null
}
interface IAutoCompleteOptions { key: string, value: string, label: string };


const initialReferences = {
    listMon: [],
    listTopic: [],
    listStudent: [],
    autoCompleteOptions: [],
    selectedValue: null
}
export function getAllMon(): Promise<MonType[]> {
    return axiosInstance.get('/mon');
}

const SearchPage: React.FC<SearchPageProps> = () => {
    const [filter, setFilter] = useState<{ filterValue: string, uri: string }>({ filterValue: '', uri: '' });
    const [references, setReferences] = useState<SearchPageState>(initialReferences);
    const [listTaiLieu, setListTaiLieu] = useState<BainopType[] | null>(null)

    function getListTaiLieu(uri: string): Promise<BainopType[]> {
        return axiosInstance.get(uri)
    }

    function getListTaiLieuBySV(uri: string): Promise<BaiNopSV[]>{
        return axiosInstance.get(uri)
    }

    useEffect(() => {
        console.log(references.selectedValue);
        if (filter.filterValue === FilterOptions.mon) {
            getListTaiLieu(ApiConstants.LIST_BAI_NOP_MON + references.selectedValue?.value).then(res => {
                setListTaiLieu(res)
            })
        }
        if (filter.filterValue === FilterOptions.sv) {
            getListTaiLieuBySV(ApiConstants.LIST_BAI_NOP_CANHAN + references.selectedValue?.value).then(res => {
                const result: BainopType[] = [];
                for (let i = 0; i < res.length ; i++) {
                    if(res[i].baiNop.length > 0) {
                        for(let j = 0; j < res[i].baiNop.length; j++) {
                            result.push(res[i].baiNop[j]);
                        }
                    }
                }
                setListTaiLieu(result);
            }).catch(err => {
                setListTaiLieu([])
            })
        }
        if (filter.filterValue === FilterOptions.topic) {
            getListTaiLieu(ApiConstants.LIST_BAI_NOP_TOPIC + references.selectedValue?.value).then(res => {
                setListTaiLieu(res)
            })
        }
    }, [references.selectedValue]);

    console.log(listTaiLieu);

    /** @Handle_Component_Events */
    const handleOnKeyUp = (e: React.KeyboardEvent) => {
        _.debounce(() => {
            axiosInstance.get(filter.uri)
        }, 500)
    };

    const onFilterChange = (e: any) => {
        const { value } = e.target;
        let uri = '';
        if (value === FilterOptions.mon) {
            uri = ApiConstants.LIST_MON;
            axiosInstance.get<MonType[]>(uri).then((data: any) => {
                setReferences({
                    ...initialReferences,
                    listMon: data as MonType[],
                    autoCompleteOptions: extractListByFilterValue(value, data),
                    selectedValue: null
                })
            });
        }
        if (value === FilterOptions.sv) {
            uri = ApiConstants.LIST_CANHAN;
            axiosInstance.get(uri).then((data: any) => {
                setReferences({
                    ...initialReferences,
                    listStudent: data as StudentType[],
                    autoCompleteOptions: extractListByFilterValue(value, data),
                    selectedValue: null
                })
            });
        }
        if (value === FilterOptions.topic) {
            uri = ApiConstants.LIST_TOPIC;
            axiosInstance.get(uri).then((data: any) => {
                setReferences({
                    ...initialReferences,
                    listTopic: data as TopicType[],
                    autoCompleteOptions: extractListByFilterValue(value, data),
                    selectedValue: null
                })
            });
        }

        setFilter({ filterValue: value, uri })
    }

    const onTargetSelection = (event: any, newValue: IAutoCompleteOptions | null) => {
        setReferences({
            ...references,
            selectedValue: newValue
        });
    }


    /** @Handle_extraction */
    const extractListByFilterValue = (filterValue: string, data: any[]) => {
        if (filterValue === FilterOptions.mon) {
            return data.map((mon: MonType) => ({ key: mon.MHID, label: mon.TENMH, value: mon.MHID }));
        }
        if (filterValue === FilterOptions.sv) {
            return data.map((student: StudentType) => ({ key: student.MASV, label: student.HoTen + ' - ' + student.MASV, value: student.MASV }));
        }
        if (filterValue === FilterOptions.topic) {
            return data.map((topic: TopicType) => ({ key: `${topic.IDTOPIC}`, label: topic.TENTOPIC, value: String(topic.IDTOPIC) }));
        }
        return [] as IAutoCompleteOptions[];
    }


    return (
        <div className="container">
            <div className="row">
                <div className="col-3">
                    <FormControl fullWidth style={{ backgroundColor: 'white' }}>
                        <InputLabel id="search-filter" onKeyUp={handleOnKeyUp}>Tìm kiếm theo</InputLabel>
                        <Select
                            labelId="search-filter"
                            value={filter.filterValue}
                            label="Tìm kiếm theo"
                            onChange={onFilterChange}
                        >
                            <MenuItem value={FilterOptions.mon}>Môn học</MenuItem>
                            <MenuItem value={FilterOptions.sv}>Sinh viên</MenuItem>
                            <MenuItem value={FilterOptions.topic}>Topic</MenuItem>
                        </Select>
                    </FormControl>
                </div>
                <div className='col-9'>
                    <Autocomplete
                        style={{ backgroundColor: 'white' }}
                        disablePortal
                        value={references.selectedValue}
                        onChange={onTargetSelection}
                        options={references.autoCompleteOptions}
                        renderInput={(params) => <TextField {...params} label="Từ khóa" />}
                    />
                </div>
            </div>
            <div className='my-3'>
                {listTaiLieu === null ? null : listTaiLieu?.length === 0 ? <div className="d-flex align-items-center justify-content-center" style={{ minHeight: '50vh' }}>
                    <div>
                        <div className="w-100 d-flex justify-content-center">
                            <img src='https://cdn-icons-png.flaticon.com/512/5089/5089733.png' alt="Danh sách rống" className="w-25" />
                        </div>
                        <p className='text-secondary text-center mt-2'>Không tìm thấy kết quả phù hợp</p>
                    </div>
                </div> : (
                    <div className='row row-cols-sm-1 row-cols-md-2 row-cols-lg-4 g-3'>
                        {
                            listTaiLieu.map(item => (
                                <div className="col" key={item.IDFILE}>
                                    <BainopItem data={item} isSearch/>
                                </div>
                            ))
                        }
                    </div>
                )}
            </div>
        </div>
    );
}

export default SearchPage;