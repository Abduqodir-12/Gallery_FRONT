import "./Photo.css";
import { useInfoContext } from "../../context/Context";
import { deletePhoto } from "../../api/photoRequests";
import { toast } from "react-toastify";
import { useState } from "react";

const Photo = ({ photo, photos, setPhotos }) => {
  const { setModal, setPostId, setPhotoData, modalFoto, setModalFoto } = useInfoContext();  
  const [currentIndex, setCurrentIndex] = useState(0);

  const prevSlide = () => {
    const isFirstSlide = currentIndex === 0;
    const newIndex = isFirstSlide ? photos.length - 1 : currentIndex - 1;
    setCurrentIndex(newIndex);
  };

  const nextSlide = () => {
    const isLastSlide = currentIndex === photos.length - 1;
    const newIndex = isLastSlide ? 0 : currentIndex + 1;
    setCurrentIndex(newIndex);
  };

  const handleDelete = async (id) => {
    const confirmDel = window.confirm("Rostanham ochirmohchimisz?");
    if (confirmDel) {
      try {
        toast.loading('Please wait...');
        await deletePhoto(id);
        const filteredPhotos = photos.filter((item) => item._id !== id);
        setPhotos(filteredPhotos);
        toast.dismiss();
        toast.success('Deleted!');
      } catch (error) {
        toast.dismiss();
        toast.error('Error deleting photo');
        console.log(error);
      }
    }
  };

  const handleUpdate = () => {
    setPostId(photo._id); 
    setPhotoData(photo);  
    setModal(true);       
  };

  return (
    <div className="photo" onClick={() => setModalFoto(true)}>
      <img className="image" src={photo?.image.url} alt="image" />
      <div className="flex-elements">
        <p>{photo?.title}</p>
      </div>
      <button className="deleteBtn" onClick={() => handleDelete(photo._id)}>Delete</button>
      <button className="updateBtn" onClick={handleUpdate}>Update</button>

      <div className={modalFoto ? 'caruselModal' : 'coruselDNone'}>
        <button className="closeBtn" onClick={() => setModalFoto(false)}>X</button>
        <div className="caruselBody">
          <button className="prevBtn" onClick={prevSlide}>prev</button>
          <img src={photos[currentIndex]?.image.url} alt="imgCarusel" />
          <button className="nextBtn" onClick={nextSlide}>next</button>
        </div>
      </div>
    </div>
  );
};

export default Photo;