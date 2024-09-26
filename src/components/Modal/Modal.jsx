import React, { useEffect, useState } from "react";
import "./Modal.css";
import { useInfoContext } from "../../context/Context";
import { toast } from "react-toastify";
import { updatePhoto } from "../../api/photoRequests";

const Modal = () => {
  const { setModal, postId, photoData } = useInfoContext(); 
  
  const [title, setTitle] = useState("");
  const [image, setImage] = useState(null);

  useEffect(() => {
    if (photoData) {
      setTitle(photoData.title); 
    }
  }, [photoData]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      toast.loading("Please wait...");
      const formData = new FormData();
      formData.append("title", title);
      if (image) formData.append("image", image); 

      await updatePhoto(postId, formData);
      toast.dismiss();
      toast.success("Successfully updated!");
      setModal(false);
      window.location.reload();
    } catch (error) {
      toast.dismiss();
      toast.error("Error updating photo");
      console.error(error);
    }
  };

  return (
    <div className="modal-box">
      <div className="modal-body p-2">
        <div className="modal-header">
          <h2>Update</h2>
          <button className="btn" onClick={() => setModal(false)} type="button">X</button>
        </div>
        <div className="modal-content">
          <form className="p-3" onSubmit={handleSubmit}>
            <input type="text" name="title" className="form-control mb-3" placeholder="New title..." value={title} onChange={(e) => setTitle(e.target.value)} required />
            <input type="file" name="image" className="form-control mb-3" onChange={(e) => setImage(e.target.files[0])} />
            <button className="btn btn-outline-primary w-100 form-btn">Update</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Modal;