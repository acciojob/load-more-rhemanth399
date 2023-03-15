import React, { useState, useEffect, useRef } from "react";

const LoadMoreList = ({ items, itemsPerLoad }) => {
  const [displayedItems, setDisplayedItems] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const loadMoreButtonRef = useRef(null);

  useEffect(() => {
    setDisplayedItems(items.slice(0, itemsPerLoad));
  }, [items, itemsPerLoad]);

  const handleLoadMore = () => {
    setIsLoading(true);
    setTimeout(() => {
      try {
        const startIndex = displayedItems.length;
        const newItems = items.slice(startIndex, startIndex + itemsPerLoad);
        if (newItems.length === 0) {
          setIsLoading(false);
          setIsError(true);
        } else {
          setDisplayedItems([...displayedItems, ...newItems]);
          setIsLoading(false);
        }
      } catch (error) {
        setIsLoading(false);
        setIsError(true);
      }
    }, 2000);
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const firstEntry = entries[0];
        if (firstEntry.isIntersecting && !isLoading && !isError) {
          handleLoadMore();
        }
      },
      { threshold: 1 }
    );
    if (loadMoreButtonRef.current) {
      observer.observe(loadMoreButtonRef.current);
    }
    return () => {
      if (loadMoreButtonRef.current) {
        observer.unobserve(loadMoreButtonRef.current);
      }
    };
  }, [isLoading, isError]);

  return (
    <>
      <ul>
        {displayedItems.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ul>
      {isLoading && <div>Loading more items...</div>}
      {isError && <div>Error loading more items.</div>}
      {!isLoading && !isError && (
        <button ref={loadMoreButtonRef}>Load more</button>
      )}
    </>
  );
};

export default LoadMoreList;
