import React, { useState } from "react";

const styles = {
  Form: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  InputWrapper: {
    marginTop: "1%",
    marginBottom: "1%",
    width: "500px",
  },
  Input: {
    width: "35.5em",
    height: "2.5vh",
  },
  SelectWrapper: {
    marginTop: "1%",
    marginBottom: "1%",
  },
  Select: {
    width: "100%",
    height: "3.5vh",
  },
  Box: {
    border: "1px dashed black",
    padding: "2%",
    marginTop: "2%",
    marginBottom: "2%",
  },
  Buttons: {
    color: "white",
    backgroundColor: "black",
    borderRadius: "0.2em",
  },
};
export default function () {
  const [selectedType, setSelectedType] = useState("");
  const [attributeName, setAttributeName] = useState("");
  const [form, setForm] = useState([]);
  const [options, setOptions] = useState([]);
  const [optionName, setOptionName] = useState("");

  const handleAdd = () => {
    selectedType === "Radio" ||
    selectedType === "checkbox" ||
    selectedType === "select"
      ? setForm([
          ...form,
          { name: attributeName, type: selectedType, options: options },
        ])
      : setForm([...form, { name: attributeName, type: selectedType }]);
    setAttributeName("");
    setSelectedType("");
    setOptions([]);
  };

  const handleCreate = () => {
    console.log(form);
  };

  return (
    <>
      <div style={styles.Form}>
        <h2>Register New</h2>
        <div>
          <div style={styles.Box}>
            <div>Attribute Name</div>
            <div style={styles.InputWrapper}>
              <input
                style={styles.Input}
                type="text"
                value={attributeName}
                onChange={(e) => setAttributeName(e.target.value)}
              />
            </div>
          </div>
          <div style={styles.Box}>
            <div>Attribute Type</div>
            <div style={styles.SelectWrapper}>
              <select
                style={styles.Select}
                value={selectedType}
                onChange={(e) => setSelectedType(e.target.value)}
              >
                <option></option>
                {!form.find((item) => item.type === "form name") && (
                  <option value="form name">Form Name</option>
                )}
                <option value="text">Text</option>
                <option value="date">Date</option>
                <option value="date range">Date Range</option>
                <option value="checkbox">Check Box</option>
                <option value="Radio">Radio Buttons</option>
                <option value="select">Drop down</option>
              </select>
            </div>
          </div>
          {(selectedType === "Radio" ||
            selectedType === "checkbox" ||
            selectedType === "select") && (
            <div style={styles.Box}>
              <div>Option name</div>
              <div style={styles.InputWrapper}>
                <input
                  style={styles.Input}
                  value={optionName}
                  onChange={(e) => setOptionName(e.target.value)}
                  type="text"
                />
              </div>
              <button
                style={styles.Buttons}
                onClick={() => {
                  setOptions([...options, optionName]), setOptionName("");
                }}
              >
                Add Option
              </button>
            </div>
          )}
          <div>
            <button style={styles.Buttons} onClick={handleAdd}>
              Add Attribute
            </button>
          </div>
        </div>
      </div>
      <div style={styles.Form}>
        <h2>Preview</h2>
        {form.map((item) =>
          item.type === "form name" ? (
            <div key={item.name}>
              <h2>{item.name}</h2>
            </div>
          ) : null
        )}
        <button style={styles.Buttons} onClick={handleCreate}>
          Create
        </button>
      </div>
    </>
  );
}
