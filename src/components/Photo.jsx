const Photo = ({ photo, setDeleteId }) => {
	return (
		<div className="rounded-xl overflow-hidden relative mb-11">
			<img className="w-full" src={photo.imageUrl} alt={photo.label} />
			<div className="absolute inset-0 bg-black bg-opacity-40 opacity-0 hover:opacity-100 transition-opacity duration-300">
				<button
					onClick={() => setDeleteId(photo._id)}
					className="absolute right-4 top-4 border rounded-full border-[#EB5757] text-[#EB5757] text-[10px] py-1 px-4 hover:bg-[#EB5757] hover:text-white">
					delete
				</button>
				<p className="absolute bottom-8 left-6 right-6 text-white text-lg font-bold">
					{photo.label}
				</p>
			</div>
		</div>
	);
};
export default Photo;
