import { IconButton } from "@mui/material";
import { FunctionComponent } from "react";
import { MdArrowBack } from "react-icons/md";
import { useNavigate } from "react-router-dom";

interface PageHeaderProps {
    title: string | undefined
    pageNavigate: string,
    endButton?: any
}

const PageHeader: FunctionComponent<PageHeaderProps> = ({
    title, pageNavigate, endButton
}) => {
    const navigate = useNavigate();
    return (
        <div className='mt-4 mb-3 rounded px-3 py-3 bg-white shadow border'>
            <div className = 'd-flex justify-content-between align-items-center'>
                <div className='d-flex gap-2 align-items-center'>
                    <IconButton onClick={() => navigate(pageNavigate)}>
                        <MdArrowBack />
                    </IconButton>
                    <h3 className='m-0'>{title}</h3>
                </div>
                {endButton}
            </div>
        </div>
    );
}

export default PageHeader;