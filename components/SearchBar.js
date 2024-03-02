const SearchBar = ({ searchQuery, setSearchQuery, switchToListView, switchToGridView }) => {
  const handleInputChange = (event) => {
    setSearchQuery(event.target.value);
  };

  return (
    <div className="flex justify-center mt-2">
      <input
        type="text"
        placeholder="Search..."
        value={searchQuery}
        onChange={handleInputChange}
        className="px-4 py-2 bg-white rounded-md mr-2 text-black"
      />
      <button onClick={switchToListView} className="px-4 py-2 bg-indigo-800 text-white rounded-md mr-2 hover:bg-black transition-colors duration-300">
        View in List
      </button>
      <button onClick={switchToGridView} className="px-4 py-2 bg-indigo-800 text-white rounded-md hover:bg-black transition-colors duration-300">
        View in Grid
      </button>
    </div>
  );
};

export default SearchBar;
