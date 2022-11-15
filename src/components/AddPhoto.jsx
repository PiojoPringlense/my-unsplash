import { useRef } from "react";
import { useState } from "react";

const AddPhoto = ({ setIsAdding, setIsRefresh }) => {
	const [isError, setIsError] = useState(false);

	const labelRef = useRef();
	const imageUrlRef = useRef();

	function uploadImage(e) {
		e.preventDefault();
		const label = labelRef.current.value;
		const imageUrl = imageUrlRef.current.value;

		if (!label && !imageUrl) return;

		const url = import.meta.env.VITE_API_URL + "/upload_image";
		var myHeaders = new Headers();
		myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

		var urlencoded = new URLSearchParams();
		urlencoded.append("label", label);
		urlencoded.append("imageUrl", imageUrl);

		var requestOptions = {
			method: "POST",
			headers: myHeaders,
			body: urlencoded,
			redirect: "follow",
		};

		fetch(url, requestOptions)
			.then((r) => r.json())
			.then((r) => {
				if (r.acknowledged) {
					setIsAdding(false);
					setIsError(false);
					setIsRefresh((curr) => !curr);
				} else {
					setIsError(true);
				}
			})
			.catch((error) => {
				console.error(error);
				return { error };
			});
	}

	return (
		<div className="fixed z-50 top-0 left-0 right-0 h-screen bg-black bg-opacity-25 grid place-content-center">
			<div className="bg-white rounded-xl px-8 py-6">
				<p className="text-2xl text-[#333333]">Add a new photo</p>
				<form className="flex flex-col mt-6">
					<label className="text-[#4f4f4f] text-sm mb-2" htmlFor="label">
						Label
					</label>
					<input
						ref={labelRef}
						required
						className="text-[#BDBDBD] p-4 text-sm rounded-xl border-[#4f4f4f] border outline-none w-[40vw] min-w-[300px] mb-5"
						type="text"
						name="label"
						id="label"
					/>
					<label className="text-[#4f4f4f] text-sm mb-2" htmlFor="imageUrl">
						Photo URL
					</label>
					<input
						ref={imageUrlRef}
						required
						className="text-[#BDBDBD] p-4 text-sm rounded-xl border-[#4f4f4f] border outline-none w-[40vw] min-w-[300px]"
						type="url"
						name="imageUrl"
						id="imageUrl"
					/>
					<div className="flex items-center justify-end gap-8 mt-6">
						<button
							className="text-[#BDBDBD] hover:text-[#4f4f4f]"
							onClick={() => setIsAdding(false)}>
							Cancel
						</button>
						<button
							className="text-white font-bold px-5 py-4 rounded-xl bg-[#3DB46D] hover:bg-[#319157]"
							onClick={(e) => uploadImage(e)}>
							Submit
						</button>
					</div>
				</form>
				{isError && (
					<p className="text-red-500 my-6">Error uploading image. Please try again</p>
				)}
			</div>
		</div>
	);
};
export default AddPhoto;
