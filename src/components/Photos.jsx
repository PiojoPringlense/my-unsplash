import Photo from "./Photo";

const Photos = ({ photos, setDeleteId }) => {
	return (
		<div className="columns-3 gap-11 my-20">
			{photos.map((photo) => (
				<Photo key={photo._id} photo={photo} setDeleteId={setDeleteId} />
			))}
		</div>
	);
};
export default Photos;
