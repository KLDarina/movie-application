/*libs*/
import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Drawer, Select } from 'antd';
import { ArrowUpOutlined, ArrowDownOutlined } from '@ant-design/icons';

/*components*/
import Header from '../../components/header/Header';
import Preloader from '../../components/preloader/Preloader';
import FilmCard from '../../components/filmCard/FilmCard';
import PaginationComponent from '../../components/pagination/Pagination';
import Button from '../../components/button/Button';

/*other*/
import { setFilms, setGenres } from '../../store/actions/filmsActions/FilmsActions';
import { API, API_KEY } from '../../constants';
import './style.css';

const FilmsPage = () => {
    const { loading, films, options, filters } = useSelector(({ data: { data: { films, loading, options, filters } } }) => ({
        films, loading, options, filters
    }));

    const [visible, setVisible] = useState(false);
    const [sort, setSort] = useState(filters.sortBy);

    const dispatcher = useDispatch();

    const { Option } = Select;

    const handleFilms = useCallback(
        (page, perPage, sortBy) => {
            const API_ALL_FILMS = `${API}discover/movie?api_key=${API_KEY}&page=`;
            dispatcher(setGenres());
            dispatcher(setFilms('all', API_ALL_FILMS, page, perPage, sortBy));
        },
        [dispatcher]
    )

    useEffect(() => {
        handleFilms(1, 10, sort);
    }, [handleFilms, sort]);

    const showDrawer = () => {
        setVisible(true);
    };

    const onClose = () => {
        setVisible(false);
    };

    const handleSort = (value) => {
        setSort(value);
    };

    const spawnFilms = () => {
        if (films.all && options.perPage) {
            return films.all.results.map((film, index) => {
                return (index + 1 <= options.perPage) ?
                    (
                        <div className="films-main__item" key={film.id}>
                            <FilmCard film={film} />
                        </div>
                    )
                    : null
            })
        }
    }

    const applyFilter = () => {
        handleFilms(1, 10, sort);
    }

    return (
        <>
            {
                loading ? <Preloader /> :
                    <div className="wrapper">
                        <Header />
                        <div className="films-main">
                            <div className="films-main__title">All Films</div>
                            <div className="films-main__block">
                                {spawnFilms()}
                            </div>
                            <PaginationComponent totalFilms={films.all?.total_pages} changeFilms={handleFilms} type="all" />
                        </div>
                        <div className="films-main__filters">
                            <span onClick={showDrawer}>FILTERS</span>
                        </div>
                        <Drawer title="Filters" placement="right" onClose={onClose} visible={visible}>
                            <div className="filters__row">
                                <div className="filters__title">Sort By</div>
                                <Select defaultValue={sort} style={{ width: 200 }} onChange={handleSort}>
                                    <Option value="">no matter</Option>
                                    <Option value="popularity.asc">popularity <ArrowUpOutlined /></Option>
                                    <Option value="popularity.desc">popularity <ArrowDownOutlined /></Option>
                                    <Option value="release_date.asc">release date <ArrowUpOutlined /></Option>
                                    <Option value="release_date.desc">release date <ArrowDownOutlined /></Option>
                                    <Option value="revenue.asc">revenue <ArrowUpOutlined /></Option>
                                    <Option value="revenue.desc">revenue <ArrowDownOutlined /></Option>
                                    <Option value="primary_release_date.asc">primary release date <ArrowUpOutlined /></Option>
                                    <Option value="primary_release_date.desc">primary release date <ArrowDownOutlined /></Option>
                                    <Option value="original_title.asc">original title <ArrowUpOutlined /></Option>
                                    <Option value="original_title.desc">original title <ArrowDownOutlined /></Option>
                                    <Option value="vote_average.asc">vote average <ArrowUpOutlined /></Option>
                                    <Option value="vote_average.desc">vote average <ArrowDownOutlined /></Option>
                                    <Option value="vote_count.asc">vote count <ArrowUpOutlined /></Option>
                                    <Option value="vote_count.desc">vote count <ArrowDownOutlined /></Option>
                                </Select>
                            </div>
                            <div className="filters__row">
                                <Button textButton="Apply Filters" handleButton={applyFilter} />
                            </div>
                        </Drawer>
                    </div>
            }
        </>
    )
}

export default FilmsPage;