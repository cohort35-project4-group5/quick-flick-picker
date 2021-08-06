import { useEffect, useState } from "react";
import firebase from "../../firebase";
import { FaTimesCircle } from "react-icons/fa";
import { AiFillPlusCircle } from "react-icons/ai";
import Swal from "sweetalert2";

function ListModal(props) {
  const [selectedList, setSelectedList] = useState([]);
  const [userInput, setUserInput] = useState("");

  // Error handling for user input == ""
  const errorHandling1 = () => {
    let message = "Please enter a name for your list before creating it!";
    Swal.fire({
      background: "#242424",
      icon: "error",
      iconColor: "#e50914",
      confirmButtonText: "OK",
      confirmButtonColor: "#e50914",
      allowEnterKey: true,
      allowEscapeKey: true,
      html:
        // Change title to suit the application
        "<div><h2 style='color:white;margin-bottom: 20px'>Error!</h2><p style='color:white'>" +
        message +
        "</p></div>",
    });
  };
  // Error handling for user input that has the same list title before
  const errorHandling2 = () => {
    let message =
      "A list with that name already exists. Please enter another name!";
    Swal.fire({
      background: "#242424",
      icon: "error",
      iconColor: "#e50914",
      confirmButtonText: "OK",
      confirmButtonColor: "#e50914",
      allowEnterKey: true,
      allowEscapeKey: true,
      html:
        // Change title to suit the application
        "<div><h2 style='color:white;margin-bottom: 20px'>Error!</h2><p style='color:white'>" +
        message +
        "</p></div>",
    });
  };

  // This is useEffect to get object from database
  useEffect(() => {
    const dbRef = firebase.database().ref();

    // Set up listener for data in firebase, which will fire when on where those values appear (i.e page loads) or those values change

    dbRef.on("value", (snapshot) => {
      const myData = snapshot.val();

      const newArray = [];
      for (let propertyName in myData) {
        const listObject = {
          key: propertyName,
          listName: myData[propertyName].listName,
        };

        newArray.push(listObject);
      }
      setSelectedList(newArray);
    });
  }, []);
  // This is the end of useEffect

  // To handle the change in the text input area when user put in text
  const handleChange = (event) => {
    setUserInput(event.target.value);
  };

  // To handle the button when it is clicked on the button
  const handleSubmit = (event) => {
    event.preventDefault();
    let check = "false";

    // We create a reference to our Firebase database:
    const dbRef = firebase.database().ref();
    // Create variable to see if the List Name is in the database

    // Checking if user input already had in the database
    dbRef.on("value", (snapshot) => {
      const myData = snapshot.val();
      for (let propertyName in myData) {
        const listObject = {
          key: propertyName,
          listName: myData[propertyName].listName,
        };

        // Checking if its out there
        if (userInput === listObject.listName) {
          check = "true";
          break;
        }
      }
    });

    const userInputItem = {
      listName: userInput,
      movieList: {},
    };

    if (check !== "true" && userInput !== "") {
      dbRef.push(userInputItem);
      setUserInput("");
    } else if (userInput === "") {
      errorHandling1();
    } else {
      errorHandling2();
      setUserInput("");
    }
  };

  // To Handle the delete when the delete button clicked on the button
  const handleDelete = (keyOfListToDelete) => {
    const dbRef = firebase.database().ref();
    // Go get the specific node (ie.the property) which we want to delete in Firebase and REMOVE IT
    dbRef.child(keyOfListToDelete).remove();
  };

  return (
    <div className="listModalContainer">
      <div className="listModal">
        <button
          className="closeListModalBtn"
          onClick={() => {
            props.toggleListManager();
          }}
        >
          <FaTimesCircle />
        </button>
        <h2>Select a list </h2>
        <ul className="listtitle-container">
          {selectedList.map((listObject) => {
            const defferedFunction = () => handleDelete(listObject.key);
            return (
              <li key={listObject.key}>
                <div className="delete-container">
                  <p>{listObject.listName}</p>
                  <button onClick={defferedFunction}>
                    <FaTimesCircle />
                  </button>
                </div>
              </li>
            );
          })}
        </ul>

        {/* Form for User to add additional List title  */}
        <form className="addlist-form" action="submit" onSubmit={handleSubmit}>
          <label className="labelForList" htmlFor="userListChoice">
            Create a new list{" "}
          </label>
          <div className="inputFormContainer">
            <input
              type="text"
              id="userListChoice"
              onChange={handleChange}
              value={userInput}
            />
            <button>
              {" "}
              <AiFillPlusCircle />{" "}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ListModal;
