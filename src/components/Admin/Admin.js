import Navbar from "../Dashboard/Navbar"
import React, { useState, useEffect } from 'react'
import { getAuth, auth, onAuthStateChanged } from "firebase/auth";
import { getDatabase, set, ref, get, update, remove } from "firebase/database";
import "./AdminSytle.css";
import { Dropdown } from "react-bootstrap";
import DropdownMenu from "./DropdowMenu.js";

// admin credentials: email: admin@gmail.com  password: Admin123!

export function AdminPage() {
    console.log("Admin Page");
    const user = getAuth().currentUser;
    const db = getDatabase();

    const [userData, setUserData] = useState([]);
    let userDataList = [];

    // connect to auth
    if (user !== null) {
        // The user object has basic properties such as display name, email, etc.
        const displayName = user.displayName;
        console.log(displayName);
    }
    else {
        console.log("No User");
    }

    // get user data from db
    function getUserData()
    {
        get(ref(db, "users/")).then((snapshot) => {
            if (snapshot.exists()) {
                //loop through users in db
                snapshot.forEach((eventShot) => {
                    //console.log(eventShot.val().email);
                    var userEmail = eventShot.val().email;
                    var userEUID = eventShot.val().eUID;
                    var userFirst = eventShot.val().firstName;
                    var userLast = eventShot.val().lastName;
                    var userRole = eventShot.val().role;
                    var userVals = {email: userEmail, euid: userEUID, role: userRole, first: userFirst, last: userLast};
                    userDataList.push(userVals);
                })
                setUserData(userDataList);
            } else {
                console.log("No user data available");
            }
        }).catch((error) => {
            console.error(error);
        });
    }// getUserData()
    
    useEffect(() => {
        getUserData();
    }, []);
    
    
    // rendered content
    return (
        <div>
            <Navbar />
            <div className="main-container">
                <div className="info-container">
                    <div className="info-window-outer">
                        <div className="info-window-inner">
                            <h1 id="main-title">User Management</h1>
                            <DropdownMenu></DropdownMenu>
                            <div className="input-container">
                                <div className="input-data">
                                    <input id="input-search" type="text" placeholder="eUID"></input>
                                    <button id="input-button">Search</button>
                                    <label></label>
                                </div>
                            </div>
                            <div className="table-container">
                                {/* <div className="table-content"> */}
                                <table className="users-table">
                                <thead>
                                    <tr>
                                        <th>Email</th>
                                        <th>EUID</th>
                                        <th>Last Name</th>
                                        <th>First Name</th>
                                        <th>Role</th>
                                    </tr>
                                </thead>
                                

                                {userData.map((val, key) => { /* map userData array into table*/
                                    return (
                                        <tr key={key}>
                                            <td>{val.email}</td>
                                            <td>{val.euid}</td>
                                            <td>{val.last}</td>
                                            <td>{val.first}</td>
                                            <td>{val.role}</td>
                                            <td className="delete-user"><button className="delete-user-button">X</button></td>
                                        </tr>
                                    )
                                    })}

                                <tr>
                                        <td className="personal-info">someemail@unt.edu</td>
                                        <td className="personal-info">Eagle</td>
                                        <td className="personal-info">Denton</td>
                                        <td className="personal-info">Student</td>
                                        <td className="personal-info">abc0020</td>
                                        <td className="delete-user"><button className="delete-user-button">X</button></td>
                                    </tr>
                                    
                                </table>

                                {/* </div> */}
                            </div>
                            <div className="add-user">
                                <button className="submit-user-button">Add New User</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
