import React from 'react';
import Stack from 'components/core/Stack';
import PropTypes from 'prop-types';
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import IconButton from 'components/core/IconButton';

const SortCarets = ({ field, sorting, setSorting }) => {
    const isSorted = sorting.field === field;
    const isAscending = sorting.direction === 'asc';
    const isDescending = sorting.direction === 'desc';

    const handleSort = () => {
        if (isSorted) {
            setSorting({
                field,
                direction: isAscending ? 'desc' : 'asc'
            });
        } else {
            setSorting({
                field,
                direction: 'asc'
            });
        }
    };

    return (
        <Stack onClick={handleSort} >
            <IconButton 
                sx={{
                    padding: 0,
                    margin: 0,
                    height: 25,
                    width: 25,
                    minHeight: 0,
                    minWidth: 0,
                    lineHeight: 1
                }}
            >
                <ArrowDropUpIcon 
                    sx={{
                        color: (isSorted && isAscending) ? 'black' : 'grey',
                        padding: 0,
                        margin: 0,
                        height: 25,
                        width: 25,
                        minHeight: 0,
                        minWidth: 0,
                        lineHeight: 1,
                        '& path': {
                            height: 25,
                            width: 25,
                            padding: 0,
                        }
                    }}
                />
            </IconButton>
            <IconButton
                sx={{
                    color: 'black',
                    padding: 0,
                    margin: 0,
                    height: 25,
                    width: 25,
                    minHeight: 0,
                    minWidth: 0,
                    lineHeight: 1
                }}
            >
                <ArrowDropDownIcon
                    sx={{
                        color: (isSorted && isDescending) ? 'black' : 'grey',
                        padding: 0,
                        margin: 0,
                        height: 25,
                        width: 25,
                        minHeight: 0,
                        minWidth: 0,
                        lineHeight: 1,
                        '& path': {
                            height: 25,
                            width: 25,
                            padding: 0,
                        }
                    }}
                />
            </IconButton>
        </Stack>
    );
}

SortCarets.propTypes = {
    field: PropTypes.string,
    sorting: PropTypes.object,
    setSorting: PropTypes.func
};

export default SortCarets;