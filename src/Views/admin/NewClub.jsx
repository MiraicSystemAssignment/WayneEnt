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
  RangeInput: {
    width: "38%",
    margin: "0.35rem 0.5rem 0.35rem 0.5rem",
  },
};
export default function () {
  const [selectedType, setSelectedType] = useState("");
  const [attributeName, setAttributeName] = useState("");
  const [form, setForm] = useState([]);
  const [options, setOptions] = useState([]);
  const [optionName, setOptionName] = useState("");
  const [required, setRequired] = useState(false);

  const handleAdd = () => {
    if (attributeName !== "" && selectedType !== "") {
      selectedType === "Radio" ||
      selectedType === "checkbox" ||
      selectedType === "select"
        ? options.length !== 0
          ? (setForm([
              ...form,
              {
                name: attributeName,
                type: selectedType,
                options: options,
                required: required,
              },
            ]),
            setAttributeName(""),
            setSelectedType(""),
            setOptions([]),
            setRequired(false))
          : alert("Options can't be empty")
        : (setForm([
            ...form,
            { name: attributeName, type: selectedType, required: required },
          ]),
          setAttributeName(""),
          setSelectedType(""),
          setOptions([]),
          setRequired(false));
    } else {
      alert("Attribute name and type can't be Empty!");
    }
  };

  const handleCreate = () => {
    form.length !== 0 ? console.log(form) : alert("Form is Empty!");
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
                  <option value="form name">Club Name</option>
                )}
                <option value="text">Text</option>
                <option value="email">Email</option>
                <option value="date">Date</option>
                <option value="date range">Date Range</option>
                <option value="checkbox">Check Box</option>
                <option value="Radio">Radio Buttons</option>
                <option value="select">Drop down</option>
                <option value="number">Number</option>
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
                  optionName
                    ? (setOptions([...options, optionName]), setOptionName(""))
                    : alert("Option name is Empty!");
                }}
              >
                Add Option
              </button>
            </div>
          )}
          <div key="required" style={styles.Box}>
            <div>required</div>
            <input
              type="checkbox"
              checked={required}
              onChange={
                required
                  ? () => setRequired(false)
                  : () => {
                      setRequired(true);
                    }
              }
            />
          </div>
          <div>
            <button style={styles.Buttons} onClick={handleAdd}>
              Add Attribute
            </button>
          </div>
        </div>
      </div>
      <div style={styles.Form}>
        <h2>Preview</h2>
        <div>
          {form.map((item) =>
            item.type === "form name" ? (
              <div key={item.name}>
                <h2>{item.name}</h2>
              </div>
            ) : item.type === "select" ? (
              <div key={item.name} style={styles.Box}>
                <div>
                  {item.name} {item.required && <span>*</span>}
                </div>
                <div style={styles.SelectWrapper}>
                  <select style={styles.Select}>
                    <option key="0"></option>
                    {item.options.map((item) => (
                      <option key={item}>{item}</option>
                    ))}
                  </select>
                </div>
              </div>
            ) : item.type === "checkbox" ? (
              <div key={item.name} style={styles.Box}>
                <div>
                  {item.name} {item.required && <span>*</span>}
                </div>
                {item.options.map((option) => (
                  <div key={option}>
                    <input type="checkbox" name={option} id={option} />
                    <label> {option}</label>
                  </div>
                ))}
              </div>
            ) : item.type === "date range" ? (
              <div style={styles.Box}>
                <div>
                  {item.name} {item.required && <span>*</span>}
                </div>
                <div>
                  Start:
                  <input style={styles.RangeInput} type="date" />
                  End:
                  <input style={styles.RangeInput} type="date" />
                </div>
              </div>
            ) : item.type === "Radio" ? (
              <div key={item.name} style={styles.Box}>
                <div>
                  {item.name} {item.required && <span>*</span>}
                </div>
                <div style={styles.InputWrapper}>
                  {item.options.map((option) => (
                    <>
                      <input type="radio" name={item.name} value={option} />
                      {option}
                    </>
                  ))}
                </div>
              </div>
            ) : (
                <div key={item.name} style={styles.Box}>
                  <div>
                    {item.name} {item.required && <span>*</span>}
                  </div>
                  <div style={styles.InputWrapper}>
                    <input style={styles.Input} type={item.type} />
                  </div>
                </div>
            )
          )}
          <button style={styles.Buttons} onClick={handleCreate}>
            Create
          </button>
        </div>
      </div>
    </>
  );
}
