import { FunctionComponent, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { axiosInstance } from "../../../api";
import { ExcerciseInfor } from "../ExercisePage/Exercise";
import AssItem from "./AssItem";

interface AssigmentProps {

}

const Assigment: FunctionComponent<AssigmentProps> = () => {
    const { id } = useParams();
    const [listAss, setListAss] = useState<ExcerciseInfor[]>([]);

    function getListAss(): Promise<ExcerciseInfor[]> {
        return axiosInstance.get('/listbtlop/' + id);
    }

    useEffect(() => {
        getListAss().then(res => {
            if (res.length > 0) {
                setListAss(res);
            }
        })
    }, [])

    return (
        <div className="row">
            <div className="d-none d-md-block col-md-3">
                <div className="px-2 py-3 bg-white rounded shadow">
                    <h6>Sắp đến hạn</h6>
                </div>
            </div>
            <div className="d-none d-sm-block col-md-9 ">
                {listAss.map((item) => (
                    <AssItem data = {item} key = {item.IDBTLOP}/>
                ))}
            </div>
        </div>
    );
}

export default Assigment;