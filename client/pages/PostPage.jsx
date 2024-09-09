
import { useNavigate, useParams } from "react-router-dom";
import Select from 'react-select';
import React, { useState, useEffect } from 'react';

// Categories options
const categories = [
  { value: 'Electronics', label: 'Electronics' },
  { value: 'Fashion', label: 'Fashion' },
  { value: 'Home & Garden', label: 'Home & Garden' },
  { value: 'Health & Beauty', label: 'Health & Beauty' },
  { value: 'Sports & Outdoors', label: 'Sports & Outdoors' },
  { value: 'Toys & Hobbies', label: 'Toys & Hobbies' },
  { value: 'Automotive', label: 'Automotive' },
  { value: 'Books & Stationery', label: 'Books & Stationery' },
  { value: 'Food & Beverages', label: 'Food & Beverages' },
  { value: 'Pet Supplies', label: 'Pet Supplies' }
];

// Conditions options
const conditions = [
  { value: 'New', label: 'New' },
  { value: 'Like New', label: 'Like New' },
  { value: 'Used', label: 'Used' },
  { value: 'Bad', label: 'Bad' }
];

export default function PostPage() {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "",
    price: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedCondition, setSelectedCondition] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const response = await fetch("/api/post", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        navigate("/success");
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
      color: state.isSelected ? 'white' : 'black',
      backgroundColor: state.isSelected ? 'blue' : 'white',
    }),
    control: (provided) => ({
      ...provided,
      borderColor: 'gray',
    }),
    singleValue: (provided) => ({
      ...provided,
      color: 'black',
    }),
    placeholder: (provided) => ({
      ...provided,
      color: 'gray',
    }),
    menu: (provided) => ({
      ...provided,
      zIndex: 9999,
    })
  };

  const handleCategoryChange = (selectedOption) => {
    setSelectedCategory(selectedOption);
  };

  const handleConditionChange = (selectedOption) => {
    setSelectedCondition(selectedOption);
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <label>Title:
          <input
            name="title"
            value={formData.title}
            onChange={handleChange}
            required />
        </label>
        <hr />
        <label>Images:
          <input type="file" />
        </label>
        <hr />

        <label htmlFor="category">Category:
          <Select
            id="category"
            options={categories}
            value={selectedCategory}
            onChange={handleCategoryChange}
            styles={customStyles}
            placeholder="Select category..."
          />
        </label>
        <hr />
        <label htmlFor="condition">Condition:
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
        <label>Price:
          <input
            name="price"
            defaultValue="50"
            value={formData.price}
            onChange={handleChange}
            required
          />
        </label>
        <hr />
        <label>Description:
          <textarea
            id="desc-text-area"
            name="description"
            value={formData.description}
            onChange={handleChange}
            required />
          <hr />
        </label>
        <button type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Submitting..." : "Submit Post"}
        </button>
      </form>
    </>
  );
}



