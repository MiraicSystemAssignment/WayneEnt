import React from 'react';

const styles = {
    table: {
        borderCollapse: 'collapse',
        width: '80%', // Adjust the width as needed
        margin: '20px auto',
        fontFamily: 'Arial, sans-serif',
        borderRadius: '8px',
        overflow: 'hidden',
        boxShadow: '0 0 5px rgba(0, 0, 0, 0.1)',
      },
      th: {
        border: '1px solid #ddd',
        padding: '8px',
        textAlign: 'left',
        backgroundColor: '#f2f2f2',
        color: '#333',
        fontWeight: 'bold',
        fontSize: '14px',
      },
      td: {
        border: '1px solid #ddd',
        padding: '8px',
        color: '#666',
        fontSize: '12px',
      },
};

const ClubsView = () => {
  const data = [
    { id: 1, name: 'John Smith', age: 25, email:'abc@gmail.com',gender: 'male',phone:9119334455 ,skills:`js,css` ,dob:'21/11/2001' ,club:'bikers' },
    { id: 2, name: 'Jane Swan', age: 30, email:'abc@gmail.com',gender: 'female',phone:922334455 ,skills:`react` ,dob:'1/12/2001' ,club:'bikers' },
    { id: 3, name: 'Silly Bob ', age: 28, email:'abc@gmail.com',gender: 'male',phone:8122334455 ,skills:`angular` ,dob:'12/01/2001' ,club:'bikers'  },
    { id: 4, name: 'Alice ENwanderland', age: 35, email:'abc@gmail.com',gender: 'female',phone: 971228347 ,skills:`js` ,dob:'1/02/2000' ,club:'bikers'  },
    { id: 5, name: 'Doely molly', age: 25, email:'abc@gmail.com',gender: 'female',phone:7122334400 ,skills:`css` ,dob:'22/04/1999' ,club:'bikers'  },
    { id: 6, name: 'Jaadu Laal', age: 30, email:'abc@gmail.com',gender: 'female',phone:9134220881 ,skills:`css` ,dob:'20/12/2001' ,club:'bikers'  },
    { id: 7, name: 'Bobby MeraLega', age: 28, email:'abc@gmail.com',gender: 'female',phone:8902334455 ,skills:`html` ,dob:'01/5/2000' ,club:'bikers'  },
    { id: 8, name: 'Lic mi Vals', age: 35, email:'abc@gmail.com',gender: 'male',phone:9119334455 ,skills:`css` ,dob:'01/01/2001' ,club:'bikers'  },
    { id: 9, name: 'Aana MumeLe', age: 25, email:'abc@gmail.com',gender: 'male',phone:9191775521 ,skills:`docker` ,dob:'29/09/2000' ,club:'bikers'  },
    { id: 10, name: 'Dezn Utts', age: 30, email:'abc@gmail.com',gender: 'female',phone:9134220881 ,skills:`js` ,dob:'17/03/1997' ,club:'bikers'  },
    { id: 11, name: 'Ladiz Vashrum', age: 28, email:'abc@gmail.com',gender: 'male',phone:9955226712 ,skills:`docker` ,dob:'31/12/2003' ,club:'bikers'  },
    { id: 12, name: 'Merry Popin', age: 35, email:'abc@gmail.com',gender: 'male',phone:97122834455 ,skills:`angular` ,dob:'09/06/2000' ,club:'bikers'  },
    { id: 13, name: 'Chus Ega Mera', age: 25, email:'abc@gmail.com',gender: 'female',phone:922357773 ,skills:`react` ,dob:'09/04/2001' ,club:'bikers'  },
    { id: 14, name: 'Sher Lock', age: 30, email:'abc@gmail.com',gender: 'male',phone:8972334455 ,skills:`react` ,dob:'06/07/2000' ,club:'bikers'  },
    { id: 15, name: 'Ran Dika', age: 28, email:'abc@gmail.com',gender: 'female',phone:898934455 ,skills:`js` ,dob:'12/12/1987' ,club:'bikers'  },
    { id: 16, name: 'Osa Ma Singh', age: 35, email:'abc@gmail.com',gender: 'male',phone:996693344 ,skills:`angular` ,dob:'19/08/2002' ,club:'bikers'  },
  ];

  return (
    <table style={styles.table}>
      <thead>
        <tr>
          <th style={styles.th}>ID</th>
          <th style={styles.th}>Name</th>
          <th style={styles.th}>Age</th>
          <th style={styles.th}>Email</th>
          <th style={styles.th}>Gender</th>
          <th style={styles.th}>Phone No.</th>
          <th style={styles.th}>Skills</th>
          <th style={styles.th}>DOB</th>
          <th style={styles.th}>Club</th>
        </tr>
      </thead>
      <tbody>
        {data.map((item) => (
          <tr key={item.id}>
            <td style={styles.td}>{item.id}</td>
            <td style={styles.td}>{item.name}</td>
            <td style={styles.td}>{item.age}</td>
            <td style={styles.td}>{item.email}</td>
            <td style={styles.td}>{item.gender}</td>
            <td style={styles.td}>{item.phone}</td>
            <td style={styles.td}>{item.skills}</td>
            <td style={styles.td}>{item.dob}</td>
            <td style={styles.td}>{item.club}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default ClubsView;