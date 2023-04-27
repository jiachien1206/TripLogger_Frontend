import React from 'react';
import Pagination from '@mui/material/Pagination';
import PaginationItem from '@mui/material/PaginationItem';
import Stack from '@mui/material/Stack';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

const Paging = ({ setPage, postNum, currentPage }) => {
    const handleChange = (event, value) => {
        setPage(value);
    };

    return (
        <Stack spacing={2}>
            <Pagination
                count={postNum}
                onChange={handleChange}
                renderItem={(item) => (
                    <PaginationItem
                        slots={{ previous: ArrowBackIcon, next: ArrowForwardIcon }}
                        {...item}
                        selected={currentPage === item.page}
                    />
                )}
            />
        </Stack>
    );
};

export default Paging;
