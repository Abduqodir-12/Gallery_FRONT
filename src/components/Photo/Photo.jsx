import "./Photo.css";
import { useInfoContext } from "../../context/Context";
import { deletePhoto } from "../../api/photoRequests";
import { toast } from "react-toastify";

const Photo = ({ photo, photos, setPhotos }) => {
  const { setModal } = useInfoContext();

  const handleDelete = async (id) => {
    const confirmDel = window.confirm("Rostanham ochirmohchimisz ?")
    if(confirmDel) {
        try {
            toast.loading('Please wait...')
            await deletePhoto(id)
            const filterPhoto = photos.filter((item) => item._id !== id);
            setPhotos(filterPhoto)
            toast.dismiss()
            toast.success('deleted!')
        } catch (error) {
            console.log(error)
        }
    }
  }

  return (
    <div className="photo">
      <img className="image" src={photo?.image.url} alt="image" />
      <div className="flex-elements">
        <p>{photo?.title}</p>

        <button className="deleteBtn" onClick={() => handleDelete(photo._id)}>Delete</button>
        <button className="updateBtn" onClick={() => {setModal(true)}}>Update</button>
      </div>
    </div>
  );
};

export default Photo;