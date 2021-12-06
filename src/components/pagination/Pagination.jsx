/*libs*/
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Pagination } from 'antd';

/*other*/
import './style.css';

const PaginationComponent = ({ totalFilms, changeFilms, type }) => {
    const { options, filters } = useSelector(({ data: { data: { options, filters } } }) => ({
        options, filters
    }));

    const [currentPage, setCurrentPage] = useState(options.page);
    const [currentPerPage, setCurrentPerPage] = useState(options.perPage);

    const onChange = async (page, pageSize) => {
        await changeFilms(page, pageSize, type === "all" ? filters.sortBy : null);
        setCurrentPage(options.page);
        setCurrentPerPage(options.perPage);
    }

    return (
        <>
            {options.perPage ? (
                <Pagination
                    showQuickJumper
                    pageSizeOptions={[5, 10, 15, 20]}
                    pageSize={currentPerPage}
                    current={currentPage}
                    total={totalFilms}
                    onChange={onChange} />
            ) : null}

        </>
    )
}

export default PaginationComponent;