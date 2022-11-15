import { useEffect, useState } from "react";
import "./App.css";
import AddPhoto from "./components/AddPhoto";
import DeletePhoto from "./components/DeletePhoto";
import Photos from "./components/Photos";
import useDebounce from "./hooks/useDebounce";

function App() {
	const [searchTerm, setSearchTerm] = useState("");
	const [results, setResults] = useState([]);
	const [isSearching, setIsSearching] = useState(false);
	const [isAdding, setIsAdding] = useState(false);
	const [deleteId, setDeleteId] = useState(false);
	const [isRefresh, setIsRefresh] = useState(false);

	const debouncedSearchTerm = useDebounce(searchTerm, 500);

	useEffect(() => {
		setIsSearching(true);
		searchCharacters(debouncedSearchTerm).then((results) => {
			setIsSearching(false);
			setResults(results);
		});
	}, [debouncedSearchTerm, isRefresh]);

	return (
		<div className="App">
			{isAdding && <AddPhoto setIsAdding={setIsAdding} setIsRefresh={setIsRefresh} />}
			{deleteId && (
				<DeletePhoto setDeleteId={setDeleteId} id={deleteId} setIsRefresh={setIsRefresh} />
			)}
			<div className="p-8 ">
				<div className="flex items-center gap-8">
					<img src="my_unsplash_logo.svg" alt="My Unsplash Logo" />
					<form className="flex items-center text-[#BDBDBD] p-4 text-sm rounded-xl border-[#BDBDBD] border">
						<span className="material-symbols-outlined mr-4">search</span>
						<label hidden htmlFor="search">
							Search by name
						</label>
						<input
							onChange={(e) => setSearchTerm(e.target.value)}
							className="outline-none"
							type="search"
							name="search"
							id="search"
							value={searchTerm}
							placeholder="Search by name"
							autoComplete="off"
						/>
					</form>
					<button
						onClick={() => setIsAdding(true)}
						className="text-white font-bold px-5 py-4 rounded-xl bg-[#3DB46D] hover:bg-[#319157] ml-auto">
						Add a photo
					</button>
				</div>
				{isSearching ? (
					<div className="my-20 text-xl font-bold">Loading images...</div>
				) : (
					results.length > 0 && <Photos photos={results} setDeleteId={setDeleteId} />
				)}
			</div>
		</div>
	);
}

export default App;

function searchCharacters(search) {
	const url = import.meta.env.VITE_API_URL + "/by_label";
	var myHeaders = new Headers();
	myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

	var urlencoded = new URLSearchParams();
	urlencoded.append("label", search);

	var requestOptions = {
		method: "POST",
		headers: myHeaders,
		body: urlencoded,
		redirect: "follow",
	};

	return fetch(url, requestOptions)
		.then((r) => r.json())
		.then((r) => r)
		.catch((error) => {
			console.error(error);
			return [];
		});
}
