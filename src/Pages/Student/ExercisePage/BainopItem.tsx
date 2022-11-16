import { FunctionComponent } from "react";
import { BainopType } from "./Exercise";
import fileIcon from '../../../image/file-icon1.png';
import style from "./Exercise.module.css";

interface BainopItemProps {
    data: BainopType
}

const BainopItem: FunctionComponent<BainopItemProps> = ({ data }) => {
    return (
        <div className={`bg-white rounded p-2 border pointer ${style.bainopItem}`}>
            {
                data.LOAITL.split('/')[0] === 'image' ?
                    <img src={"https://drive.google.com/uc?export=view&id=" + data.IDFILE}
                        className='w-100'
                        style={{ objectFit: 'contain', aspectRatio: '1/1' }} alt = 'fileImg'></img> : 
                        <img src= {fileIcon} className='w-100'
                        style={{ objectFit: 'contain', aspectRatio: '1/1' }} alt = 'fileIcon'/>
            }

            <div>
                <a href={'https://drive.google.com/uc?id='  + data.IDFILE} target = '_blank'><h5 className="w-100 text-truncate">{data.TENFILE}</h5></a>
                <span><b>Người nộp</b>: {data.MASV}</span><br></br>
                <span><b>Thời gian: </b>{new Date(data.THOIGIANNOP).toLocaleString('en-GB', { timeZone: 'UTC' })}</span>
            </div>
        </div>
    );
}

export default BainopItem;