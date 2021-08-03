import { useEffect, useState } from 'react';
import firebase from '../../firebase';
import { AiFillCloseCircle } from "react-icons/ai"
import Swal from 'sweetalert2';

function ListModal() {
    const [ selectedList, setSelectedList ] = useState([]);
    const [ userInput , setUserInput ] = useState("");

    // Error handling for user input == ""
    const errorHandling1 = () => {
        Swal.fire({
            title: "Error!",
            text: "Please add a list name",
            icon:"error",
            confirmButtonText:"OK",
        })
    }
    // Error handling for user input that has the same list title before
    const errorHandling2 = () => { 
        Swal.fire({
            title:"Error!",
            text: "You already have that list",
            icon:"error",
            confirmButtonText:"OK",
        })
    }
    
    // This is useEffect to get object from database
    useEffect( () => {
        const dbRef = firebase.database().ref();

        // Set up listener for data in firebase, which will fire when on where those values appear (i.e page loads) or those values change

        dbRef.on('value', (snapshot) => {
            const myData = snapshot.val();

            const newArray = [];
            for (let propertyName in myData) {
                const listObject = {
                    key: propertyName,
                    listName: myData[propertyName].listName,
                    
                }

                newArray.push(listObject);
            }
            setSelectedList(newArray);
            
        })

    },[]);
    // This is the end of useEffect

    // To handle the change in the text input area when user put in text 
    const handleChange = (event) => {
        setUserInput(event.target.value);
    }
    
      // To handle the button when it is clicked on the button
    const handleSubmit = (event) => {
        event.preventDefault();
        // Checking if user did not put anything for listname 
        if ( userInput !== "") {
        // We create a reference to our Firebase database:
        const dbRef = firebase.database().ref();
        // Checking if user input already had in the database
        dbRef.on('value', (snapshot) => {
            const myData = snapshot.val();
            for (let propertyName in myData) {
                if (userInput === myData[propertyName].listName) {
                    errorHandling2();
                } else if (userInput !=="") {
                    errorHandling1();
                } 
                else {
                    const userInputItem = {
                        listName: userInput,
                        movieList: {},
                    }
                    dbRef.push(userInputItem);
                    setUserInput("");
                }
            };
        }
    )}
}

    
    // To Handle the delete when the delete button clicked on the button
    const handleDelete = (keyOfListToDelete) => {
        const dbRef = firebase.database().ref();
        // Go get the specific node (ie.the property) which we want to delete in Firebase and REMOVE IT
        dbRef.child(keyOfListToDelete).remove();
    }
    
    return (
        <div className="ListModal">
        <h2> </h2>    
        <ul className="listTitle">
        {
            selectedList.map( (listObject) => {
            const defferedFunction = () => handleDelete(listObject.key);
            return (
                <li key={listObject.key}>
                    <div>
                        <p>{listObject.listName}</p>
                        <button onClick={defferedFunction}> <AiFillCloseCircle/></button>
                    </div> 
                </li>
                )
            })
        }
        </ul>

        {/* Form for User to add additional List title  */}
        <form action="submit" onSubmit={handleSubmit}>
            <label htmlFor="userListChoice">Create a new list </label>
            <input 
            type="text"
            id="userListChoice" 
            onChange={handleChange}
            value={userInput} />
            <button> Add it!</button>
        </form>

        </div>
    );

}

export default ListModal;