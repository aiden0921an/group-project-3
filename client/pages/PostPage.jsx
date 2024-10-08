import { useNavigate, useParams } from "react-router-dom";
import Select from "react-select";
import React, { useState, useEffect } from "react";
import { useAppCtx } from "../utils/AppProvider";

const ItemPage = ({ posts }) => {
  const { id } = useParams();
  const category = category.find((category) => category._id === id);
};

const conditions = [
  { value: "New", label: "New" },
  { value: "Like New", label: "Like New" },
  { value: "Used", label: "Used" },
  { value: "Poor", label: "Poor" },
];

export default function PostPage() {
  const { user } = useAppCtx();

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    condition: "",
    category: "",
    price: "",
  });

  const [image, setImage] = useState();

  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedCondition, setSelectedCondition] = useState(null);
  const [categories, setCategories] = useState([]);

  async function getCategories() {
    const resp = await fetch("/api/category");
    const result = await resp.json();
    console.log(result);
    setCategories(result.payload);
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formDetails = new FormData();
    formDetails.append("image", image);
    formDetails.append("title", formData.title);
    formDetails.append("price", formData.price);
    formDetails.append("description", formData.description);
    formDetails.append("condition", formData.condition);
    formDetails.append("category", formData.category);
    formDetails.append("user", user._id);
    setIsSubmitting(true);

    try {
      const response = await fetch("/api/post", {
        method: "POST",
        credentials: "include",

        body: formDetails,
      });
      if (response.ok) {
        navigate("/");
      } else {
        const result = await response.json();
        console.error(result.payload);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  const customStyles = {
    option: (provided, state) => ({
      ...provided,
      color: state.isSelected ? "white" : "black",
      backgroundColor: state.isSelected ? "blue" : "white",
    }),
    control: (provided) => ({
      ...provided,
      borderColor: "gray",
    }),
    singleValue: (provided) => ({
      ...provided,
      color: "black",
    }),
    placeholder: (provided) => ({
      ...provided,
      color: "gray",
    }),
    menu: (provided) => ({
      ...provided,
      zIndex: 9999,
    }),
  };

  const handleCategoryChange = (selectedOption) => {
    setSelectedCategory(selectedOption);
    setFormData((prevData) => ({
      ...prevData,
      category: selectedOption ? selectedOption.value : "",
    }));
  };

  const handleConditionChange = (selectedOption) => {
    setSelectedCondition(selectedOption);
    setFormData((prevData) => ({
      ...prevData,
      condition: selectedOption ? selectedOption.value : "",
    }));
  };

  useEffect(() => {
    getCategories();
  }, []);

  return (
    <>
      <form
        className="post-form"
        encType={"multipart/form-data"}
        onSubmit={handleSubmit}
      >
        <label>
          Title:
          <input
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
          />
        </label>
        <hr />
        <label>
          Images:
          <input
            type="file"
            name="image"
            onChange={(e) => {
              setImage(e.target.files[0]);
            }}
          />
        </label>
        <hr />

        <label htmlFor="category">
          Category:
          <Select
            id="category"
            options={categories.map((category) => ({
              value: category._id,
              label: category.name,
            }))}
            value={selectedCategory}
            onChange={handleCategoryChange}
            styles={customStyles}
            placeholder="Select category..."
          />
        </label>
        <hr />
        <label htmlFor="condition">
          Condition:
          <Select
            id="condition"
            options={conditions}
            value={selectedCondition}
            onChange={handleConditionChange}
            styles={customStyles}
            placeholder="Select condition..."
          />
        </label>
        <hr />
        <label>
          Price:
          <input
            name="price"
            value={formData.price}
            onChange={handleChange}
            required
          />
        </label>
        <hr />
        <label>
          Description:
          <textarea
            id="desc-text-area"
            name="description"
            value={formData.description}
            onChange={handleChange}
            required
          />
          <hr />
        </label>
        <button type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Submitting..." : "Submit Post"}
        </button>
      </form>
    </>
  );
}
