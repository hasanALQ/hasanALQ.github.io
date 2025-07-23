function fetchGradeData() {
    // This function will query the PostgreSQL database and return grade data
    console.log("Fetching grade data...");

    // Create a new request for HTTP data
    let xhr = new XMLHttpRequest();

    // This is the address on the machine we're asking for data
    let apiRoute = "/api/grades";

    // When the request changes status, we run this anonymous function
    xhr.onreadystatechange = function() {
        // If results
        // Check if we're done
        if (xhr.readyState === XMLHttpRequest.DONE) {
            // Check if we're successful
            if (xhr.status === 200) {
                // Success! Now we get grades.
                populateGradebook(JSON.parse(xhr.responseText));
            } else {
                // Could not get grades.
                console.log(`Could not get grades. Status: ${xhr.status}`);
            }
        }
    }.bind(this);

    xhr.open("GET", apiRoute, true);
    xhr.send();
}

function populateGradebook(data) {
    // This function will take the fetched grade data and populate the table
    console.log("Populating gradebook with data:", data);

    let tableElem = document.getElementById("gradebook"); // get the gradebook table element

    data.forEach(function(assignment) {
        // For each row of data we are passed in
        let row = document.createElement("tr"); // create a table row element
        let columns = []; // Handy place to stick the columns of information

        let columns_name = document.createElement("td"); // The first column’s table data will be the name
        columns_name.textContent = assignment.last_name + ", " + assignment.first_name;
        columns.push(columns_name);

        let columns_grade = document.createElement("td"); // Second column will be the grade
        columns_grade.textContent = assignment.grade;
        // If you wanted, in fact, you could be fancy and figure out the letter grade here
        // let letter = assignment.grade >= 90 ? "A" : assignment.grade >= 80 ? "B" : "C"; 
        columns.push(columns_grade);

        // Add the table data columns to the table row
        columns.forEach(function(col) {
            row.appendChild(col);
        });

        // Add the row to the table itself to make the data visible
        tableElem.appendChild(row);
    });
}


const gradeData = fetchGradeData();
populateGradebook(gradeData);
