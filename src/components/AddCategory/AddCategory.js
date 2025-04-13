import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./AddCategory.css";

function AddCategory() {
  const navigate = useNavigate();

  const [categoryName, setCategoryName] = useState("");
  const [itemCount, setItemCount] = useState("");
  const [imgUrl, setImageUrl] = useState("");
  const [text, setText] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("jwt_token");
    if (!token) {
      navigate("/");
    }
  }, []);

  const handleCategoryName = (e) => {
    setCategoryName(e.target.value);
  };

  const handleItemCount = (e) => {
    const count = parseInt(e.target.value);
    setItemCount(count);
  };

  const handleImageUrl = (e) => {
    setImageUrl(e.target.value);
  };

  const handleSubmitForm = async (e) => {
    e.preventDefault();

    try {
      const categoryDetails = { categoryName, itemCount, imgUrl };
      const token = localStorage.getItem("jwt_token");
      const data = await fetch(
        "https://revisit-backend-hkwo.onrender.com/add",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(categoryDetails),
        }
      );
      const response = await data.json();

      if (data.ok) {
        setCategoryName("");
        setItemCount("");
        setImageUrl("");
        setText(response.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="main-bg">
      <form onSubmit={handleSubmitForm}>
        <h2>Add Category</h2>
        <input
          value={categoryName}
          onChange={handleCategoryName}
          type="text"
          placeholder="Category Name"
        />
        <input
          value={itemCount}
          onChange={handleItemCount}
          type="number"
          placeholder="Item Count"
        />
        <input
          value={imgUrl}
          onChange={handleImageUrl}
          type="text"
          placeholder="Image URL"
        />
        <button type="submit">Add New Category</button>
        {text && <p className="successful-msg">{text}</p>}
      </form>
    </div>
  );
}

export default AddCategory;
