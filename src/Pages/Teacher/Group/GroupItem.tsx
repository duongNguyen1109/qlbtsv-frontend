import { FunctionComponent, useEffect, useState } from "react";
import { IGroup, IMemberGroup } from "../../../type";
import { Chip } from '@mui/material';
import { MdFace } from "react-icons/md";
import { useAccordionButton } from "react-bootstrap";
import { getTopic, TopicType } from "../../Student/ExercisePage/BainopItem";

interface GroupItemProps {
    data: IGroup,
    index: number
}

const GroupItem: FunctionComponent<GroupItemProps> = ({ data, index }) => {

    const[topicInformation, setTopicInformation] = useState<TopicType>()

    useEffect(() => {
        getTopic(data.IDTOPIC).then(res => {
            setTopicInformation(res);
        })
    })
    return (
        <div className="card h-100">
            <div className='card-header'>
                {`${index}. ${data.TENNHOM}`}
            </div>
            <div className='card-body'>
                {data.thanhVien.map(member => (
                    <Chip className='mb-3' icon={<MdFace />} label={`${member.HoTen} - ${member.MASV}`} key={member.MASV}></Chip>
                ))}
            </div>
            <div className='card-footer'>
                {topicInformation?.TENTOPIC ? topicInformation.TENTOPIC : 'Chưa có topic'}
            </div>
        </div>
    );
}

export default GroupItem;