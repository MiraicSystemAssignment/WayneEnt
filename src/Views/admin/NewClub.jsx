import React, { useState } from "react";

const styles = {
    Form: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center"
    }
}
export default function (){
    const [selectedValue, setSelectedValue] = useState('');
    const [attributeName, setAttributeName] = useState('');
    const [form, setForm] = useState([]);

    const handleAdd = () => {
        setForm([...form, {name: attributeName,type: selectedValue}]);
        setAttributeName('');
        setSelectedValue('');
        console.log(form);
    }

    return (
        <div style={styles.Form}>
            <h1>Register New</h1>
            <div>
            <label>Select field type</label>
            <input  value={attributeName} onChange={(e)=>setAttributeName(e.target.value)}/>
            <select value={selectedValue} onChange={(e)=>setSelectedValue(e.target.value)}>
                <option>Form Name</option>
                <option value="text">Text</option>
            </select>
            <button onClick={handleAdd}>Add</button>
            </div>
        </div>
    );
}