import React from "react";

const AllergySelector = () => {
  return (
    <div className="container py-4" style={{ fontFamily: 'Arial, sans-serif' }}>
      {/* Header */}
      <h2 className="h5 mb-3" style={{ color: '#4a148c' }}>Select Your Allergies</h2>

      {/* Search Bar */}
      <div className="mb-4">
        <input
          type="text"
          className="form-control"
          placeholder="Search allergies..."
          style={{ borderRadius: '20px', border: '1px solid #ddd', padding: '10px 15px' }}
        />
      </div>

      {/* Allergy Options */}
      <div className="row g-3 mb-4">
        {[
          "Peanuts",
          "Shellfish",
          "Gluten",
          "Dairy",
          "Eggs",
          "Soy",
        ].map((allergy, index) => (
          <div key={index} className="col-6 col-md-4">
            <label
              className="d-flex align-items-center p-3 rounded"
              style={{ backgroundColor: '#e1bee7', color: '#4a148c', cursor: 'pointer' }}
            >
              <input
                type="checkbox"
                className="form-check-input me-2"
                style={{ accentColor: '#6a1b9a' }}
              />
              {allergy}
            </label>
          </div>
        ))}
      </div>

      {/* Save Button */}
      <div className="text-center">
        <button
          className="btn btn-primary btn-lg px-5"
          style={{ backgroundColor: '#6a1b9a', borderColor: '#6a1b9a', borderRadius: '25px' }}
        >
          Save and Continue
        </button>
      </div>
    </div>
  );
};

export default AllergySelector;