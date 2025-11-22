import { useState, useMemo } from 'react';
import { APP_CONFIG } from '../config/settings';

const useFilterAndPages = (userList) => {
  const [filterText, setFilterText] = useState('');
  const [pageNumber, setPageNumber] = useState(1);
  const itemsPerPage = APP_CONFIG.RECORDS_PER_PAGE;

  const filteredItems = useMemo(() => {
    if (!filterText.trim()) return userList;

    const searchTerm = filterText.toLowerCase();
    return userList.filter(
      (user) =>
        user.name.toLowerCase().includes(searchTerm) ||
        user.email.toLowerCase().includes(searchTerm)
    );
  }, [userList, filterText]);

  const totalPageCount = Math.ceil(filteredItems.length / itemsPerPage);

  const pageItems = useMemo(() => {
    const startPosition = (pageNumber - 1) * itemsPerPage;
    const endPosition = startPosition + itemsPerPage;
    return filteredItems.slice(startPosition, endPosition);
  }, [filteredItems, pageNumber, itemsPerPage]);

  const changeFilter = (text) => {
    setFilterText(text);
  };

  const changePage = (page) => {
    setPageNumber(page);
  };

  return {
    filterText,
    changeFilter,
    pageNumber,
    changePage,
    itemsPerPage,
    filteredItems,
    pageItems,
    totalPageCount,
  };
};

export default useFilterAndPages;
