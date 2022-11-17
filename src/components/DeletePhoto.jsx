import { useState } from "react";

const DeletePhoto = ({ setDeleteId, setIsRefresh, id }) => {
	const [isError, setIsError] = useState(false);

	function deleteImage() {
		const url = import.meta.env.VITE_API_URL + "/delete_image";
		var myHeaders = new Headers();
		myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

		var urlencoded = new URLSearchParams();
		urlencoded.append("id", id);
		console.log("Delete id: ", id);
		var requestOptions = {
			method: "DELETE",
			headers: myHeaders,
			body: urlencoded,
			redirect: "follow",
		};

		fetch(url, requestOptions)
			.then((r) => r.json())
			.then((r) => {
				if (r === 1) {
					setDeleteId(false);
					setIsError(false);
					setIsRefresh((curr) => !curr);
				} else {
					setIsError(true);
				}
			})
			.catch((error) => {
				setIsError(true);
				console.error(error);
				return { error };
			});
	}

	return (
		<div className="fixed z-50 top-0 left-0 right-0 h-screen bg-black bg-opacity-25 grid place-content-center">
			<div className="bg-white rounded-xl px-8 py-6">
				<p className="text-2xl text-[#333333]">Are you sure?</p>

				<div className="flex items-center justify-end gap-8 mt-6">
					<button
						className="text-[#BDBDBD] hover:text-[#4f4f4f]"
						onClick={() => setIsAdding(false)}>
						Cancel
					</button>
					<button
						className="text-white font-bold px-5 py-4 rounded-xl bg-[#EB5757] hover:bg-[#EB5757]"
						onClick={deleteImage}>
						Delete
					</button>
				</div>
				{isError && <p className="text-red-500 my-6">Error deleting image. Please try again</p>}
			</div>
		</div>
	);
};
export default DeletePhoto;
