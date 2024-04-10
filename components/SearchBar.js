const SearchBar = ({ searchQuery, setSearchQuery, switchToListView, switchToGridView }) => {
  const handleInputChange = (event) => {
    setSearchQuery(event.target.value);
  };

  return (
    <div className="flex justify-center mt-2">
     <div className="relative">
        <input
          type="text"
          placeholder="Search..."
          value={searchQuery}
          onChange={handleInputChange}
          className="px-4 py-2 bg-white rounded-md mr-2 text-black pl-10"
        />
        <i className="absolute top-0 left-0 mt-3 ml-3 text-gray-400 fa-solid fa-magnifying-glass"></i>
    </div>

      <button onClick={switchToListView} className="px-4 py-2 bg-orange-500 text-white rounded-md mr-2 hover:bg-black transition-colors duration-300">
        View in List
      </button>
      <button onClick={switchToGridView} className="px-4 py-2 bg-orange-500 text-white rounded-md hover:bg-black transition-colors duration-300">
        View in Grid
      </button>
    </div>
  );
};

export default SearchBar;
