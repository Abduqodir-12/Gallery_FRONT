import React from "react";
import "./Modal.css";
import { useInfoContext } from "../../context/Context";
import { toast } from "react-toastify";
import { updatePhoto } from "../../api/photoRequests";

const Modal = () => {
  const { setModal, postId } = useInfoContext();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      toast.loading("Please wait...");
      const formDate = new FormData(e.target);
      await updatePhoto(postId, formDate);
      toast.dismiss();
      toast.success("Succesfully updated");
      setModal(false);
      window.location.reload();
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="modal-box">
      <div className="modal-body p-2">
        <div className="modal-header">
          <h2>Update photo</h2>
          <button className="btn" onClick={() => setModal(false)} type="button">X</button>
        </div>
        <div className="modal-content">
          <form className="p-3" onSubmit={handleSubmit}>
            <input type="text" name="title" className="form-control mb-3" placeholder="New title..." required/>
            <input type="file" name="image" className="form-control mb-3" placeholder="New photo..." required/>
            <button className="btn btn-outline-primary w-100 form-btn">Update</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Modal;