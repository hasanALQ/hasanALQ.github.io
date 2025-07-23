// Fetch grade data from the server
async function fetchGradeData() {
  try {
    const response = await fetch('/api/grades');
    if (!response.ok) throw new Error('Network response was not ok');
    const data = await response.json();
    populateGradebook(data);
  } catch (error) {
    console.error('Error fetching grades:', error);
  }
}

// Populate table with grade data
function populateGradebook(data) {
  const tbody = document.getElementById('gradebook-body');
  tbody.innerHTML = ''; // Clear existing rows if any

  data.forEach(student => {
    const row = document.createElement('tr');

    const nameCell = document.createElement('td');
    nameCell.textContent = `${student.first_name} ${student.last_name}`;
    row.appendChild(nameCell);

    const assignments = [student.assignment1, student.assignment2, student.assignment3];
    assignments.forEach(score => {
      const cell = document.createElement('td');
      cell.textContent = score;
      row.appendChild(cell);
    });

    tbody.appendChild(row);
  });
}

// Call fetch when page loads
window.onload = fetchGradeData;
